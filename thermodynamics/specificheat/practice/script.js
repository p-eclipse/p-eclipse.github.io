const HEAT_Q = 500;
const COOLING_POWER = 120;
const TARGET_MIN = 70;
const TARGET_MAX = 90;
const AMBIENT_TEMP = 20;
const DISPLAY_MAX_TEMP = 100;
const THERMO_MIN_FILL = 18;
const THERMO_FILL_RANGE = 62;

const reagentDB = {
  water: { label: "물", c: 1.0, color: "#3b82f6", titleColor: "#2563eb" },
  oil: { label: "식용유", c: 0.47, color: "#f3c316", titleColor: "#d98a00" },
  concrete: { label: "콘크리트", c: 0.21, color: "#8b95a7", titleColor: "#5b6474" },
  sand: { label: "모래", c: 0.19, color: "#d8a25d", titleColor: "#b46910" },
  copper: { label: "구리", c: 0.093, color: "#c97344", titleColor: "#a14c22" }
};

const massOptions = [100, 200, 500, 1000];

const cardsContainer = document.getElementById("cardsContainer");
const mainMessage = document.getElementById("mainMessage");
const subMessage = document.getElementById("subMessage");
const resetBtn = document.getElementById("resetBtn");

let samples = [];
let lastTimestamp = null;

function getThermometerWidth(mass) {
  if (mass === 100) return 56;
  if (mass === 200) return 68;
  if (mass === 500) return 84;
  if (mass === 1000) return 104;
  return 64;
}

function tempToHeightPercent(temp) {
  const clamped = Math.max(AMBIENT_TEMP, Math.min(DISPLAY_MAX_TEMP, temp));
  const ratio = (clamped - AMBIENT_TEMP) / (DISPLAY_MAX_TEMP - AMBIENT_TEMP);
  return THERMO_MIN_FILL + ratio * THERMO_FILL_RANGE;
}

function getStatus(temp) {
  if (temp < TARGET_MIN) return { text: "너무 낮음", cls: "low" };
  if (temp > TARGET_MAX) return { text: "과열!", cls: "hot" };
  return { text: "목표 범위", cls: "good" };
}

function buildDefaultSamples() {
  return [
    createSample(0, "water", 100),
    createSample(1, "oil", 100)
  ];
}

function createSample(id, type, mass) {
  const info = reagentDB[type];
  return {
    id,
    type,
    label: info.label,
    c: info.c,
    color: info.color,
    titleColor: info.titleColor,
    mass,
    temp: AMBIENT_TEMP,
    thermometerEl: null,
    targetZoneEl: null,
    liquidEl: null,
    tempTextEl: null,
    statusEl: null,
    heatCapacityEl: null,
    materialSelectEl: null,
    massSelectEl: null,
    buttonEl: null
  };
}

function updateSampleProperties(sample) {
  const info = reagentDB[sample.type];
  sample.label = info.label;
  sample.c = info.c;
  sample.color = info.color;
  sample.titleColor = info.titleColor;
}

function renderCards() {
  cardsContainer.innerHTML = "";

  samples.forEach((sample, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-title" style="color:${sample.titleColor}">${sample.label}</div>

      <div class="info-box">
        <div class="info-row">
          <div class="info-label">물질 선택</div>
          <select class="select-box material-select">
            <option value="water">물</option>
            <option value="oil">식용유</option>
            <option value="concrete">콘크리트</option>
            <option value="sand">모래</option>
            <option value="copper">구리</option>
          </select>
        </div>

        <div class="info-row">
          <div class="info-label">질량 선택</div>
          <select class="select-box mass-select">
            <option value="100">100g</option>
            <option value="200">200g</option>
            <option value="500">500g</option>
            <option value="1000">1 kg</option>
          </select>
        </div>

        <div class="divider"></div>
        <div class="heat-capacity">비열: ${sample.c}</div>
      </div>

      <div class="thermo-wrap">
        <div class="thermometer">
          <div class="target-zone">TARGET</div>
          <div class="liquid" style="background:${sample.color}"></div>
          <div class="current-temp">${sample.temp.toFixed(1)}°C</div>
        </div>
      </div>

      <div class="status-text low">너무 낮음</div>
      <button class="heat-btn">♨ 가열</button>
    `;

    const materialSelectEl = card.querySelector(".material-select");
    const massSelectEl = card.querySelector(".mass-select");
    const thermometerEl = card.querySelector(".thermometer");
    const targetZoneEl = card.querySelector(".target-zone");
    const liquidEl = card.querySelector(".liquid");
    const tempTextEl = card.querySelector(".current-temp");
    const statusEl = card.querySelector(".status-text");
    const heatCapacityEl = card.querySelector(".heat-capacity");
    const buttonEl = card.querySelector(".heat-btn");
    const titleEl = card.querySelector(".card-title");

    materialSelectEl.value = sample.type;
    massSelectEl.value = String(sample.mass);

    materialSelectEl.addEventListener("change", (e) => {
      sample.type = e.target.value;
      updateSampleProperties(sample);
      sample.temp = AMBIENT_TEMP;
      applySampleVisuals(sample, titleEl);
      updateAllSamplesUI();
      updatePracticeMessage();
    });

    massSelectEl.addEventListener("change", (e) => {
      sample.mass = Number(e.target.value);
      sample.temp = AMBIENT_TEMP;
      thermometerEl.style.setProperty("--thermo-width", `${getThermometerWidth(sample.mass)}px`);
      updateAllSamplesUI();
      updatePracticeMessage();
    });

    buttonEl.addEventListener("click", () => heatSample(sample.id));

    sample.materialSelectEl = materialSelectEl;
    sample.massSelectEl = massSelectEl;
    sample.thermometerEl = thermometerEl;
    sample.targetZoneEl = targetZoneEl;
    sample.liquidEl = liquidEl;
    sample.tempTextEl = tempTextEl;
    sample.statusEl = statusEl;
    sample.heatCapacityEl = heatCapacityEl;
    sample.buttonEl = buttonEl;

    thermometerEl.style.setProperty("--thermo-width", `${getThermometerWidth(sample.mass)}px`);

    cardsContainer.appendChild(card);
    applySampleVisuals(sample, titleEl);
  });

  updateAllSamplesUI();
}

function applySampleVisuals(sample, titleEl) {
  if (titleEl) {
    titleEl.textContent = sample.label;
    titleEl.style.color = sample.titleColor;
  }
  sample.liquidEl.style.background = sample.color;
  sample.heatCapacityEl.textContent = `비열: ${sample.c}`;
}

function updateAllSamplesUI() {
  const targetBottom = tempToHeightPercent(TARGET_MIN);
  const targetTop = tempToHeightPercent(TARGET_MAX);

  samples.forEach((sample) => {
    const height = tempToHeightPercent(sample.temp);
    sample.liquidEl.style.height = `${height}%`;
    sample.tempTextEl.textContent = `${sample.temp.toFixed(1)}°C`;

    sample.targetZoneEl.style.bottom = `${targetBottom}%`;
    sample.targetZoneEl.style.height = `${targetTop - targetBottom}%`;

    const status = getStatus(sample.temp);
    sample.statusEl.textContent = status.text;
    sample.statusEl.className = `status-text ${status.cls}`;

    sample.thermometerEl.style.setProperty("--thermo-width", `${getThermometerWidth(sample.mass)}px`);
  });
}

function heatSample(id) {
  const sample = samples.find((item) => item.id === id);
  if (!sample) return;

  const deltaT = HEAT_Q / (sample.c * sample.mass);
  sample.temp += deltaT;

  if (sample.temp > 140) sample.temp = 140;
  updateAllSamplesUI();
  updatePracticeMessage();
}

function coolSamples(dt) {
  samples.forEach((sample) => {
    const deltaT = (COOLING_POWER * dt) / (sample.c * sample.mass);
    sample.temp -= deltaT;
    if (sample.temp < AMBIENT_TEMP) sample.temp = AMBIENT_TEMP;
  });
}

function updatePracticeMessage() {
  const [a, b] = samples;
  const aCm = a.c * a.mass;
  const bCm = b.c * b.mass;

  if (Math.abs(aCm - bCm) < 0.001) {
    mainMessage.textContent = "비슷한 조건";
    subMessage.textContent =
      "두 시료의 c×m 값이 비슷해서, 같은 열을 가했을 때 온도 변화 양상도 비슷하게 나타난다.";
    return;
  }

  const faster = aCm < bCm ? a : b;
  const slower = aCm < bCm ? b : a;

  mainMessage.textContent = `${faster.label} 쪽이 더 민감함`;
  subMessage.textContent =
    `${faster.label} ${formatMass(faster.mass)}은(는) ${slower.label} ${formatMass(slower.mass)}보다 c×m 값이 작아서, 같은 가열에 더 크게 반응하고 냉각에도 더 빨리 변한다.`;
}

function formatMass(mass) {
  return mass >= 1000 ? `${mass / 1000} kg` : `${mass}g`;
}

function resetPractice() {
  samples = buildDefaultSamples();
  renderCards();
  updatePracticeMessage();
}

function gameLoop(timestamp) {
  if (lastTimestamp === null) {
    lastTimestamp = timestamp;
  }

  const dt = Math.min(0.05, (timestamp - lastTimestamp) / 1000);
  lastTimestamp = timestamp;

  coolSamples(dt);
  updateAllSamplesUI();

  requestAnimationFrame(gameLoop);
}

resetBtn.addEventListener("click", resetPractice);

samples = buildDefaultSamples();
renderCards();
updatePracticeMessage();
requestAnimationFrame(gameLoop);
