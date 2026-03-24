// Firebase 모듈 임포트 (맨 윗줄에 추가)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set, query, orderByChild, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// 본인의 Firebase Config로 교체하세요!
const firebaseConfig = {
  apiKey: "AIzaSyC8n2DKZU3-HRrVx8k82ocICMOs26BnR_M",
  authDomain: "lord-of-specific-heat.firebaseapp.com",
  databaseURL: "https://lord-of-specific-heat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lord-of-specific-heat",
  storageBucket: "lord-of-specific-heat.firebasestorage.app",
  messagingSenderId: "1071681493906",
  appId: "1:1071681493906:web:5c47f588f801cbc999bf4b"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const HEAT_Q = 500;
const COOLING_POWER = 120;
const TARGET_MIN = 70;
const TARGET_MAX = 90;
const HOLD_GOAL = 2.0;
const AMBIENT_TEMP = 20;
const DISPLAY_MAX_TEMP = 100;
const THERMO_MIN_FILL = 18;
const THERMO_FILL_RANGE = 62;
const TOTAL_LEVELS = 10;

const RANKING_STORAGE_PREFIX = "specific_heat_ranking_class_";

const nicknameAList = [
  "싸늘한", "신나는", "두려운", "악몽의",
  "정복자", "귀살대", "초롱초롱", "흥얼거리는",
  "산뜻한", "관대한", "풋풋한","졸린눈의",
  "종언의", "천마", "불타는", "레전드"
];

const nicknameBList = [
  "아인슈타인", "파인만", "갈릴레이", "뉴턴",
  "패러데이", "켈빈", "라부아지에", "멘델",
  "퀴리", "지석영", "파스퇴르", "다윈",
  "호킹", "노이만", "코페르니쿠스", "튜링"
];

const reagentDB = {
  water: { label: "물", c: 1.0, color: "#3b82f6", titleColor: "#2563eb" },
  oil: { label: "식용유", c: 0.47, color: "#f3c316", titleColor: "#d98a00" },
  concrete: { label: "콘크리트", c: 0.21, color: "#8b95a7", titleColor: "#5b6474" },
  sand: { label: "모래", c: 0.19, color: "#d8a25d", titleColor: "#b46910" },
  copper: { label: "구리", c: 0.093, color: "#c97344", titleColor: "#a14c22" }
};

const levels = [
  [{ type: "water", mass: 100 }, { type: "oil", mass: 100 }],
  [{ type: "water", mass: 100 }, { type: "sand", mass: 100 }],
  [{ type: "water", mass: 100 }, { type: "oil", mass: 100 }, { type: "sand", mass: 100 }],
  [{ type: "water", mass: 200 }, { type: "sand", mass: 100 }],
  [{ type: "oil", mass: 100 }, { type: "concrete", mass: 200 }],
  [{ type: "copper", mass: 500 }, { type: "water", mass: 200 }, { type: "sand", mass: 200 }],
  [{ type: "water", mass: 100 }, { type: "oil", mass: 200 }, { type: "copper", mass: 200 }],
  [{ type: "concrete", mass: 500 }, { type: "sand", mass: 200 }, { type: "oil", mass: 100 }],
  [{ type: "water", mass: 200 }, { type: "copper", mass: 1000 }, { type: "sand", mass: 500 }],
  [
    { type: "water", mass: 100 },
    { type: "oil", mass: 200 },
    { type: "concrete", mass: 200 },
    { type: "sand", mass: 500 },
    { type: "copper", mass: 1000 }
  ]
];

const cardsContainer = document.getElementById("cardsContainer");
const totalTimeText = document.getElementById("totalTimeText");
const levelBadge = document.getElementById("levelBadge");
const stageTitle = document.getElementById("stageTitle");
const successTimeText = document.getElementById("successTimeText");
const progressFill = document.getElementById("progressFill");
const mainMessage = document.getElementById("mainMessage");
const subMessage = document.getElementById("subMessage");
const restartBtn = document.getElementById("restartBtn");
const fullResetBtn = document.getElementById("fullResetBtn");
const menuBtn = document.getElementById("menuBtn");
const playerBadge = document.getElementById("playerBadge");
const leaderboardBtn = document.getElementById("leaderboardBtn");

const clearOverlay = document.getElementById("clearOverlay");
const overlayBadge = document.getElementById("overlayBadge");
const overlayTitle = document.getElementById("overlayTitle");
const overlayDesc = document.getElementById("overlayDesc");
const overlayLevelValue = document.getElementById("overlayLevelValue");
const overlayTimeValue = document.getElementById("overlayTimeValue");
const overlayNextBtn = document.getElementById("overlayNextBtn");
const overlayLeaderboardBtn = document.getElementById("overlayLeaderboardBtn");
const overlayResetBtn = document.getElementById("overlayResetBtn");

const profileOverlay = document.getElementById("profileOverlay");
const classSelectEl = document.getElementById("classSelect");
const nicknamePreviewEl = document.getElementById("nicknamePreview");
const profileErrorEl = document.getElementById("profileError");
const randomNicknameBtn = document.getElementById("randomNicknameBtn");
const startGameBtn = document.getElementById("startGameBtn");

let currentLevelIndex = 0;
let reagents = [];
let holdTime = 0;
let totalTime = 0;
let lastTimestamp = null;
let levelCleared = false;
let gameFinished = false;
let running = false;
let hasStartedOnce = false;

let pendingNickname = null;
let playerProfile = null;

function savePlayerProfile(profile) {
  playerProfile = profile;
  updatePlayerBadge();
}

function getFullNickname(profile = playerProfile) {
  if (!profile) return "";
  return `${profile.nicknameA} ${profile.nicknameB}`;
}

function getRankingKey(classNumber) {
  return `${RANKING_STORAGE_PREFIX}${classNumber}`;
}

function getClassRanking(classNumber) {
  try {
    const raw = localStorage.getItem(getRankingKey(classNumber));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveClassRanking(classNumber, ranking) {
  localStorage.setItem(getRankingKey(classNumber), JSON.stringify(ranking));
}
/*
function saveCurrentRecord() {
  if (!playerProfile) return;

  const ranking = getClassRanking(playerProfile.classNumber);

  ranking.push({
    classNumber: playerProfile.classNumber,
    nickname: getFullNickname(),
    time: Number(totalTime.toFixed(3)),
    recordedAt: new Date().toISOString()
  });

  ranking.sort((a, b) => a.time - b.time);
  saveClassRanking(playerProfile.classNumber, ranking.slice(0, 100));
}*/

// 기존 localStorage 방식 대신 Firebase로 전송하도록 변경
async function saveCurrentRecord() {
  if (!playerProfile) return;

  // 1. 이름이 리스트에서 몇 번째 인덱스인지 찾기 (0~15)
  const indexA = nicknameAList.indexOf(playerProfile.nicknameA);
  const indexB = nicknameBList.indexOf(playerProfile.nicknameB);

  // 2. who 데이터 생성 (반 + 닉네임A 헥스 + 닉네임B 헥스)
  // 예: 5반(05) + 10번째(A) + 3번째(3) -> "05A3"
  const classHex = playerProfile.classNumber.toString().padStart(2, '0');
  const hexA = indexA.toString(16).toUpperCase();
  const hexB = indexB.toString(16).toUpperCase();
  const whoHex = classHex + hexA + hexB;

  // 3. time 데이터 생성 (300.56초 -> 30056 정수형)
  const intTime = Math.floor(totalTime * 100);

  // 4. Firebase의 반별 경로에 저장 (예: leaderboard/class_05)
  const classKey = `class_${classHex}`;
  const dbRef = ref(db, `leaderboard/${classKey}`);
  const newRef = push(dbRef); // 고유 ID 자동 생성

  try {
    await set(newRef, {
      who: whoHex,
      time: intTime,
      timestamp: Date.now()
    });
    console.log("서버 저장 완료:", whoHex, intTime);
  } catch (e) {
    console.error("서버 저장 실패:", e);
    alert("기록 저장 중 오류가 발생했습니다.");
  }
}

function updatePlayerBadge() {
  if (!playerBadge) return;

  if (!playerProfile) {
    playerBadge.textContent = "플레이어 미설정";
    return;
  }

  playerBadge.textContent = `${playerProfile.classNumber}반 · ${getFullNickname()}`;
}

function openLeaderboardPage() {
  if (!playerProfile) {
    alert("먼저 반을 선택해주십시오.");
    return;
  }

  window.location.href = `leaderboard.html?class=${playerProfile.classNumber}`;
}

function randomChoice(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateRandomNickname() {
  return {
    nicknameA: randomChoice(nicknameAList),
    nicknameB: randomChoice(nicknameBList)
  };
}

function updateNicknamePreview() {
  if (!nicknamePreviewEl) return;

  if (!pendingNickname) {
    nicknamePreviewEl.textContent = "이름을 생성해주십시오.";
    return;
  }

  nicknamePreviewEl.textContent = `${pendingNickname.nicknameA} ${pendingNickname.nicknameB}`;
}

function rollNickname() {
  pendingNickname = generateRandomNickname();
  updateNicknamePreview();
}

function showProfileOverlay(prefill = false) {
  if (!profileOverlay) return;

  profileErrorEl.textContent = "";

  if (prefill && playerProfile) {
    classSelectEl.value = String(playerProfile.classNumber);
    pendingNickname = {
      nicknameA: playerProfile.nicknameA,
      nicknameB: playerProfile.nicknameB
    };
  } else {
    classSelectEl.value = "";
    pendingNickname = generateRandomNickname();
  }

  updateNicknamePreview();
  profileOverlay.classList.add("show");
}

function hideProfileOverlay() {
  if (!profileOverlay) return;
  profileOverlay.classList.remove("show");
}

function formatMass(mass) {
  return mass >= 1000 ? `${mass / 1000} kg` : `${mass}g`;
}

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

function updateMessages(main, sub) {
  mainMessage.textContent = main;
  subMessage.textContent = sub;
}

function updateBottomUI() {
  successTimeText.textContent = `${holdTime.toFixed(1)}s`;
  progressFill.style.width = `${Math.min(100, (holdTime / HOLD_GOAL) * 100)}%`;
  totalTimeText.textContent = `${totalTime.toFixed(1)}s`;
}

function isInTarget(temp) {
  return temp >= TARGET_MIN && temp <= TARGET_MAX;
}

function getStatus(temp) {
  if (temp < TARGET_MIN) return { text: "너무 낮음", cls: "low" };
  if (temp > TARGET_MAX) return { text: "과열!", cls: "hot" };
  return { text: "목표 범위", cls: "good" };
}

function hideOverlay() {
  clearOverlay.classList.remove("show");
}

function showOverlay({ final = false } = {}) {
  clearOverlay.classList.add("show");
  overlayLevelValue.textContent = `${currentLevelIndex + 1} / ${TOTAL_LEVELS}`;
  overlayTimeValue.textContent = `${totalTime.toFixed(1)}s`;

  if (final) {
    overlayBadge.textContent = "ALL CLEAR";
    overlayTitle.textContent = "모든 레벨 클리어!";
    overlayDesc.textContent =
      `총 기록은 ${totalTime.toFixed(1)}초입니다. ${playerProfile.classNumber}반 · ${getFullNickname()} 기록이 저장되었습니다.`;

    overlayNextBtn.classList.add("hidden");
    overlayLeaderboardBtn.classList.remove("hidden");
    overlayResetBtn.classList.remove("hidden");
  } else {
    overlayBadge.textContent = "LEVEL CLEAR";
    overlayTitle.textContent = `레벨 ${currentLevelIndex + 1} 클리어!`;
    overlayDesc.textContent =
      "모든 시약을 목표 온도 범위에 안정적으로 유지했다. 다음 스테이지로 넘어가라.";

    overlayNextBtn.classList.remove("hidden");
    overlayLeaderboardBtn.classList.add("hidden");
    overlayResetBtn.classList.add("hidden");
  }
}

function updateAllReagentsUI() {
  const targetBottom = tempToHeightPercent(TARGET_MIN);
  const targetTop = tempToHeightPercent(TARGET_MAX);

  reagents.forEach((r) => {
    const height = tempToHeightPercent(r.temp);
    r.liquidEl.style.height = `${height}%`;
    r.tempTextEl.textContent = `${r.temp.toFixed(1)}°C`;

    r.targetZoneEl.style.bottom = `${targetBottom}%`;
    r.targetZoneEl.style.height = `${targetTop - targetBottom}%`;

    const status = getStatus(r.temp);
    r.statusEl.textContent = status.text;
    r.statusEl.className = `status-text ${status.cls}`;

    r.buttonEl.disabled = !running || levelCleared || gameFinished;
  });
}

function heatReagent(id) {
  if (!running || levelCleared || gameFinished) return;

  const r = reagents.find((item) => item.id === id);
  if (!r) return;

  const deltaT = HEAT_Q / (r.c * r.mass);
  r.temp += deltaT;

  if (r.temp > 140) r.temp = 140;
  updateAllReagentsUI();
}

function coolReagents(dt) {
  reagents.forEach((r) => {
    const deltaT = (COOLING_POWER * dt) / (r.c * r.mass);
    r.temp -= deltaT;
    if (r.temp < AMBIENT_TEMP) r.temp = AMBIENT_TEMP;
  });
}

function renderLevel() {
  levelBadge.textContent = `LEVEL ${currentLevelIndex + 1} / ${TOTAL_LEVELS}`;
  stageTitle.textContent = `도전 ${currentLevelIndex + 1}단계`;
  cardsContainer.innerHTML = "";

  reagents.forEach((r) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-title" style="color:${r.titleColor}">${r.label}</div>

      <div class="info-box">
        <div class="info-row">
          <span>질량</span>
          <strong>${formatMass(r.mass)}</strong>
        </div>
        <div class="divider"></div>
        <div class="heat-capacity">비열: ${r.c}</div>
      </div>

      <div class="thermo-wrap">
        <div class="thermometer">
          <div class="target-zone">TARGET</div>
          <div class="liquid" style="background:${r.color}"></div>
          <div class="current-temp">${r.temp.toFixed(1)}°C</div>
        </div>
      </div>

      <div class="status-text low">너무 낮음</div>
      <button class="heat-btn" type="button">♨ 가열</button>
    `;

    const thermometerEl = card.querySelector(".thermometer");
    const targetZoneEl = card.querySelector(".target-zone");
    const liquidEl = card.querySelector(".liquid");
    const tempTextEl = card.querySelector(".current-temp");
    const statusEl = card.querySelector(".status-text");
    const buttonEl = card.querySelector(".heat-btn");

    thermometerEl.style.setProperty("--thermo-width", `${getThermometerWidth(r.mass)}px`);
    buttonEl.addEventListener("click", () => heatReagent(r.id));

    r.thermometerEl = thermometerEl;
    r.targetZoneEl = targetZoneEl;
    r.liquidEl = liquidEl;
    r.tempTextEl = tempTextEl;
    r.statusEl = statusEl;
    r.buttonEl = buttonEl;

    cardsContainer.appendChild(card);
  });

  fullResetBtn.classList.add("hidden");
  updateAllReagentsUI();
}

function buildLevel(levelIndex) {
  hideOverlay();

  const config = levels[levelIndex];
  reagents = config.map((item, index) => {
    const info = reagentDB[item.type];
    return {
      id: index,
      type: item.type,
      label: info.label,
      c: info.c,
      color: info.color,
      titleColor: info.titleColor,
      mass: item.mass,
      temp: AMBIENT_TEMP,
      thermometerEl: null,
      targetZoneEl: null,
      liquidEl: null,
      tempTextEl: null,
      statusEl: null,
      buttonEl: null
    };
  });

  holdTime = 0;
  levelCleared = false;
  running = true;

  renderLevel();
  updateBottomUI();

  if (playerProfile) {
    updateMessages(
      "시작!",
      `${playerProfile.classNumber}반 ${getFullNickname()} 출전. 질량이 클수록 온도계가 굵다. 비열과 질량을 보고 먼저 올릴 시약을 판단해라.`
    );
  } else {
    updateMessages(
      "시작!",
      "질량이 클수록 온도계가 굵다. 비열과 질량을 보고 먼저 올릴 시약을 판단해라."
    );
  }
}

function checkLevelState(dt) {
  const allInTarget = reagents.every((r) => isInTarget(r.temp));

  if (allInTarget) {
    holdTime += dt;
    updateMessages(
      "좋아, 유지 중!",
      `모든 시약이 ${TARGET_MIN}~${TARGET_MAX}℃ 범위 안에 있다. ${HOLD_GOAL.toFixed(1)}초까지 버텨라.`
    );
  } else {
    holdTime = 0;

    const hasHot = reagents.some((r) => r.temp > TARGET_MAX);
    if (hasHot) {
      updateMessages(
        "과열 주의!",
        "하나 이상이 90℃를 넘었다. 비열이 작고 질량이 작은 시약은 특히 급격히 튄다."
      );
    } else {
      updateMessages(
        "온도 맞추기",
        "모든 시약을 동시에 목표 범위 안에 넣어야 한다. 둔한 시약과 민감한 시약의 순서를 생각해라."
      );
    }
  }

  if (holdTime >= HOLD_GOAL) {
    levelCleared = true;
    running = false;
    holdTime = HOLD_GOAL;
    updateBottomUI();

    if (currentLevelIndex < TOTAL_LEVELS - 1) {
      updateMessages(
        `레벨 ${currentLevelIndex + 1} 클리어!`,
        "다음 레벨에서 더 까다로운 조합을 다뤄야 한다."
      );
      showOverlay({ final: false });
    } else {
      gameFinished = true;
      saveCurrentRecord();
      updateMessages(
        "모든 레벨 클리어!",
        `총 기록은 ${totalTime.toFixed(1)}초다. ${playerProfile.classNumber}반 순위표에 저장되었다.`
      );
      fullResetBtn.classList.remove("hidden");
      showOverlay({ final: true });
    }
  }

  updateBottomUI();
}

function restartCurrentLevel() {
  if (!playerProfile) {
    showProfileOverlay(false);
    return;
  }
  buildLevel(currentLevelIndex);
}

function goNextLevel() {
  if (currentLevelIndex < TOTAL_LEVELS - 1) {
    currentLevelIndex += 1;
    buildLevel(currentLevelIndex);
  }
}

function resetEntireGame() {
  if (!playerProfile) {
    showProfileOverlay(false);
    return;
  }

  currentLevelIndex = 0;
  totalTime = 0;
  holdTime = 0;
  gameFinished = false;
  levelCleared = false;
  running = true;
  lastTimestamp = null;

  buildLevel(currentLevelIndex);
  updateBottomUI();
}

function gameLoop(timestamp) {
  if (lastTimestamp === null) {
    lastTimestamp = timestamp;
  }

  const dt = Math.min(0.05, (timestamp - lastTimestamp) / 1000);
  lastTimestamp = timestamp;

  if (running && !levelCleared && !gameFinished && playerProfile) {
    totalTime += dt;
    coolReagents(dt);
    updateAllReagentsUI();
    checkLevelState(dt);
  }

  requestAnimationFrame(gameLoop);
}

function bindProfileEvents() {
  randomNicknameBtn.addEventListener("click", () => {
    rollNickname();
    profileErrorEl.textContent = "";
  });

  classSelectEl.addEventListener("change", () => {
    profileErrorEl.textContent = "";
  });

  startGameBtn.addEventListener("click", () => {
    const classValue = classSelectEl.value;

    if (classValue === "") {
      profileErrorEl.textContent = "반을 선택해주십시오.";
      return;
    }

    const classNumber = Number(classValue);

    if (!Number.isInteger(classNumber) || classNumber < 1 || classNumber > 8) {
      profileErrorEl.textContent = "반을 선택해주십시오.";
      return;
    }

    if (!pendingNickname) {
      rollNickname();
    }

    savePlayerProfile({
      classNumber,
      nicknameA: pendingNickname.nicknameA,
      nicknameB: pendingNickname.nicknameB
    });

    hideProfileOverlay();

    if (!hasStartedOnce) {
      hasStartedOnce = true;
      resetEntireGame();
    } else {
      updateMessages(
        "플레이어 정보 변경 완료",
        `${classNumber}반 ${pendingNickname.nicknameA} ${pendingNickname.nicknameB}로 기록이 저장됩니다.`
      );
    }
  });
}

function initializeProfileState() {
  playerProfile = null;
  classSelectEl.value = "";
  pendingNickname = generateRandomNickname();
  updateNicknamePreview();
  updatePlayerBadge();
}

function initialize() {
  bindProfileEvents();
  initializeProfileState();

  updatePlayerBadge();

  leaderboardBtn.addEventListener("click", openLeaderboardPage);
  overlayLeaderboardBtn.addEventListener("click", openLeaderboardPage);

  restartBtn.addEventListener("click", restartCurrentLevel);
  fullResetBtn.addEventListener("click", resetEntireGame);

  menuBtn.addEventListener("click", () => {
    showProfileOverlay(true);
  });

  overlayNextBtn.addEventListener("click", goNextLevel);
  overlayResetBtn.addEventListener("click", resetEntireGame);

  updateBottomUI();

  running = false;
  hasStartedOnce = false;

  updateMessages(
    "플레이어 설정 필요",
    "타임어택을 시작하려면 먼저 반을 선택해주십시오."
  );

  showProfileOverlay(false);

  requestAnimationFrame(gameLoop);
}

initialize();
