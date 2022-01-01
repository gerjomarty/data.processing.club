export { tick };

const tickInterval = 1000;

const leftHourHand = document.querySelector("#left-clock .hand-hour");
const leftMinuteHand = document.querySelector("#left-clock .hand-minute");
const leftSecondHand = document.querySelector("#left-clock .hand-second");

const rightHourHand = document.querySelector("#right-clock .hand-hour");
const rightMinuteHand = document.querySelector("#right-clock .hand-minute");
const rightSecondHand = document.querySelector("#right-clock .hand-second");

const leftTimeZoneSelect = document.getElementById("time-zone-left-select");
const rightTimeZoneSelect = document.getElementById("time-zone-right-select");

function getFormatter(timeZone) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: timeZone,
    hour12: false
  };

  try {
    return new Intl.DateTimeFormat("en-US", options);
  } catch (e) {
    if (e instanceof RangeError) {
      console.warn(`Could not find specified time zone '${timeZone}', defaulting to UTC.`);

      options.timeZone = "UTC";
      
      return new Intl.DateTimeFormat("en-US", options);
    } else {
      throw e;
    }
  }
}

function getTransforms(time, timeFormatter) {
  let hour;
  let minute;
  let second;

  timeFormatter.formatToParts(time).forEach(function(timePart) {
    switch (timePart.type) {
      case "hour":
        hour = parseInt(timePart.value, 10);
        break;
      case "minute":
        minute = parseInt(timePart.value, 10);
        break;
      case "second":
        second = parseInt(timePart.value, 10);
        break;
    }
  });

  const secondProgress = second / 60;
  const secondDegree = (secondProgress * 360) + 90;

  const minuteProgress = minute / 60;
  const minuteDegree = (minuteProgress * 360) + (secondProgress * 360 / 60) + 90;

  const hourProgress = (hour >= 12 ? hour - 12 : hour) / 12;
  const hourDegree = (hourProgress * 360) + (minuteProgress * 360 / 12) + (secondProgress * 360 / 720) + 90;

  return [`rotate(${hourDegree}deg)`, `rotate(${minuteDegree}deg)`, `rotate(${secondDegree}deg)`];
}

function renderClock(transforms, hourHand, minuteHand, secondHand) {
  const [hourTransform, minuteTransform, secondTransform] = transforms;

  hourHand.style.transform = hourTransform;
  minuteHand.style.transform = minuteTransform;
  secondHand.style.transform = secondTransform;
}

function tick() {
  const leftFormatter = getFormatter(leftTimeZoneSelect.options[leftTimeZoneSelect.selectedIndex].value);
  const rightFormatter = getFormatter(rightTimeZoneSelect.options[rightTimeZoneSelect.selectedIndex].value);

  const now = new Date();

  const leftTransforms = getTransforms(now, leftFormatter);
  const rightTransforms = getTransforms(now, rightFormatter);
  renderClock(leftTransforms, leftHourHand, leftMinuteHand, leftSecondHand);
  renderClock(rightTransforms, rightHourHand, rightMinuteHand, rightSecondHand);

  setTimeout(tick, tickInterval - (new Date().getTime() % tickInterval));
}
