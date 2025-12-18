/* =========================
   CONFIG
========================= */

const ENERGY_KEY = "sharedEnergy";

/* =========================
   HELPERS
========================= */

const $ = (id) => document.getElementById(id);
const $$ = (selector) => document.querySelectorAll(selector);

function saveEnergyLog(value) {
  const logs = JSON.parse(localStorage.getItem("energyLogs")) || [];
  const now = new Date();

  logs.unshift({
    type: "energy",
    timestamp: now.getTime(),
    date: now.toISOString().split("T")[0],
    time: now.toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit"
    }),
    value
  });

  localStorage.setItem("energyLogs", JSON.stringify(logs));
}



function getEnergy() {
  return Number(localStorage.getItem(ENERGY_KEY)) || 50;
}

function setEnergy(value) {
  localStorage.setItem(ENERGY_KEY, value);
}

/* =========================
   VIEWPORT FIX (mobile)
========================= */

function setVH() {
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );
}

setVH();
window.addEventListener("resize", setVH);

/* =========================
   SLIDERS
========================= */

const energySlider = $("energySlider");
const activitySlider = $("activityenergySlider");
const finishSlider = $("finishEnergy");
const readonlySlider = $("readonlySlider-slider");


const percentageLabel = $("percentageLabel");
const activityPercentageLabel = $("activitypercentageLabel");
const finishPercentageLabel = $("finishpercentageLabel");

const energyText = $("energyText");
const activityEnergyText = $("activityenergyText");
const finishEnergyText = $("finishenergyText");

const ACTIVITY_DURATIONS = {
  "Diska": 0.1,
  "Studera": 30,
  "Dammsug": 15,
  "Städa Sovrummet": 15
};


const sliders = [
  energySlider,
  activitySlider,
  finishSlider,
  readonlySlider
].filter(Boolean);


/* ---- Labels ---- */

function energyLabel(value) {
  if (value < 1) return "Helt utmattad";
  if (value < 10) return "Extremt Trött";
  if (value < 20) return "Väldigt Trött";
  if (value < 30) return "Ganska Trött";
  if (value < 40) return "Lite Trött";
  if (value < 50) return "Börjar Bli Trött";
  if (value < 75) return "Har Energi";
  if (value < 100) return "Mycket Energi";
  return "Helt Pigg";
}

/* ---- UI Sync ---- */

function updateTexts(value) {
  if (energyText) energyText.textContent = energyLabel(value);
  if (activityEnergyText) activityEnergyText.textContent = energyLabel(value);
  if (finishEnergyText) finishEnergyText.textContent = energyLabel(value);

  if (percentageLabel) percentageLabel.textContent = value + "%";
  if (activityPercentageLabel)
    activityPercentageLabel.textContent = value + "%";
  if (finishPercentageLabel)
    finishPercentageLabel.textContent = value + "%";
}


function updateSliderFill(slider, value) {
  const percent =
    ((value - slider.min) / (slider.max - slider.min)) * 100;

  slider.style.background = `
    linear-gradient(
      to right,
      rgb(187, 169, 233) 0%,
      rgb(187, 169, 233) ${percent}%,
      #d3d3d3 ${percent}%,
      #d3d3d3 100%
    )
  `;
}

function syncEnergyUI(value) {
  sliders.forEach((slider) => {
    slider.value = value;
    updateSliderFill(slider, value);
  });

  updateTexts(value);
}

/* ---- Attach Editable Sliders ---- */

function attachSlider(slider) {
  if (!slider || slider.disabled) return;

  slider.addEventListener("input", (e) => {
    const value = e.target.value;
    setEnergy(value);
    syncEnergyUI(value);
  });
}

attachSlider(energySlider);
attachSlider(activitySlider);
attachSlider(finishSlider);


/* ---- Init ---- */

document.addEventListener("DOMContentLoaded", () => {
  syncEnergyUI(getEnergy());
});

/* =========================
   MODALS
========================= */

const nrgModal = $("energyLogModal");
const nrgBtn = $("energyLogButton");
const nrgClose = $$(".energyLogCloseButton")[0];
const nrgAccept = $$(".energyLogAcceptButton")[0];

const activityModal = $("activityModal");
const activityBtn = $("button2");
const activityClose = $("activityBtnClose");

if (nrgBtn) nrgBtn.onclick = () => (nrgModal.style.display = "block");
if (nrgClose) nrgClose.onclick = () => (nrgModal.style.display = "none");
if (nrgAccept) {
  nrgAccept.onclick = () => {
    const value = getEnergy();
    saveEnergyLog(value);
    nrgModal.style.display = "none";
  };
}


if (activityBtn)
  activityBtn.onclick = () => (activityModal.style.display = "block");
if (activityClose)
  activityClose.onclick = () => (activityModal.style.display = "none");

/* =========================
   ACTIVITY SELECTION
========================= */

let selectedActivity = null;
const startBtn = $("activityStartBtn");

if (startBtn) startBtn.disabled = true;

$$(".activityBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".activityBtn").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");

    selectedActivity = btn.dataset.activity;
    if (startBtn) startBtn.disabled = false;
  });
});

let activityMode = "stopwatch";

const modeStopwatchBtn = $("modeStopwatch");
const modeTimerBtn = $("modeTimer");

if (modeStopwatchBtn && modeTimerBtn) {
  modeStopwatchBtn.onclick = () => {
    activityMode = "stopwatch";
    modeStopwatchBtn.classList.add("selected");
    modeTimerBtn.classList.remove("selected");
  };

  modeTimerBtn.onclick = () => {
    activityMode = "timer";
    modeTimerBtn.classList.add("selected");
    modeStopwatchBtn.classList.remove("selected");
  };
}

/* =========================
   START ACTIVITY
========================= */

if (startBtn) {
  startBtn.onclick = () => {
    if (!selectedActivity) {
      alert("Välj en aktivitet");
      return;
    }

    const now = new Date();

    localStorage.setItem(
      "currentActivity",
      JSON.stringify({
        startTime: Date.now(),
        startDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        activity: selectedActivity,
				energyBefore: getEnergy(),
				mode: activityMode,
				durationMinutes:
					activityMode === "timer"
						? ACTIVITY_DURATIONS[selectedActivity]
						: null
      })
    );

    window.location.href = "aktivitet.html";
  };
}
