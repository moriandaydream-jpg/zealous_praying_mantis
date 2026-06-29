const SITE_SETTINGS_KEY = "new-novel-helper-settings:v1";
const WORKSPACE_KEY = "new-novel-helper-workspace:v1";

const defaultSettings = {
  layoutMode: "desk",
  fontScale: "normal",
  showSidebar: true
};

const defaultWorkspace = {
  ideaNotes: "",
  characterNotes: "",
  worldNotes: "",
  quickMemo: "",
  checks: {}
};

const layoutModes = new Set(["desk", "board", "focus"]);
const fontScales = new Set(["normal", "large"]);

const prompts = {
  idea: [
    "누군가가 잃어버린 물건을 되찾는 순간, 그것이 자기 것이 아니었다는 사실을 알게 된다.",
    "평범한 장소 하나가 특정 시간에만 전혀 다른 규칙으로 움직인다.",
    "주인공은 거짓말을 하지 못하지만, 진실을 말할 때마다 누군가의 기억이 사라진다.",
    "오래된 약속을 지키기 위해 가장 소중한 관계를 의심해야 한다."
  ],
  plot: [
    "주인공이 목표를 이루면 어떤 관계가 무너지나요?",
    "중간 지점에서 독자가 믿고 있던 전제 하나를 어떻게 뒤집을 수 있나요?",
    "악역은 왜 자신이 옳다고 믿나요?",
    "마지막 장면에서 첫 장면의 어떤 이미지가 다른 의미로 돌아오나요?"
  ],
  plotGoal: [
    "주인공이 지금 당장 손에 넣어야 하는 것은 무엇이고, 왜 오늘이 아니면 늦나요?",
    "겉으로 말하는 목표와 속으로 숨기는 목표가 어떻게 다르나요?",
    "목표를 이루기 위해 주인공이 절대 하지 않겠다고 한 일을 해야 한다면 무엇인가요?",
    "주인공이 목표를 포기하려는 순간, 누가 다시 붙잡나요?"
  ],
  plotCost: [
    "목표를 얻는 대신 잃게 되는 관계, 기억, 장소, 명예 중 가장 아픈 것은 무엇인가요?",
    "대가를 먼저 알았다면 주인공은 그래도 같은 선택을 했을까요?",
    "주인공 대신 다른 인물이 대가를 치르게 된다면 둘의 관계는 어떻게 바뀌나요?",
    "승리한 뒤에도 되돌릴 수 없는 상처를 하나 남긴다면 무엇인가요?"
  ],
  plotTwist: [
    "도움을 주던 인물이 사실 문제를 키우고 있었다면 이유는 무엇인가요?",
    "금기라고 믿었던 규칙이 사실 누군가를 보호하기 위한 장치라면 누구를 지키나요?",
    "주인공이 찾던 답이 이미 첫 장면에 있었음을 어떤 사물로 드러낼 수 있나요?",
    "악역의 가장 잔인한 선택이 누군가에게는 유일한 자비였다면 어떤 장면이 되나요?"
  ],
  character: [
    "이 인물은 사랑받고 싶지만, 사랑받는 순간 통제권을 잃는다고 믿습니다.",
    "이 인물은 모두를 지키려 하지만, 정작 도움을 요청하는 법을 모릅니다.",
    "이 인물의 가장 큰 장점은 압박이 커질수록 가장 위험한 결점으로 변합니다.",
    "이 인물은 용서를 바라지만, 사과해야 할 대상에게 아직 진실을 말하지 않았습니다."
  ],
  world: [
    "이 세계에서는 이름을 아는 장소만 지도에 나타납니다.",
    "금기는 법보다 오래되었고, 어기는 사람보다 목격한 사람이 더 큰 대가를 치릅니다.",
    "기억은 기록할 수 있지만, 기록된 기억은 더 이상 원래 주인의 것이 아닙니다.",
    "도시의 오래된 문은 들어가는 사람의 목적을 시험합니다."
  ],
  scene: [
    "현재 장면에서 인물이 숨기는 것을 행동 하나로 드러내세요.",
    "장면의 끝에서 주인공의 선택지를 하나 줄이세요.",
    "대화 중 한 사람만 진짜 주제를 알고 있게 만드세요.",
    "장면 배경의 물건 하나가 다음 장면의 단서가 되게 하세요."
  ]
};

const dailyPrompts = [
  "지금 장면에서 인물이 절대 말하지 않으려는 한 문장을 정해보세요.",
  "주인공이 오늘 반드시 피하고 싶은 질문을 하나 적어보세요.",
  "장면의 첫 문장과 마지막 문장이 서로 반응하게 만들어보세요.",
  "독자가 아직 모르는 정보를 인물의 오해로 먼저 보여주세요."
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

let settings = loadJson(SITE_SETTINGS_KEY, defaultSettings);
let workspace = loadJson(WORKSPACE_KEY, defaultWorkspace);
const promptHistory = {};

function loadJson(key, fallback) {
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(key) || "{}") };
  } catch {
    return { ...fallback };
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function normalizeSettings() {
  if (!layoutModes.has(settings.layoutMode)) settings.layoutMode = defaultSettings.layoutMode;
  if (!fontScales.has(settings.fontScale)) settings.fontScale = defaultSettings.fontScale;
  settings.showSidebar = Boolean(settings.showSidebar);
}

function applySettings() {
  normalizeSettings();
  const site = $("#site");
  site.dataset.helperLayout = settings.layoutMode;
  site.dataset.fontScale = settings.fontScale;
  site.dataset.showSidebar = String(settings.showSidebar);
}

function renderAdminSettings() {
  normalizeSettings();
  $("#adminLayoutMode").value = settings.layoutMode;
  $("#adminFontScale").value = settings.fontScale;
  $("#adminShowSidebar").checked = settings.showSidebar;
  $("#adminSettingsState").textContent = "저장됨";
}

function openAdminMenu() {
  renderAdminSettings();
  $("#adminDrawer").classList.add("open");
  $("#adminDrawer").setAttribute("aria-hidden", "false");
  $("#adminMenuToggle").setAttribute("aria-expanded", "true");
}

function closeAdminMenu() {
  $("#adminDrawer").classList.remove("open");
  $("#adminDrawer").setAttribute("aria-hidden", "true");
  $("#adminMenuToggle").setAttribute("aria-expanded", "false");
}

function markDirty() {
  $("#adminSettingsState").textContent = "변경됨";
}

function saveAdminSettings() {
  settings = {
    layoutMode: $("#adminLayoutMode").value,
    fontScale: $("#adminFontScale").value,
    showSidebar: $("#adminShowSidebar").checked
  };
  normalizeSettings();
  saveJson(SITE_SETTINGS_KEY, settings);
  applySettings();
  $("#adminSettingsState").textContent = "저장됨";
}

function bindAdmin() {
  $("#adminMenuToggle").addEventListener("click", openAdminMenu);
  $("#closeAdminMenu").addEventListener("click", closeAdminMenu);
  $("#adminDrawer").addEventListener("click", (event) => {
    if (event.target.id === "adminDrawer") closeAdminMenu();
  });
  $("#adminLayoutMode").addEventListener("change", markDirty);
  $("#adminFontScale").addEventListener("change", markDirty);
  $("#adminShowSidebar").addEventListener("change", markDirty);
  $("#saveAdminSettings").addEventListener("click", saveAdminSettings);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAdminMenu();
  });
}

function bindWorkspace() {
  if (!$("#workspace")) return;

  $("#ideaNotes").value = workspace.ideaNotes || "";
  $("#characterNotes").value = workspace.characterNotes || "";
  $("#worldNotes").value = workspace.worldNotes || "";
  $("#quickMemo").value = workspace.quickMemo || "";

  $$("[data-check]").forEach((input) => {
    input.checked = Boolean(workspace.checks?.[input.dataset.check]);
    input.addEventListener("change", () => {
      workspace.checks = workspace.checks || {};
      workspace.checks[input.dataset.check] = input.checked;
      saveWorkspace("자동저장됨");
    });
  });

  ["ideaNotes", "characterNotes", "worldNotes", "quickMemo"].forEach((id) => {
    $(`#${id}`).addEventListener("input", (event) => {
      workspace[id] = event.target.value;
      saveWorkspace("자동저장됨");
    });
  });

  $$("[data-generate]").forEach((button) => {
    button.addEventListener("click", () => generatePrompt(button.dataset.generate));
  });

  $("#saveWorkspace").addEventListener("click", () => saveWorkspace("저장됨"));
  $("#dailyPrompt").textContent = dailyPrompts[new Date().getDate() % dailyPrompts.length];
}

function generatePrompt(type) {
  const list = prompts[type] || prompts.idea;
  const value = pickRandomPrompt(type, list);

  const targetMap = {
    idea: "ideaOutput",
    plot: "plotOutput",
    plotGoal: "plotOutput",
    plotCost: "plotOutput",
    plotTwist: "plotOutput",
    character: "characterOutput",
    world: "worldOutput",
    scene: "dailyPrompt"
  };
  const target = targetMap[type] || "ideaOutput";
  const output = $(`#${target}`);
  if (output) output.textContent = value;
}

function pickRandomPrompt(type, list) {
  if (!Array.isArray(list) || list.length === 0) return "";
  if (list.length === 1) return list[0];

  let index = Math.floor(Math.random() * list.length);
  if (promptHistory[type] === index) {
    index = (index + 1) % list.length;
  }
  promptHistory[type] = index;
  return list[index];
}

function saveWorkspace(message) {
  const saved = saveJson(WORKSPACE_KEY, workspace);
  const state = $("#workspaceState");
  if (state) state.textContent = saved ? message : "브라우저 저장 실패";
}

applySettings();
bindAdmin();
bindWorkspace();
