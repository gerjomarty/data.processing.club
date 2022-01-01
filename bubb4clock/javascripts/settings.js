export { enableSettings };

function populateTimeZones(timeZones, timeZoneSelect, defaultTimeZone) {
  timeZoneSelect.options.length = 0;

  timeZones.forEach(zone => {
    timeZoneSelect.appendChild(new Option(zone, zone, zone === defaultTimeZone, zone === defaultTimeZone));
  });
}

async function enableSettings(
  openSettingsLink,
  closeSettingsLink,
  leftTimeZoneSelect,
  leftDefaultTimeZone,
  rightTimeZoneSelect,
  rightDefaultTimeZone
) {
  openSettingsLink.addEventListener("click", (e) => {
    e.preventDefault();

    Array.from(document.getElementsByClassName("settings-open")).forEach(element => element.style.display = "block");
    Array.from(document.getElementsByClassName("settings-closed")).forEach(element => element.style.display = "none");
  });

  closeSettingsLink.addEventListener("click", (e) => {
    e.preventDefault();

    Array.from(document.getElementsByClassName("settings-open")).forEach(element => element.style.removeProperty("display"));
    Array.from(document.getElementsByClassName("settings-closed")).forEach(element => element.style.removeProperty("display"));
  });

  return await fetch("javascripts/tz.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Response code ${response.status}`);
      }

      return response.json();
    })
    .then(timeZones => {
      populateTimeZones(timeZones, leftTimeZoneSelect, leftDefaultTimeZone);
      populateTimeZones(timeZones, rightTimeZoneSelect, rightDefaultTimeZone);
    })
    .catch(error => {
      console.warn(`Error when fetching time zone list, using defaults. Error was: ${error}`);

      populateTimeZones([leftDefaultTimeZone], leftTimeZoneSelect, leftDefaultTimeZone);
      populateTimeZones([rightDefaultTimeZone], rightTimeZoneSelect, rightDefaultTimeZone);
    });
}
