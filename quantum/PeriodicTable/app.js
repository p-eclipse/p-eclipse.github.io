import * as THREE from "three";

const app = document.querySelector("#app");
const info = document.querySelector("#info");
const hud = document.querySelector("#hud");
const hudToggleButton = document.querySelector("#hudToggle");
const backToTableButton = document.querySelector("#backToTable");
const prevElementButton = document.querySelector("#prevElement");
const nextElementButton = document.querySelector("#nextElement");
const metricButtons = [...document.querySelectorAll(".metric")];
const WORLD_UP = new THREE.Vector3(0, 1, 0);

const elementSource = `1,H,수소,1,1,0,2.20;2,He,헬륨,18,1,2,;3,Li,리튬,1,2,4,0.98;4,Be,베릴륨,2,2,5,1.57;5,B,붕소,13,2,6,2.04;6,C,탄소,14,2,6,2.55;7,N,질소,15,2,7,3.04;8,O,산소,16,2,8,3.44;9,F,플루오린,17,2,10,3.98;10,Ne,네온,18,2,10,;11,Na,나트륨,1,3,12,0.93;12,Mg,마그네슘,2,3,12,1.31;13,Al,알루미늄,13,3,14,1.61;14,Si,규소,14,3,14,1.90;15,P,인,15,3,16,2.19;16,S,황,16,3,16,2.58;17,Cl,염소,17,3,18,3.16;18,Ar,아르곤,18,3,22,;19,K,칼륨,1,4,20,0.82;20,Ca,칼슘,2,4,20,1.00;21,Sc,스칸듐,3,4,24,1.36;22,Ti,타이타늄,4,4,26,1.54;23,V,바나듐,5,4,28,1.63;24,Cr,크로뮴,6,4,28,1.66;25,Mn,망가니즈,7,4,30,1.55;26,Fe,철,8,4,30,1.83;27,Co,코발트,9,4,32,1.88;28,Ni,니켈,10,4,30,1.91;29,Cu,구리,11,4,34,1.90;30,Zn,아연,12,4,34,1.65;31,Ga,갈륨,13,4,38,1.81;32,Ge,저마늄,14,4,42,2.01;33,As,비소,15,4,42,2.18;34,Se,셀레늄,16,4,46,2.55;35,Br,브로민,17,4,44,2.96;36,Kr,크립톤,18,4,48,3.00;37,Rb,루비듐,1,5,48,0.82;38,Sr,스트론튬,2,5,50,0.95;39,Y,이트륨,3,5,50,1.22;40,Zr,지르코늄,4,5,50,1.33;41,Nb,나이오븀,5,5,52,1.60;42,Mo,몰리브데넘,6,5,56,2.16;43,Tc,테크네튬,7,5,55,1.90;44,Ru,루테늄,8,5,58,2.20;45,Rh,로듐,9,5,58,2.28;46,Pd,팔라듐,10,5,60,2.20;47,Ag,은,11,5,60,1.93;48,Cd,카드뮴,12,5,66,1.69;49,In,인듐,13,5,66,1.78;50,Sn,주석,14,5,70,1.96;51,Sb,안티모니,15,5,70,2.05;52,Te,텔루륨,16,5,78,2.10;53,I,아이오딘,17,5,74,2.66;54,Xe,제논,18,5,78,2.60;55,Cs,세슘,1,6,78,0.79;56,Ba,바륨,2,6,82,0.89;72,Hf,하프늄,4,6,108,1.30;73,Ta,탄탈럼,5,6,108,1.50;74,W,텅스텐,6,6,110,2.36;75,Re,레늄,7,6,112,1.90;76,Os,오스뮴,8,6,116,2.20;77,Ir,이리듐,9,6,116,2.20;78,Pt,백금,10,6,117,2.28;79,Au,금,11,6,118,2.54;80,Hg,수은,12,6,122,2.00;81,Tl,탈륨,13,6,124,1.62;82,Pb,납,14,6,126,2.33;83,Bi,비스무트,15,6,126,2.02;84,Po,폴로늄,16,6,125,2.00;85,At,아스타틴,17,6,125,2.20;86,Rn,라돈,18,6,136,;87,Fr,프랑슘,1,7,136,0.70;88,Ra,라듐,2,7,138,0.90;104,Rf,러더포듐,4,7,163,;105,Db,더브늄,5,7,163,;106,Sg,시보귬,6,7,165,;107,Bh,보륨,7,7,163,;108,Hs,하슘,8,7,169,;109,Mt,마이트너륨,9,7,169,;110,Ds,다름슈타튬,10,7,171,;111,Rg,뢴트게늄,11,7,171,;112,Cn,코페르니슘,12,7,173,;113,Nh,니호늄,13,7,173,;114,Fl,플레로븀,14,7,175,;115,Mc,모스코븀,15,7,175,;116,Lv,리버모륨,16,7,177,;117,Ts,테네신,17,7,177,;118,Og,오가네손,18,7,176,;57,La,란타넘,4,8,82,1.10;58,Ce,세륨,5,8,82,1.12;59,Pr,프라세오디뮴,6,8,82,1.13;60,Nd,네오디뮴,7,8,82,1.14;61,Pm,프로메튬,8,8,84,1.13;62,Sm,사마륨,9,8,90,1.17;63,Eu,유로퓸,10,8,90,1.20;64,Gd,가돌리늄,11,8,94,1.20;65,Tb,터븀,12,8,94,1.20;66,Dy,디스프로슘,13,8,98,1.22;67,Ho,홀뮴,14,8,98,1.23;68,Er,어븀,15,8,98,1.24;69,Tm,툴륨,16,8,100,1.25;70,Yb,이터븀,17,8,104,1.10;71,Lu,루테튬,18,8,104,1.27;89,Ac,악티늄,4,9,138,1.10;90,Th,토륨,5,9,142,1.30;91,Pa,프로트악티늄,6,9,140,1.50;92,U,우라늄,7,9,146,1.38;93,Np,넵투늄,8,9,144,1.36;94,Pu,플루토늄,9,9,150,1.28;95,Am,아메리슘,10,9,148,1.30;96,Cm,퀴륨,11,9,151,1.30;97,Bk,버클륨,12,9,150,1.30;98,Cf,캘리포늄,13,9,153,1.30;99,Es,아인슈타이늄,14,9,153,1.30;100,Fm,페르뮴,15,9,157,1.30;101,Md,멘델레븀,16,9,157,1.30;102,No,노벨륨,17,9,157,1.30;103,Lr,로렌슘,18,9,163,1.30`;

const elements = elementSource.split(";").map(row => {
  const [Z, s, n, g, p, N, en] = row.split(",");
  return { Z: Number(Z), s, n, g: Number(g), p: Number(p), N: Number(N), en: en === "" ? null : Number(en) };
});

const categoryLabels = { alkali:"알칼리 금속", alkaline:"알칼리 토금속", transition:"전이 금속", post:"전이후 금속", metalloid:"준금속", nonmetal:"비금속", halogen:"할로젠", noble:"비활성 기체", lanthanide:"란타넘족", actinide:"악티늄족" };
const palette = { alkali:0xff6b6b, alkaline:0xffa94d, transition:0x4dabf7, post:0xadb5bd, metalloid:0xf2c94c, nonmetal:0x69db7c, halogen:0x9775fa, noble:0x66d9e8, lanthanide:0xf783ac, actinide:0xb197fc };
const elementsByZ = [...elements].sort((a,b) => a.Z - b.Z);
const ABSOLUTE_NUCLEON_SCALE_MAX = elementsByZ.at(-1).Z + elementsByZ.at(-1).N;
const curationBySymbol = {
  H:"수소는 과학계의 주연급 단역입니다. 우주에서는 별의 연료로 타오르고, 지구에서는 물 분자 한쪽에 얌전히 붙어 있다가, 화학 시간에는 pH와 산·염기 이야기의 문을 열어젖힙니다.",
  He:"헬륨은 풍선 속에서는 목소리를 장난스럽게 바꾸지만, 우주에서는 빅뱅과 별의 핵융합이 남긴 묵직한 흔적입니다. 물리학 실험실에서는 초저온 냉각과 초전도 자석을 떠받칩니다.",
  C:"탄소는 과학계의 변신술사입니다. 별 속에서 만들어져 우주 먼지와 유기분자의 재료가 되고, 땅속에서는 석회암·석탄·흑연·다이아몬드가 되며, 생명과학에서는 단백질과 DNA의 뼈대를 잡습니다.",
  O:"산소는 너무 익숙해서 과소평가되기 쉽습니다. 별과 초신성은 산소를 만들어 우주에 뿌리고, 지각에서는 산화물과 규산염 속에 숨어 있으며, 생명체는 산소로 에너지를 뽑아냅니다.",
  Si:"규소는 모래알에서 시작해 반도체 칩까지 올라가는 출세 서사가 확실한 원소입니다. 지질학에서는 석영과 규산염으로 지각을 떠받치고, 물리학에서는 태양전지와 센서의 중심에 앉아 있습니다.",
  Fe:"철은 우주와 지구와 몸을 한 번에 잇는 원소입니다. 별 내부 핵융합의 말단부에서 묵직하게 등장하고, 지구에서는 핵과 철광석의 중심이 되며, 우리 몸에서는 헤모글로빈 속에서 산소 운반 일을 맡습니다.",
  Cu:"구리는 전선에서 전자를 잘 흘려보내고, 지질학에서는 황동석 같은 광석으로 나타나며, 생명과학에서는 일부 효소의 보조 인자로도 등장합니다. 청동기 시대까지 열어젖힌 역사 욕심도 많은 원소입니다.",
  Au:"금은 장신구의 주인공이지만, 과학적으로는 훨씬 우주적입니다. 중성자별 병합 같은 격렬한 사건에서 무거운 원소가 만들어지는 이야기에 등장하고, 지질학에서는 열수 광맥과 사금으로 모습을 드러냅니다.",
  U:"우라늄은 원소 하나가 우주사·지구사·에너지사를 한 번에 물고 들어옵니다. 격렬한 천체 현상에서 만들어진 뒤 광물 속에 남고, 붕괴로 시간을 읽게 하며, 물리학에서는 핵분열과 에너지 전환을 이야기하게 합니다."
};
const fallbackCuration = {
  alkali:"이 계열 원소들은 화합물이나 이온 상태에서 자주 만납니다. 별빛 스펙트럼에서는 천체 대기의 단서가 되고, 암석과 염류 광물 속에서는 지질학의 표식이 되며, 생명체 안에서는 전기 질서를 건드립니다.",
  alkaline:"이 계열은 광물과 생명체 사이를 자주 오갑니다. 탄산염·황산염·규산염 광물 속에서 지구의 단단한 얼굴을 만들다가도, 생명체 안에서는 뼈·효소·세포 신호 같은 정교한 역할을 맡습니다.",
  transition:"전이 금속은 과학계의 만능 조연단입니다. 광석과 산화물로 땅속에 있다가, 물리학에서는 자성·전도성·합금 성질로 튀어나오고, 생명과학에서는 효소와 전자전달 과정에 끼어듭니다.",
  metalloid:"준금속은 경계에 서 있는 원소들입니다. 광물 결정 속에서는 지질학의 언어로 말하고, 반도체와 센서에서는 물리학의 언어로 말합니다.",
  nonmetal:"비금속 원소들은 공기, 물, 유기물, 생명체, 행성 대기까지 자연스럽게 스며듭니다. 우주에서는 별과 성간 분자 속에 나타나고, 생명과학에서는 단백질과 핵산의 골격을 떠받칩니다.",
  halogen:"할로젠은 반응성이 강해서 과학 이야기에서 늘 사건을 만듭니다. 해수와 증발암에서는 지질학의 냄새를 풍기고, 소독과 생체 조절에서는 생명과학 쪽으로 넘어옵니다.",
  noble:"비활성 기체는 얌전해 보이지만 빛을 만나면 화려합니다. 천체 대기와 우주 기체의 스펙트럼을 읽는 데 등장하고, 물리학 실험실에서는 방전관·레이저·검출기·저온 장치 속에서 조용히 빛납니다.",
  lanthanide:"란타넘족은 이름보다 훨씬 바쁜 집단입니다. 광물 자원으로 지질학에 등장하고, 자석·형광체·레이저·디스플레이에서는 물리학과 공학의 무대에 올라섭니다.",
  actinide:"악티늄족은 무겁고 불안정해서 과학 이야기에 긴장감을 넣습니다. 방사성 광물과 지질 연대 측정, 핵분열과 방사선, 원자력 에너지의 묵직한 장면을 담당합니다.",
  post:"이 원소들은 전형적인 철·구리 같은 금속과는 조금 다른 결을 가집니다. 지질학에서는 희소 금속 자원이나 광석으로 등장하고, 물리학과 공학에서는 밀도·연성·차폐·전도성으로 특수한 자리를 차지합니다."
};

const TILE_W = 1.2, TILE_D = 1.2, GAP = 1.43, BASE_H = 0.16, MAX_H = 5.4;
const DEFAULT_CAMERA_DISTANCE = 36;
const MAX_VIEW_TILT = THREE.MathUtils.degToRad(78);
const DRAG_TILT_SPEED = 0.0065;
const FULL_VIEW_YAW_SPEED = 0.0065;
const FULL_VIEW_INERTIA_DAMPING = 0.925;
const FULL_VIEW_INERTIA_STOP = 0.00005;
const FULL_VIEW_YAW_STOP = 0.00005;
const ATOM_DRAG_YAW_SPEED = 0.0075;
const ATOM_INERTIA_DAMPING = 0.935;
const ATOM_INERTIA_STOP = 0.00008;

const ATOM_DRAG_THETA_SPEED = 0.0065;
const ATOM_THETA_MIN = 0.001;
const ATOM_THETA_MAX = Math.PI / 2;

const ATOM_BAR_GAP = 0.16;

let currentMetric = "protons";
let selectedElement = null;
let atomGroup = null;
let focusTween = null;
let infoPanelMinimized = false;
let tableYaw = 0, tableYawVelocity = 0, atomYawVelocity = 0, atomThetaVelocity = 0;
const viewTilt = new THREE.Vector2(0, 0);
const viewTiltVelocity = new THREE.Vector2(0, 0);
let orbitGroups = [];
let electronMeshes = [];
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x07101f, 0.014);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
app.appendChild(renderer.domElement);

const frustum = 21;
const camera = new THREE.OrthographicCamera(-frustum * window.innerWidth / window.innerHeight / 2, frustum * window.innerWidth / window.innerHeight / 2, frustum / 2, -frustum / 2, 0.1, 1000);
camera.position.set(0, DEFAULT_CAMERA_DISTANCE, 0);
camera.up.set(0, 0, -1);
camera.lookAt(0, 0, 0);

const controlsTarget = new THREE.Vector3(0, 0, 0);
const tiles = [], guideObjects = [], rayTargets = [];
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let pointerDown = null;
let activePointers = new Map();
let multiTouchInProgress = false;
let touchGesture = null;

function categoryOf(e) {
  if (e.p === 8) return "lanthanide";
  if (e.p === 9) return "actinide";
  if (e.g === 18) return "noble";
  if (e.g === 17) return "halogen";
  if (e.g === 1 && e.Z !== 1) return "alkali";
  if (e.g === 2) return "alkaline";
  if (e.g >= 3 && e.g <= 12) return "transition";
  if ([5, 14, 32, 33, 51, 52, 84].includes(e.Z)) return "metalloid";
  if ([1, 6, 7, 8, 15, 16, 34].includes(e.Z)) return "nonmetal";
  return "post";
}

function metricValue(e, metric = currentMetric) {
  if (metric === "protons") return e.Z;
  if (metric === "neutrons") return e.N;
  if (metric === "massNumber") return e.Z + e.N;
  if (metric === "electronegativity") return e.en ?? 0;
  return e.Z;
}

function maxMetric(metric) {
  return metric === "electronegativity" ? 4.0 : Math.max(...elements.map(e => metricValue(e, metric)));
}

function heightFor(e, metric = currentMetric) {
  const value = metricValue(e, metric);
  if (metric === "electronegativity") {
    if (!e.en) return BASE_H + 0.04;
    return BASE_H + MAX_H * Math.pow(value / maxMetric(metric), 0.82);
  }
  return BASE_H + MAX_H * THREE.MathUtils.clamp(value / ABSOLUTE_NUCLEON_SCALE_MAX, 0, 1);
}

function tilePosition(e) {
  return new THREE.Vector3((e.g - 9.5) * GAP, 0, (e.p - 5.05) * GAP);
}

function makeLabelTexture(e, categoryColor) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(0,0,0,0.92)";
  ctx.font = "900 168px system-ui, sans-serif";
  ctx.fillText(e.s, 256, 256);
  ctx.fillStyle = "rgba(0,0,0,0.72)";
  ctx.font = "700 72px system-ui, sans-serif";
  ctx.fillText(e.Z, 256, 148);
  ctx.font = "700 64px system-ui, sans-serif";
  ctx.fillText(e.n, 256, 376);
  //ctx.fillStyle = `#${categoryColor.toString(16).padStart(6, "0")}`;
  //ctx.fillRect(104, 404, 304, 12);
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function clampViewTilt() {
  viewTilt.x = 0;
  viewTilt.y = THREE.MathUtils.clamp(viewTilt.y, -MAX_VIEW_TILT, MAX_VIEW_TILT);
}

function applyViewFromTilt(distance = camera.position.distanceTo(controlsTarget)) {
  clampViewTilt();
  const pitch = viewTilt.y;
  const theta = Math.abs(pitch);
  const y = Math.cos(theta) * distance;
  const horizontal = Math.sin(theta) * distance;
  const pitchSign = Math.sign(pitch) || -1;
  const horizontalDir = new THREE.Vector3(0, 0, pitchSign).applyAxisAngle(WORLD_UP, tableYaw);
  const screenUp = new THREE.Vector3(0, 0, -1).applyAxisAngle(WORLD_UP, tableYaw);
  camera.position.set(controlsTarget.x + horizontal * horizontalDir.x, controlsTarget.y + y, controlsTarget.z + horizontal * horizontalDir.z);
  camera.up.copy(screenUp);
  camera.lookAt(controlsTarget);
  camera.updateProjectionMatrix();
}

function syncViewTiltFromCamera() {
  const offset = camera.position.clone().sub(controlsTarget);
  const distance = Math.max(0.0001, offset.length());
  const theta = Math.acos(THREE.MathUtils.clamp(offset.y / distance, -1, 1));
  const horizontal = Math.hypot(offset.x, offset.z);
  if (horizontal < 0.0001 || theta < 0.0001) viewTilt.set(0, 0);
  else {
    tableYaw = Math.atan2(offset.x, offset.z);
    viewTilt.set(0, theta);
  }
  clampViewTilt();
}

function createLightsAndFloor() {
  scene.add(new THREE.HemisphereLight(0xcfe4ff, 0x06101f, 0.72));
  const key = new THREE.DirectionalLight(0xfff3d0, 2.45);
  key.position.set(6, 30, -14);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 70;
  key.shadow.camera.left = -18;
  key.shadow.camera.right = 18;
  key.shadow.camera.top = 18;
  key.shadow.camera.bottom = -18;
  key.target.position.set(0, 0, 0);
  scene.add(key, key.target);
  const fill = new THREE.PointLight(0x5b8dff, 0.35, 42);
  fill.position.set(-8, 8, 10);
  scene.add(fill);

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(34, 20), new THREE.MeshStandardMaterial({ color: 0x071221, roughness: 0.94, metalness: 0.04, transparent: true, opacity: 0.96 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.035;
  floor.receiveShadow = true;
  scene.add(floor);
  const tableBase = new THREE.Mesh(new THREE.PlaneGeometry(27.2, 14.4), new THREE.MeshStandardMaterial({ color: 0x0a1829, roughness: 0.9, metalness: 0.03, transparent: true, opacity: 0.82 }));
  tableBase.rotation.x = -Math.PI / 2;
  tableBase.position.y = -0.018;
  tableBase.receiveShadow = true;
  scene.add(tableBase);
  const grid = new THREE.GridHelper(34, 34, 0x243b55, 0x132238);
  grid.position.y = -0.012;
  scene.add(grid);
}

function createTiles() {
  for (const e of elements) {
    const cat = categoryOf(e);
    const color = palette[cat];
    e.category = cat;
    e.protons = e.Z;
    e.neutrons = e.N;
    e.massNumber = e.Z + e.N;
    const h = heightFor(e);
    const pos = tilePosition(e);
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(TILE_W, 1, TILE_D, 2, 2, 2), new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.18, emissive: color, emissiveIntensity: 0.06, side: THREE.FrontSide }));
    mesh.scale.y = h;
    mesh.position.set(pos.x, h / 2, pos.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.element = e;
    mesh.userData.baseColor = color;
    scene.add(mesh);
    rayTargets.push(mesh);
    const label = new THREE.Mesh(new THREE.PlaneGeometry(TILE_W * 0.96, TILE_D * 0.96), new THREE.MeshBasicMaterial({ map: makeLabelTexture(e, color), transparent: true, depthWrite: false, opacity: 1.0 }));
    label.rotation.x = -Math.PI / 2;
    label.position.set(pos.x, h + 0.012, pos.z);
    label.renderOrder = 3;
    scene.add(label);
    tiles.push({ e, mesh, label, currentHeight: h, targetHeight: h });
  }
}

function createPrintedBlock(width, depth, height, x, z, texture, baseColor = 0x0c1a2b) {
  const sideMat = new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.72, metalness: 0.08 });
  const topMat = new THREE.MeshBasicMaterial({ map: texture });
  const printedBlock = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    [sideMat, sideMat, topMat, sideMat, sideMat, sideMat]
  );
  printedBlock.position.set(x, height / 2, z);
  printedBlock.receiveShadow = true;
  printedBlock.castShadow = true;
  scene.add(printedBlock);
  guideObjects.push(printedBlock);
  return printedBlock;
}

function createSeriesGuide(labelText, row, color) {
  const c = document.createElement("canvas");
  c.width = 1560;
  c.height = 360;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#0a1829";
  ctx.fillRect(0, 0, c.width, c.height);
  const hex = `#${color.toString(16).padStart(6, "0")}`;
  ctx.fillStyle = hex;
  ctx.fillRect(78, 322, 1244, 34);
  ctx.lineWidth = 14;
  ctx.strokeStyle = "rgba(0,0,0,0.62)";
  ctx.font = "950 128px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeText(labelText, 700, 190);
  ctx.fillStyle = "rgba(238,245,255,0.98)";
  ctx.fillText(labelText, 700, 190);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  createPrintedBlock(4.85, 1.12, 0.16, (2.7 - 9.5) * GAP, (row - 5.05) * GAP, tex, 0x0a1829);
}

function createSeriesPlaceholder(group, period, dotCount) {
  const color = group === "lanthanide" ? palette.lanthanide : palette.actinide;
  const h = heightFor(elementsByZ[0], "protons");
  const pos = tilePosition({ g: 3, p: period });
  const sideMat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.42,
    metalness: 0.18,
    emissive: color,
    emissiveIntensity: 0.08,
    side: THREE.FrontSide
  });
  const marker = new THREE.Mesh(new THREE.BoxGeometry(TILE_W, 1, TILE_D, 2, 2, 2), sideMat);
  marker.scale.y = h;
  marker.position.set(pos.x, h / 2, pos.z);
  marker.castShadow = true;
  marker.receiveShadow = true;
  marker.userData.seriesPlaceholder = group;
  scene.add(marker);
  guideObjects.push(marker);

  const dotMat = new THREE.MeshBasicMaterial({ color: 0x08101c, depthWrite: true, depthTest: true });
  const dotGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.018, 32);
  const offsets = dotCount === 1 ? [0] : [-0.135, 0.135];
  for (const dx of offsets) {
    const dot = new THREE.Mesh(dotGeo, dotMat.clone());
    dot.position.set(pos.x + dx, h + 0.014, pos.z);
    dot.castShadow = false;
    dot.receiveShadow = false;
    scene.add(dot);
    guideObjects.push(dot);
  }
}

function createCategoryLegendOnTable() {
  const items = [
    ["알칼리", palette.alkali],
    ["알칼리 토금속", palette.alkaline],
    ["전이 금속", palette.transition],
    ["전이후 금속", palette.post],
    ["준금속", palette.metalloid],
    ["비금속", palette.nonmetal],
    ["할로젠", palette.halogen],
    ["비활성 기체", palette.noble],
    ["란타넘족", palette.lanthanide],
    ["악티늄족", palette.actinide]
  ];

  const c = document.createElement("canvas");
  c.width = 2620;
  c.height = 600;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#0a1829";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.font = "950 64px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  const colW = 510;
  const rowH = 260;
  const startX = 120;
  const startY = 220;

  for (let i = 0; i < items.length; i++) {
    const [label, color] = items[i];
    const col = i % 5;
    const row = Math.floor(i / 5);
    const x = startX + col * colW;
    const y = startY + row * rowH;
    const hex = `#${color.toString(16).padStart(6, "0")}`;

    ctx.fillStyle = hex;
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 9;
    ctx.strokeStyle = "rgba(0,0,0,0.52)";
    ctx.stroke();

    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgba(0,0,0,0.62)";
    ctx.strokeText(label, x + 78, y + 2);
    ctx.fillStyle = "rgba(238,245,255,0.98)";
    ctx.fillText(label, x + 78, y + 2);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  createPrintedBlock(11.8, 2.7, 0.16, (7.45 - 9.5) * GAP, (2.52 - 5.05) * GAP, tex, 0x0a1829);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function shellDistribution(Z) {
  const orbitals = [[1,2],[2,2],[2,6],[3,2],[3,6],[4,2],[3,10],[4,6],[5,2],[4,10],[5,6],[6,2],[4,14],[5,10],[6,6],[7,2],[5,14],[6,10],[7,6]];
  const shells = [0,0,0,0,0,0,0];
  let left = Z;
  for (const [n, cap] of orbitals) {
    if (left <= 0) break;
    const count = Math.min(cap, left);
    shells[n - 1] += count;
    left -= count;
  }
  return shells.filter(count => count > 0);
}

function atomScaleFor(e) {
  return THREE.MathUtils.clamp(1.05 + Math.log10(e.Z + 1) * 0.12, 1.08, 1.34);
}

function atomOuterBoundaryRadiusFor(e) {
  const shells = shellDistribution(e.Z);
  return 0.78 + Math.max(0, shells.length - 1) * 0.32 + 0.22;
}

function atomCenterYFor(e, tileHeight) {
  return tileHeight + atomOuterBoundaryRadiusFor(e) * atomScaleFor(e) + ATOM_BAR_GAP;
}

function seededRandom(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledNucleonKinds(Z, N) {
  const kinds = [...Array.from({ length: Z }, () => "proton"), ...Array.from({ length: N }, () => "neutron")];
  const random = seededRandom(Z * 1009 + N * 9176 + 41);
  for (let i = kinds.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [kinds[i], kinds[j]] = [kinds[j], kinds[i]];
  }
  return kinds;
}

function nucleonPositions(total, seed = 1) {
  const positions = [];
  if (total <= 1) return [new THREE.Vector3(0,0,0)];
  const random = seededRandom(seed);
  const maxR = THREE.MathUtils.clamp(0.050 * Math.cbrt(total), 0.12, 0.42);
  const minDist = 0.105;
  let attempts = 0;
  while (positions.length < total && attempts < total * 90) {
    attempts++;
    const r = maxR * Math.pow(random(), 0.55);
    const cosTheta = random() * 2 - 1;
    const sinTheta = Math.sqrt(Math.max(0, 1 - cosTheta * cosTheta));
    const phi = random() * Math.PI * 2;
    const candidate = new THREE.Vector3(r * sinTheta * Math.cos(phi), r * cosTheta, r * sinTheta * Math.sin(phi));
    let tooClose = false;
    for (const p of positions) {
      if (candidate.distanceToSquared(p) < minDist * minDist) {
        tooClose = true;
        break;
      }
    }
    if (!tooClose || positions.length > total * 0.72) positions.push(candidate);
  }
  while (positions.length < total) positions.push(new THREE.Vector3((random()-0.5)*maxR, (random()-0.5)*maxR, (random()-0.5)*maxR));
  const center = positions.reduce((sum, p) => sum.add(p), new THREE.Vector3()).multiplyScalar(1 / positions.length);
  for (const p of positions) p.sub(center);
  return positions;
}

/*function clearAtom() {
  if (!atomGroup) return;
  scene.remove(atomGroup);
  atomGroup.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) Array.isArray(obj.material) ? obj.material.forEach(m => m.dispose()) : obj.material.dispose();
  });
  atomGroup = null;
}*/
function clearAtom() {
  if (!atomGroup) return;

  scene.remove(atomGroup);

  atomGroup.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose();

    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach(m => m.dispose());
      } else {
        obj.material.dispose();
      }
    }
  });

  atomGroup = null;
  orbitGroups = [];
  electronMeshes = [];
}

/*function createElectronOrbit(shellIndex, radius, count, electronMat, electronGeo, orbitMat) {
  const group = new THREE.Group();
  group.rotation.set(Math.PI / 2 + (shellIndex % 2 === 0 ? 0.42 : -0.42), shellIndex * 0.38, shellIndex * 0.71);
  group.userData.isOrbitGroup = true;
  group.userData.speed = 0.0045 + shellIndex * 0.0012;
  group.add(new THREE.Mesh(new THREE.TorusGeometry(radius, 0.008, 8, 192), orbitMat.clone()));
  const electronHaloGeo = new THREE.SphereGeometry(0.092, 20, 14);
  const electronHaloMat = new THREE.MeshBasicMaterial({ color: 0x8edfff, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false });
  for (let i = 0; i < count; i++) {
    const theta = (i / count) * Math.PI * 2;
    const electron = new THREE.Mesh(electronGeo, electronMat);
    electron.position.set(Math.cos(theta) * radius, Math.sin(theta) * radius, 0);
    electron.userData = { isElectron: true, radius, theta, speed: 0.018 + shellIndex * 0.0026 };
    electron.castShadow = false;
    const halo = new THREE.Mesh(electronHaloGeo, electronHaloMat);
    halo.renderOrder = 5;
    electron.add(halo);
    group.add(electron);
  }
  return group;
}*/
function createElectronOrbit(shellIndex, radius, count, electronMat, electronGeo, orbitMat) {
  const group = new THREE.Group();

  /*group.rotation.set(
    Math.PI / 2 + (shellIndex % 2 === 0 ? 0.42 : -0.42),
    shellIndex * 0.38,
    shellIndex * 0.71
  );

  group.userData.isOrbitGroup = true;
  group.userData.speed = 0.0045 + shellIndex * 0.0012;*/

  const orbitDirection = -1;
  const orbitSpeedScale = 0.04;
  
  const baseX = Math.PI / 2 + (shellIndex % 2 === 0 ? 0.42 : -0.42);
  const baseY = shellIndex * 0.38;
  const baseZ = shellIndex * 0.71;
  
  group.rotation.set(baseX, baseY, baseZ);
  
  group.userData.isOrbitGroup = true;
  group.userData.speed = orbitDirection * orbitSpeedScale * (0.0045 + shellIndex * 0.0012);
  group.userData.baseX = baseX;
  group.userData.baseY = baseY;

  const orbit = new THREE.Mesh(
    new THREE.TorusGeometry(radius, 0.008, 6, 96),
    orbitMat.clone()
  );

  group.add(orbit);

  for (let i = 0; i < count; i++) {
    const theta = (i / count) * Math.PI * 2;
    const electron = new THREE.Mesh(electronGeo, electronMat);

    electron.position.set(
      Math.cos(theta) * radius,
      Math.sin(theta) * radius,
      0
    );

    electron.userData = {
      isElectron: true,
      radius,
      theta,
      speed: orbitDirection * orbitSpeedScale * (0.018 + shellIndex * 0.0026)
    };

    electron.castShadow = false;
    group.add(electron);
    electronMeshes.push(electron);
  }

  orbitGroups.push(group);
  return group;
}

function createAtomModel(e, basePos, tileHeight) {
  clearAtom();
  atomGroup = new THREE.Group();
  atomGroup.position.set(basePos.x, atomCenterYFor(e, tileHeight), basePos.z);
  scene.add(atomGroup);
  const nucleus = new THREE.Group();
  atomGroup.add(nucleus);
  const protonMat = new THREE.MeshStandardMaterial({ color: 0xff4f66, emissive: 0xff1e38, emissiveIntensity: 0.45, roughness: 0.28, metalness: 0.08 });
  const neutronMat = new THREE.MeshStandardMaterial({ color: 0xdbe7f6, emissive: 0x53677f, emissiveIntensity: 0.22, roughness: 0.48, metalness: 0.03 });
  const nucleonGeo = new THREE.SphereGeometry(0.083, 22, 16);
  /*const totalNucleons = e.Z + e.N;
  const nucleonKinds = shuffledNucleonKinds(e.Z, e.N);
  const positions = nucleonPositions(totalNucleons, e.Z * 7919 + e.N * 104729);
  const random = seededRandom(e.Z * 57 + e.N * 131);
  for (let i = 0; i < totalNucleons; i++) {
    const isProton = nucleonKinds[i] === "proton";
    const particle = new THREE.Mesh(nucleonGeo, isProton ? protonMat : neutronMat);
    particle.position.copy(positions[i]);
    particle.rotation.set(random() * Math.PI, random() * Math.PI, random() * Math.PI);
    particle.castShadow = true;
    nucleus.add(particle);
  }*/

  const totalNucleons = e.Z + e.N;
  const nucleonKinds = shuffledNucleonKinds(e.Z, e.N);
  const positions = nucleonPositions(totalNucleons, e.Z * 7919 + e.N * 104729);
  const random = seededRandom(e.Z * 57 + e.N * 131);
  
  const protonMesh = new THREE.InstancedMesh(nucleonGeo, protonMat, e.Z);
  const neutronMesh = new THREE.InstancedMesh(nucleonGeo, neutronMat, e.N);
  
  protonMesh.castShadow = false;
  protonMesh.receiveShadow = false;
  neutronMesh.castShadow = false;
  neutronMesh.receiveShadow = false;
  
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3(1, 1, 1);
  
  let protonIndex = 0;
  let neutronIndex = 0;
  
  for (let i = 0; i < totalNucleons; i++) {
    const position = positions[i];
  
    quaternion.setFromEuler(
      new THREE.Euler(
        random() * Math.PI,
        random() * Math.PI,
        random() * Math.PI
      )
    );
  
    matrix.compose(position, quaternion, scale);
  
    if (nucleonKinds[i] === "proton") {
      protonMesh.setMatrixAt(protonIndex, matrix);
      protonIndex++;
    } else {
      neutronMesh.setMatrixAt(neutronIndex, matrix);
      neutronIndex++;
    }
  }
  
  protonMesh.instanceMatrix.needsUpdate = true;
  neutronMesh.instanceMatrix.needsUpdate = true;
  
  nucleus.add(protonMesh);
  nucleus.add(neutronMesh);
  
  const coreGlow = new THREE.PointLight(0xffb0ba, 1.25, 4.5);
  coreGlow.position.set(0, 0.2, 0);
  atomGroup.add(coreGlow);
  const electronMat = new THREE.MeshStandardMaterial({ color: 0xfbfdff, emissive: 0x86ddff, emissiveIntensity: 2.35, roughness: 0.05, metalness: 0.0 });
  const electronGeo = new THREE.SphereGeometry(0.034, 18, 12);
  const orbitMat = new THREE.MeshBasicMaterial({ color: 0x8ddcff, transparent: true, opacity: 0.32 });
  const shells = shellDistribution(e.Z);
  const outerElectronRadius = 0.78 + Math.max(0, shells.length - 1) * 0.32;
  const atomBoundary = new THREE.Mesh(new THREE.IcosahedronGeometry(outerElectronRadius + 0.22, 3), new THREE.MeshBasicMaterial({ color: 0xbfeeff, transparent: true, opacity: 0.052, wireframe: true, depthWrite: false }));
  atomBoundary.renderOrder = 1;
  atomGroup.add(atomBoundary);
  shells.forEach((count, shellIndex) => atomGroup.add(createElectronOrbit(shellIndex, 0.78 + shellIndex * 0.32, count, electronMat, electronGeo, orbitMat)));
  atomGroup.scale.setScalar(atomScaleFor(e));
}

function showInfo(e) {
  selectedElement = e;
  const story = curationBySymbol[e.s] ?? fallbackCuration[e.category] ?? "이 원소는 안정 동위원소, 산화수, 광물 형태, 화합물 성질에 따라 여러 과학 분야에서 전혀 다른 얼굴로 등장합니다.";
  info.innerHTML = `
    <button
      class="info-minimize"
      type="button"
      aria-label="${infoPanelMinimized ? "원소 설명 펼치기" : "원소 설명 최소화"}"
      title="${infoPanelMinimized ? "원소 설명 펼치기" : "원소 설명 최소화"}"
    >${infoPanelMinimized ? "+" : "−"}</button>
    <div class="symbol-row">
      <div class="big-symbol">${e.s}</div>
      <div>
        <div class="name">${e.n}</div>
        <div class="category">${categoryLabels[e.category]} · ${e.p <= 7 ? `${e.p}주기 ${e.g}족` : categoryLabels[e.category]}</div>
      </div>
    </div>
    <div class="facts">
      <div class="fact"><div class="k">양성자수 Z</div><div class="v">${e.Z}</div></div>
      <div class="fact"><div class="k">중성자수 N</div><div class="v">${e.N}</div></div>
      <div class="fact"><div class="k">질량수 A</div><div class="v">${e.Z + e.N}</div></div>
      <div class="fact"><div class="k">전기음성도</div><div class="v">${e.en ? e.en.toFixed(2) : "미정"}</div></div>
    </div>
    <div class="curation">
      <div class="curation-title">이 원소는...</div>
      <div class="curation-list"><div class="curation-item">${story}</div></div>
    </div>
  `;
  setInfoPanelMinimized(infoPanelMinimized);
}


function setInfoPanelMinimized(minimized) {
  infoPanelMinimized = minimized;
  info.classList.toggle("minimized", minimized);

  const button = info.querySelector(".info-minimize");
  if (button) {
    button.textContent = minimized ? "+" : "−";
    button.setAttribute(
      "aria-label",
      minimized ? "원소 설명 펼치기" : "원소 설명 최소화"
    );
    button.setAttribute(
      "title",
      minimized ? "원소 설명 펼치기" : "원소 설명 최소화"
    );
  }
}

function showAtomInfoControls() {
  info.classList.add("visible");
}

/*function hideAtomInfoControls() {
  info.classList.remove("visible");
  info.innerHTML = "";
}*/
function hideAtomInfoControls() {
  info.classList.remove("visible");
  info.classList.remove("minimized");
  infoPanelMinimized = false;
  info.innerHTML = "";
}

function applySelectionDim(selectedElementForDim) {
  for (const t of tiles) {
    const selected = t.e === selectedElementForDim;
    const baseColor = t.mesh.userData.baseColor;
    t.mesh.visible = selected;
    t.label.visible = selected;
    t.mesh.material.color.setHex(baseColor);
    t.mesh.material.emissive.setHex(baseColor);
    t.mesh.material.emissiveIntensity = selected ? 0.48 : 0.0;
    t.mesh.material.opacity = selected ? 1.0 : 0.0;
    t.mesh.material.transparent = true;
    t.mesh.castShadow = selected;
    t.mesh.receiveShadow = selected;
    t.label.material.opacity = selected ? 1.0 : 0.0;
  }
  for (const obj of guideObjects) obj.visible = false;
}

function restoreTileBrightness() {
  for (const t of tiles) {
    t.mesh.visible = true;
    t.label.visible = true;
    t.mesh.material.opacity = 1.0;
    t.mesh.material.transparent = true;
    t.mesh.material.emissiveIntensity = 0.06;
    t.mesh.castShadow = true;
    t.mesh.receiveShadow = true;
    t.label.material.opacity = 1.0;
  }
  for (const obj of guideObjects) obj.visible = true;
}

function centerCameraOnAtom(e, tileHeight, animate = true) {
  const pos = tilePosition(e);
  const atomCenter = new THREE.Vector3(pos.x, atomCenterYFor(e, tileHeight), pos.z);
  const endTarget = atomCenter;
  const endPos = atomCenter.clone().add(new THREE.Vector3(5.8, 4.2, -9.2));
  if (!animate) {
    controlsTarget.copy(endTarget);
    camera.position.copy(endPos);
    camera.up.copy(WORLD_UP);
    camera.lookAt(controlsTarget);
    camera.updateProjectionMatrix();
    return;
  }
  focusTween = { t: 0, startPos: camera.position.clone(), startTarget: controlsTarget.clone(), endPos, endTarget, endZoom: 3.35, startZoom: camera.zoom, upStart: camera.up.clone(), upEnd: WORLD_UP.clone(), mode: "atomFrontSide" };
}

function setAtomNavVisible(visible) {
  prevElementButton.classList.toggle("visible", visible);
  nextElementButton.classList.toggle("visible", visible);
}

function focusElement(e) {
  viewTiltVelocity.set(0, 0);
  tableYawVelocity = 0;
  atomYawVelocity = 0;
  atomThetaVelocity = 0;
  backToTableButton.classList.add("visible");
  setAtomNavVisible(true);
  infoPanelMinimized = window.innerWidth <= 860;
  showAtomInfoControls();
  const pos = tilePosition(e);
  const tile = tiles.find(t => t.e === e);
  const h = tile?.currentHeight ?? heightFor(e);
  createAtomModel(e, pos, h);
  showInfo(e);
  applySelectionDim(e);
  centerCameraOnAtom(e, h, true);
}

function focusAdjacentElement(delta) {
  if (!selectedElement) return;
  const currentIndex = elementsByZ.findIndex(e => e.Z === selectedElement.Z);
  if (currentIndex < 0) return;
  focusElement(elementsByZ[(currentIndex + delta + elementsByZ.length) % elementsByZ.length]);
}

function isAtomViewActive() {
  return !!selectedElement && !!atomGroup;
}

/*function rotateAtomCamera(deltaYaw) {
  if (!isAtomViewActive()) return;
  const offset = camera.position.clone().sub(controlsTarget);
  offset.applyAxisAngle(WORLD_UP, deltaYaw);
  camera.position.copy(controlsTarget).add(offset);
  camera.up.copy(WORLD_UP);
  camera.lookAt(controlsTarget);
  camera.updateProjectionMatrix();
}*/
function getAtomCameraSpherical() {
  const offset = camera.position.clone().sub(controlsTarget);
  const radius = Math.max(0.001, offset.length());

  return {
    radius,
    theta: Math.acos(THREE.MathUtils.clamp(offset.y / radius, -1, 1)),
    phi: Math.atan2(offset.x, offset.z)
  };
}

function setAtomCameraFromSpherical(radius, theta, phi) {
  const clampedTheta = THREE.MathUtils.clamp(
    theta,
    ATOM_THETA_MIN,
    ATOM_THETA_MAX
  );

  const sinTheta = Math.sin(clampedTheta);

  camera.position.set(
    controlsTarget.x + radius * sinTheta * Math.sin(phi),
    controlsTarget.y + radius * Math.cos(clampedTheta),
    controlsTarget.z + radius * sinTheta * Math.cos(phi)
  );

  camera.up.copy(WORLD_UP);
  camera.lookAt(controlsTarget);
  camera.updateProjectionMatrix();
}

function rotateAtomCamera(deltaYaw, deltaTheta = 0) {
  if (!isAtomViewActive()) return;

  const spherical = getAtomCameraSpherical();

  setAtomCameraFromSpherical(
    spherical.radius,
    spherical.theta + deltaTheta,
    spherical.phi + deltaYaw
  );
}

function changeMetric(metric) {
  currentMetric = metric;
  metricButtons.forEach(b => b.classList.toggle("active", b.dataset.metric === metric));
  for (const t of tiles) t.targetHeight = heightFor(t.e, metric);
  if (selectedElement) {
    showInfo(selectedElement);
    const selectedTile = tiles.find(t => t.e === selectedElement);
    if (selectedTile) {
      const pos = tilePosition(selectedElement);
      createAtomModel(selectedElement, pos, selectedTile.currentHeight);
      centerCameraOnAtom(selectedElement, selectedTile.currentHeight, false);
    }
  }
}

function setHudCollapsed(collapsed) {
  hud.classList.toggle("collapsed", collapsed);
  const icon = hudToggleButton.querySelector(".chevron");
  if (icon) icon.className = `chevron ${collapsed ? "down" : "up"}`;
  hudToggleButton.setAttribute("aria-label", collapsed ? "설정 펼치기" : "설정 접기");
  hudToggleButton.setAttribute("title", collapsed ? "설정 펼치기" : "설정 접기");
}

/*function updateTileHeights() {
  for (const t of tiles) {
    if (!t.mesh.visible && t.e !== selectedElement) continue;
    t.currentHeight += (t.targetHeight - t.currentHeight) * 0.12;
    const h = Math.max(BASE_H, t.currentHeight);
    const pos = tilePosition(t.e);
    t.mesh.scale.y = h;
    t.mesh.position.set(pos.x, h / 2, pos.z);
    t.label.position.set(pos.x, h + 0.014, pos.z);
  }
  if (selectedElement && atomGroup && !focusTween) {
    const selectedTile = tiles.find(t => t.e === selectedElement);
    if (selectedTile) {
      const pos = tilePosition(selectedElement);
      const atomCenterY = atomCenterYFor(selectedElement, selectedTile.currentHeight);
      atomGroup.position.set(pos.x, atomCenterY, pos.z);
      controlsTarget.lerp(new THREE.Vector3(pos.x, atomCenterY, pos.z), 0.16);
    }
  }
}*/
function updateOneTileHeight(t) {
  t.currentHeight += (t.targetHeight - t.currentHeight) * 0.12;

  const h = Math.max(BASE_H, t.currentHeight);
  const pos = tilePosition(t.e);

  t.mesh.scale.y = h;
  t.mesh.position.set(pos.x, h / 2, pos.z);
  t.label.position.set(pos.x, h + 0.014, pos.z);
}

function updateTileHeights() {
  if (selectedElement) {
    const selectedTile = tiles.find(t => t.e === selectedElement);

    if (selectedTile) {
      updateOneTileHeight(selectedTile);

      if (atomGroup && !focusTween) {
        const pos = tilePosition(selectedElement);
        const atomCenterY = atomCenterYFor(selectedElement, selectedTile.currentHeight);

        atomGroup.position.set(pos.x, atomCenterY, pos.z);

        controlsTarget.lerp(
          new THREE.Vector3(pos.x, atomCenterY, pos.z),
          0.16
        );
      }
    }

    return;
  }

  for (const t of tiles) {
    updateOneTileHeight(t);
  }
}

/*function updateAtomCameraInertia() {
  if (!isAtomViewActive() || focusTween || pointerDown?.dragged) return;
  if (Math.abs(atomYawVelocity) < ATOM_INERTIA_STOP) {
    atomYawVelocity = 0;
    return;
  }
  rotateAtomCamera(atomYawVelocity);
  atomYawVelocity *= ATOM_INERTIA_DAMPING;
}*/
function updateAtomCameraInertia() {
  if (!isAtomViewActive() || focusTween || pointerDown?.dragged) return;

  const yawMoving = Math.abs(atomYawVelocity) >= ATOM_INERTIA_STOP;
  const thetaMoving = Math.abs(atomThetaVelocity) >= ATOM_INERTIA_STOP;

  if (!yawMoving && !thetaMoving) {
    atomYawVelocity = 0;
    atomThetaVelocity = 0;
    return;
  }

  rotateAtomCamera(atomYawVelocity, atomThetaVelocity);

  atomYawVelocity *= ATOM_INERTIA_DAMPING;
  atomThetaVelocity *= ATOM_INERTIA_DAMPING;
}

function updateFullViewCameraInertia() {
  if (isAtomViewActive() || focusTween || pointerDown?.dragged) return;
  const pitchMoving = viewTiltVelocity.lengthSq() >= FULL_VIEW_INERTIA_STOP * FULL_VIEW_INERTIA_STOP;
  const yawMoving = Math.abs(tableYawVelocity) >= FULL_VIEW_YAW_STOP;
  if (!pitchMoving && !yawMoving) {
    viewTiltVelocity.set(0, 0);
    tableYawVelocity = 0;
    return;
  }
  tableYaw += tableYawVelocity;
  viewTilt.y += viewTiltVelocity.y;
  applyViewFromTilt();
  tableYawVelocity *= FULL_VIEW_INERTIA_DAMPING;
  viewTiltVelocity.multiplyScalar(FULL_VIEW_INERTIA_DAMPING);
}

function smoothstep(edge0, edge1, x) {
  const t = THREE.MathUtils.clamp(
    (x - edge0) / (edge1 - edge0),
    0,
    1
  );

  return t * t * (3 - 2 * t);
}

function updateOrbitTiltByAtomTheta() {
  if (!isAtomViewActive()) return;

  const { theta } = getAtomCameraSpherical();

  const thetaRatio = THREE.MathUtils.clamp(
    theta / ATOM_THETA_MAX,
    0,
    1
  );

  const northBlend = 1 - smoothstep(0, 1, thetaRatio);

  for (const orbit of orbitGroups) {
    const baseX = orbit.userData.baseX ?? orbit.rotation.x;
    const baseY = orbit.userData.baseY ?? orbit.rotation.y;

    orbit.rotation.x = THREE.MathUtils.lerp(
      baseX,
      Math.PI / 2,
      northBlend
    );

    orbit.rotation.y = THREE.MathUtils.lerp(
      baseY,
      0,
      northBlend
    );
  }
}

/*function animateAtom() {
  if (!atomGroup) return;
  atomGroup.rotation.y += 0.0025;
  atomGroup.traverse(obj => {
    if (obj.userData?.isOrbitGroup) obj.rotation.z += obj.userData.speed;
    if (obj.userData?.isElectron) {
      obj.userData.theta += obj.userData.speed;
      const { radius, theta } = obj.userData;
      obj.position.set(Math.cos(theta) * radius, Math.sin(theta) * radius, 0);
    }
  });
}*/
function animateAtom() {
  if (!atomGroup) return;

  atomGroup.rotation.y += 0.0025;

  updateOrbitTiltByAtomTheta();

  for (const orbit of orbitGroups) {
    orbit.rotation.z += orbit.userData.speed;
  }

  for (const electron of electronMeshes) {
    const u = electron.userData;
    u.theta += u.speed;

    electron.position.set(
      Math.cos(u.theta) * u.radius,
      Math.sin(u.theta) * u.radius,
      0
    );
  }
}

function getIntersect(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  return raycaster.intersectObjects(rayTargets, false)[0] ?? null;
}

function panCameraByScreenDelta(dx, dy) {
  const rect = renderer.domElement.getBoundingClientRect();
  const worldUnitsPerPixel = (frustum / camera.zoom) / Math.max(1, rect.height);

  const right = new THREE.Vector3()
    .setFromMatrixColumn(camera.matrixWorld, 0)
    .normalize();

  const up = new THREE.Vector3()
    .copy(camera.up)
    .normalize();

  const pan = new THREE.Vector3()
    .addScaledVector(right, -dx * worldUnitsPerPixel)
    .addScaledVector(up, dy * worldUnitsPerPixel);

  camera.position.add(pan);
  controlsTarget.add(pan);
  camera.lookAt(controlsTarget);
  camera.updateProjectionMatrix();
}

function zoomCameraByRatio(ratio) {
  if (!Number.isFinite(ratio) || ratio <= 0) return;

  camera.zoom = THREE.MathUtils.clamp(
    camera.zoom * ratio,
    0.55,
    5.0
  );

  camera.updateProjectionMatrix();
}

function getTwoPointerGestureState() {
  const points = [...activePointers.values()];
  if (points.length < 2) return null;

  const a = points[0];
  const b = points[1];

  const center = {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2
  };

  const distance = Math.max(
    1,
    Math.hypot(a.x - b.x, a.y - b.y)
  );

  return { center, distance };
}

function beginTwoPointerGesture() {
  const state = getTwoPointerGestureState();

  touchGesture = state
    ? {
        prevCenter: state.center,
        prevDistance: state.distance
      }
    : null;
}

function updateTwoPointerGesture() {
  const state = getTwoPointerGestureState();
  if (!state) return;

  if (!touchGesture) {
    beginTwoPointerGesture();
    return;
  }

  stopInteractionTween();

  atomYawVelocity = 0;
  atomThetaVelocity = 0;
  viewTiltVelocity.set(0, 0);
  tableYawVelocity = 0;

  const dx = state.center.x - touchGesture.prevCenter.x;
  const dy = state.center.y - touchGesture.prevCenter.y;

  panCameraByScreenDelta(dx, dy);
  zoomCameraByRatio(state.distance / touchGesture.prevDistance);

  touchGesture.prevCenter = state.center;
  touchGesture.prevDistance = state.distance;
}

function stopInteractionTween() {
  if (focusTween?.mode !== "reset") focusTween = null;
}

function finishPointer(event) {
 /* const wasMultiTouch = multiTouchInProgress || activePointers.size > 1;
  activePointers.delete(event.pointerId);
  if (activePointers.size === 0) multiTouchInProgress = false;*/

    const wasMultiTouch = multiTouchInProgress || activePointers.size > 1;

  activePointers.delete(event.pointerId);

  if (activePointers.size < 2) {
    touchGesture = null;
  }

  if (activePointers.size === 0) {
    multiTouchInProgress = false;
  }
  
  if (!pointerDown || pointerDown.id !== event.pointerId || wasMultiTouch) {
    pointerDown = null;
    return;
  }
  const dx = event.clientX - pointerDown.x;
  const dy = event.clientY - pointerDown.y;
  const dist = Math.hypot(dx, dy);
  const elapsed = performance.now() - pointerDown.time;
  const tapLimit = pointerDown.pointerType === "touch" ? 14 : 7;
  const timeLimit = pointerDown.pointerType === "touch" ? 750 : 600;
  const wasDragged = !!pointerDown.dragged;
  pointerDown = null;
  if (wasDragged || dist > tapLimit || elapsed > timeLimit) return;
  const hit = getIntersect(event);
  if (hit?.object?.visible && hit.object.userData?.element) focusElement(hit.object.userData.element);
}

function normalizedWheelDelta(event) {
  const modeScale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 120 : 1;
  return {
    x: THREE.MathUtils.clamp(event.deltaX * modeScale, -180, 180),
    y: THREE.MathUtils.clamp(event.deltaY * modeScale, -180, 180)
  };
}

function handleWheel(event) {
  event.preventDefault();
  event.stopPropagation();
  if (focusTween?.mode === "reset") return;
  focusTween = null;

  const { x, y } = normalizedWheelDelta(event);
  const dominantHorizontal = Math.abs(x) > Math.abs(y) * 0.72;

  if (dominantHorizontal) {
    if (isAtomViewActive()) {
      const deltaYaw = -x * ATOM_DRAG_YAW_SPEED * 0.38;
      rotateAtomCamera(deltaYaw);
      atomYawVelocity = THREE.MathUtils.clamp(deltaYaw * 0.9, -0.085, 0.085);
      return;
    }

    const deltaYaw = -x * FULL_VIEW_YAW_SPEED * 0.32;
    tableYaw += deltaYaw;
    applyViewFromTilt();
    tableYawVelocity = THREE.MathUtils.clamp(deltaYaw * 0.82, -0.08, 0.08);
    viewTiltVelocity.set(0, 0);
    return;
  }

  const zoomFactor = Math.exp(y * 0.0018);
  camera.zoom = THREE.MathUtils.clamp(camera.zoom * zoomFactor, 0.55, 5.0);
  camera.updateProjectionMatrix();
}

function resetInfoPanel() {
  info.style.removeProperty("--accent");
  hideAtomInfoControls();
}

function startSmoothReset() {
  clearAtom();
  selectedElement = null;
  viewTiltVelocity.set(0, 0);
  tableYawVelocity = 0;
  atomYawVelocity = 0;
  atomThetaVelocity = 0;
  backToTableButton.classList.remove("visible");
  setAtomNavVisible(false);
  pointerDown = null;
  activePointers.clear();
  multiTouchInProgress = false;
  restoreTileBrightness();
  resetInfoPanel();
  focusTween = {
    t: 0,
    speed: 0.026,
    mode: "reset",
    startPos: camera.position.clone(),
    startTarget: controlsTarget.clone(),
    endPos: new THREE.Vector3(0, DEFAULT_CAMERA_DISTANCE, 0),
    endTarget: new THREE.Vector3(0, 0, 0),
    endZoom: 1,
    startZoom: camera.zoom,
    upStart: camera.up.clone(),
    upEnd: new THREE.Vector3(0, 0, -1)
  };
}

function updateFocusTween() {
  if (!focusTween) return;
  focusTween.t += focusTween.speed ?? 0.035;
  const t = Math.min(1, focusTween.t);
  const ease = 1 - Math.pow(1 - t, 3);
  camera.position.lerpVectors(focusTween.startPos, focusTween.endPos, ease);
  controlsTarget.lerpVectors(focusTween.startTarget, focusTween.endTarget, ease);
  camera.zoom = THREE.MathUtils.lerp(focusTween.startZoom, focusTween.endZoom, ease);
  if (focusTween.upStart && focusTween.upEnd) camera.up.copy(focusTween.upStart).lerp(focusTween.upEnd, ease).normalize();
  else camera.up.set(0, 0, -1);
  camera.lookAt(controlsTarget);
  camera.updateProjectionMatrix();
  if (t >= 1) {
    const finishedMode = focusTween.mode;
    focusTween = null;
    if (finishedMode === "reset") {
      atomYawVelocity = 0;
      viewTiltVelocity.set(0, 0);
      tableYawVelocity = 0;
      tableYaw = 0;
      clearAtom();
      controlsTarget.set(0, 0, 0);
      viewTilt.set(0, 0);
      camera.position.set(0, DEFAULT_CAMERA_DISTANCE, 0);
      camera.zoom = 1;
      camera.up.set(0, 0, -1);
      camera.lookAt(controlsTarget);
      camera.updateProjectionMatrix();
    } else {
      syncViewTiltFromCamera();
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  updateTileHeights();
  updateFocusTween();
  updateFullViewCameraInertia();
  updateAtomCameraInertia();
  animateAtom();
  renderer.render(scene, camera);
}

function runSelfTests() {
  console.assert(WORLD_UP instanceof THREE.Vector3, "WORLD_UP initialized");
  console.assert(elements.length === 118, "118 elements loaded");
  console.assert(new Set(elements.map(e => e.Z)).size === 118, "unique atomic numbers");
  console.assert(elementsByZ[0].Z === 1 && elementsByZ.at(-1).Z === 118, "atomic range valid");
  console.assert(shellDistribution(1).join(",") === "1", "hydrogen shell distribution");
  console.assert(shellDistribution(10).join(",") === "2,8", "neon shell distribution");
  console.assert(shuffledNucleonKinds(6, 6).filter(v => v === "proton").length === 6, "proton count preserved");
  console.assert(shuffledNucleonKinds(6, 6).filter(v => v === "neutron").length === 6, "neutron count preserved");
  console.assert(ABSOLUTE_NUCLEON_SCALE_MAX === 294, "absolute nucleon scale uses Og mass number");
  console.assert(heightFor(elementsByZ.at(-1), "massNumber") === BASE_H + MAX_H, "Og mass number reaches maximum height");
}

info.addEventListener("click", event => {
  const button = event.target.closest(".info-minimize");
  if (!button) return;

  event.stopPropagation();
  setInfoPanelMinimized(!infoPanelMinimized);
});

metricButtons.forEach(btn => btn.addEventListener("click", () => changeMetric(btn.dataset.metric)));
hudToggleButton.addEventListener("click", () => setHudCollapsed(!hud.classList.contains("collapsed")));
prevElementButton.addEventListener("click", () => focusAdjacentElement(-1));
nextElementButton.addEventListener("click", () => focusAdjacentElement(1));
backToTableButton.addEventListener("click", () => startSmoothReset());
window.addEventListener("keydown", event => {
  if (event.key.toLowerCase() === "r") startSmoothReset();
});

renderer.domElement.addEventListener("contextmenu", event => {
  event.preventDefault();
});

/*renderer.domElement.addEventListener("pointerdown", event => {
  activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  multiTouchInProgress = activePointers.size > 1;
  if (activePointers.size === 1) {
    if (isAtomViewActive()) atomYawVelocity = 0;
    else {
      viewTiltVelocity.set(0, 0);
      tableYawVelocity = 0;
    }
    pointerDown = { id: event.pointerId, x: event.clientX, y: event.clientY, time: performance.now(), pointerType: event.pointerType };
  } else {
    pointerDown = null;
  }
}, { passive: true });*/

renderer.domElement.addEventListener("pointerdown", event => {
  activePointers.set(event.pointerId, {
    x: event.clientX,
    y: event.clientY
  });

  if (event.pointerType === "touch" && activePointers.size === 2) {
    multiTouchInProgress = true;
    pointerDown = null;
    beginTwoPointerGesture();
    return;
  }

  multiTouchInProgress = activePointers.size > 1;

  if (activePointers.size === 1) {
    if (isAtomViewActive()) atomYawVelocity = 0;
    else {
      viewTiltVelocity.set(0, 0);
      tableYawVelocity = 0;
    }

    const isRightMouse = event.pointerType === "mouse" && event.button === 2;

    pointerDown = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
      pointerType: event.pointerType,
      button: event.button ?? 0,
      mode: isRightMouse ? "pan" : "orbit"
    };
  } else {
    pointerDown = null;
  }
}, { passive: true });

/*renderer.domElement.addEventListener("pointermove", event => {
  if (activePointers.has(event.pointerId)) activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (!pointerDown || pointerDown.id !== event.pointerId || activePointers.size !== 1 || multiTouchInProgress) return;
  const dxTotal = event.clientX - pointerDown.x;
  const dyTotal = event.clientY - pointerDown.y;
  if (Math.hypot(dxTotal, dyTotal) <= 2) return;
  const dx = event.clientX - (pointerDown.lastX ?? pointerDown.x);
  const dy = event.clientY - (pointerDown.lastY ?? pointerDown.y);
  const now = performance.now();
  const dt = Math.max(12, now - (pointerDown.lastTime ?? pointerDown.time));
  pointerDown.lastX = event.clientX;
  pointerDown.lastY = event.clientY;
  pointerDown.lastTime = now;
  pointerDown.dragged = true;
  stopInteractionTween();
  const speedBoost = THREE.MathUtils.clamp(16 / dt, 0.45, 1.9);
  if (isAtomViewActive()) {
    const deltaYaw = -dx * ATOM_DRAG_YAW_SPEED;
    rotateAtomCamera(deltaYaw);
    atomYawVelocity = THREE.MathUtils.clamp(deltaYaw * speedBoost, -0.13, 0.13);
    return;
  }
  const deltaYaw = -dx * FULL_VIEW_YAW_SPEED;
  const deltaPitch = -dy * DRAG_TILT_SPEED;
  tableYaw += deltaYaw;
  viewTilt.y += deltaPitch;
  applyViewFromTilt();
  tableYawVelocity = THREE.MathUtils.clamp(deltaYaw * speedBoost, -0.12, 0.12);
  viewTiltVelocity.set(0, THREE.MathUtils.clamp(deltaPitch * speedBoost, -0.12, 0.12));
}, { passive: true });*/

renderer.domElement.addEventListener("pointermove", event => {
  if (activePointers.has(event.pointerId)) {
    activePointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY
    });
  }

  if (event.pointerType === "touch" && activePointers.size >= 2) {
    multiTouchInProgress = true;
    updateTwoPointerGesture();
    return;
  }

  if (
    !pointerDown ||
    pointerDown.id !== event.pointerId ||
    activePointers.size !== 1 ||
    multiTouchInProgress
  ) {
    return;
  }

  const dxTotal = event.clientX - pointerDown.x;
  const dyTotal = event.clientY - pointerDown.y;

  if (Math.hypot(dxTotal, dyTotal) <= 2) return;

  const dx = event.clientX - (pointerDown.lastX ?? pointerDown.x);
  const dy = event.clientY - (pointerDown.lastY ?? pointerDown.y);

  const now = performance.now();
  const dt = Math.max(12, now - (pointerDown.lastTime ?? pointerDown.time));

  pointerDown.lastX = event.clientX;
  pointerDown.lastY = event.clientY;
  pointerDown.lastTime = now;
  pointerDown.dragged = true;

  stopInteractionTween();

  if (pointerDown.mode === "pan") {
    atomYawVelocity = 0;
    viewTiltVelocity.set(0, 0);
    tableYawVelocity = 0;
    panCameraByScreenDelta(dx, dy);
    return;
  }

  const speedBoost = THREE.MathUtils.clamp(16 / dt, 0.45, 1.9);

  if (isAtomViewActive()) {
    /*const deltaYaw = -dx * ATOM_DRAG_YAW_SPEED;
    rotateAtomCamera(deltaYaw);
    atomYawVelocity = THREE.MathUtils.clamp(deltaYaw * speedBoost, -0.13, 0.13);
    return;*/
    const deltaYaw = -dx * ATOM_DRAG_YAW_SPEED;
    const deltaTheta = -dy * ATOM_DRAG_THETA_SPEED;
  
    rotateAtomCamera(deltaYaw, deltaTheta);
  
    atomYawVelocity = THREE.MathUtils.clamp(
      deltaYaw * speedBoost,
      -0.13,
      0.13
    );
  
    atomThetaVelocity = THREE.MathUtils.clamp(
      deltaTheta * speedBoost,
      -0.11,
      0.11
    );
  
    return;
  }

  const deltaYaw = -dx * FULL_VIEW_YAW_SPEED;
  const deltaPitch = -dy * DRAG_TILT_SPEED;

  tableYaw += deltaYaw;
  viewTilt.y += deltaPitch;
  applyViewFromTilt();

  tableYawVelocity = THREE.MathUtils.clamp(deltaYaw * speedBoost, -0.12, 0.12);
  viewTiltVelocity.set(0, THREE.MathUtils.clamp(deltaPitch * speedBoost, -0.12, 0.12));
}, { passive: true });

renderer.domElement.addEventListener("pointerup", finishPointer, { passive: true });
/*renderer.domElement.addEventListener("pointercancel", event => {
  activePointers.delete(event.pointerId);
  pointerDown = null;
  if (activePointers.size === 0) multiTouchInProgress = false;
}, { passive: true });*/

renderer.domElement.addEventListener("pointercancel", event => {
  activePointers.delete(event.pointerId);
  pointerDown = null;

  if (activePointers.size < 2) {
    touchGesture = null;
  }

  if (activePointers.size === 0) {
    multiTouchInProgress = false;
  }
}, { passive: true });

renderer.domElement.addEventListener("wheel", handleWheel, { passive: false });

window.addEventListener("gesturestart", event => event.preventDefault(), { passive: false });
window.addEventListener("gesturechange", event => event.preventDefault(), { passive: false });
window.addEventListener("gestureend", event => event.preventDefault(), { passive: false });
window.addEventListener("resize", () => {
  const aspect = window.innerWidth / window.innerHeight;
  camera.left = -frustum * aspect / 2;
  camera.right = frustum * aspect / 2;
  camera.top = frustum / 2;
  camera.bottom = -frustum / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

applyViewFromTilt(DEFAULT_CAMERA_DISTANCE);
createLightsAndFloor();
createTiles();
createSeriesPlaceholder("lanthanide", 6, 1);
createSeriesPlaceholder("actinide", 7, 2);
createCategoryLegendOnTable();
createSeriesGuide("란타넘족", 8, palette.lanthanide);
createSeriesGuide("악티늄족", 9, palette.actinide);
runSelfTests();
animate();
