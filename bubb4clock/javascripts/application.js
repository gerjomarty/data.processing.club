import * as audioModule from "./audio.js"
import * as settingsModule from "./settings.js"
import * as clocksModule from "./clocks.js"

import * as confettiModule from "./confetti.js";

function renderConfetti() {
  const confettiCanvas = document.getElementById("confetti");
  const confettiSettings = { target: confettiCanvas };

  const c = new confettiModule.ConfettiGenerator(confettiSettings);
  c.render();

  confettiCanvas.style.display = "block";
}

function resetConfetti() {
  const confettiCanvas = document.getElementById("confetti");
  const confettiSettings = { target: confettiCanvas };

  const c = new confettiModule.ConfettiGenerator(confettiSettings);
  c.clear();

  confettiCanvas.style.display = "none";
}

function toggleConfetti() {
  const confettiCanvas = document.getElementById("confetti");

  if (confettiCanvas.dataset.on == "true") {
    confettiCanvas.dataset.on = "false";
    resetConfetti();
  } else {
    confettiCanvas.dataset.on = "true";
    renderConfetti();
  }
}

renderConfetti();

const toggleConfettiLink = document.getElementById("toggle-confetti");
toggleConfettiLink.addEventListener("click", (e) => {
  e.preventDefault();

  toggleConfetti();
});

const audioSelect = document.getElementById("audio-select");
const audioCanvas = document.getElementById("audio");

audioModule.enableAudio(audioSelect, audioCanvas);

const openSettingsLink = document.getElementById("open-settings");
const closeSettingsLink = document.getElementById("close-settings");

const leftTimeZoneSelect = document.getElementById("time-zone-left-select");
const leftDefaultTimeZone = "America/New_York";

const rightTimeZoneSelect = document.getElementById("time-zone-right-select");
const rightDefaultTimeZone = "Asia/Tokyo";

settingsModule.enableSettings(
  openSettingsLink,
  closeSettingsLink,
  leftTimeZoneSelect,
  leftDefaultTimeZone,
  rightTimeZoneSelect,
  rightDefaultTimeZone
)
.then(() => clocksModule.tick());