import * as audioModule from "./audio.js"
import * as settingsModule from "./settings.js"
import * as clocksModule from "./clocks.js"

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