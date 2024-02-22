const submit_button_insulin = document.getElementById('submitInsulin'); 
const submit_button_ratios = document.getElementById('submitRatios');
const insulinRequiredText = document.getElementById('insulinRequired');

const desiredLevel = 7;

const carbRatios = {
    dawn: 10,
    sunrise: 10,
    midday: 12,
    sunset: 8,
    night: 10
}

const insulinRatios = {
    dawn: 4,
    sunrise: 4,
    midday: 4,
    sunset: 3,
    night: 3
}

var currentTime = new Date()
var hours = currentTime.getHours()
var minutes = currentTime.getMinutes() + (hours * 60)

submit_button_insulin.addEventListener('click', function() {
    var glucoseLevel = document.getElementById('glucoseLevel').value;
    var cabohydrateIntake = document.getElementById('cabohydrateIntake').value;
    processData(glucoseLevel, cabohydrateIntake);
});

submit_button_ratios.addEventListener('click', function() {
    var ratios = {
        dawnCarbRatio: document.getElementById('dawnCarbRatio').value,
        dawnInsulinRatio: document.getElementById('dawnInsulinRatio').value,
        sunriseCarbRatio: document.getElementById('sunriseCarbRatio').value,
        sunriseInsulinRatio: document.getElementById('sunriseInsulinRatio').value,
        middayCarbRatio: document.getElementById('middayCarbRatio').value,
        middayInsulinRatio: document.getElementById('middayInsulinRatio').value,
        sunsetCarbRatio: document.getElementById('sunsetCarbRatio').value,
        sunsetInsulinRatio: document.getElementById('sunsetInsulinRatio').value,
        nightCarbRatio: document.getElementById('nightCarbRatio').value,
        nightInsulinRatio: document.getElementById('nightInsulinRatio').value
    }
    console.log(ratios);
    var myJSONratios = JSON.stringify(ratios);
    localStorage.setItem("myJSONratios", myJSONratios);
});

function processData(glucoseLevel, cabohydrateIntake){
    var myJSONratios = localStorage.getItem("myJSONratios");
    obj = JSON.parse(myJSONratios);

    carbRatios.dawn = obj.dawnCarbRatio;
    carbRatios.sunrise = obj.sunriseCarbRatio;
    carbRatios.midday = obj.middayCarbRatio;
    carbRatios.sunset = obj.sunsetCarbRatio;
    carbRatios.night = obj.nightCarbRatio;
    insulinRatios.dawn = obj.dawnInsulinRatio;
    insulinRatios.sunrise = obj.sunriseInsulinRatio;
    insulinRatios.midday = obj.middayInsulinRatio;
    insulinRatios.sunset = obj.sunsetInsulinRatio;
    insulinRatios.night = obj.nightInsulinRatio;

    var requiredDrop = glucoseLevel - desiredLevel;
    var insulinRequired
    if (minutes >= 0 && minutes < 330){ //00:00 - 05:30
        insulinRequired = (cabohydrateIntake / carbRatios.dawn) + (requiredDrop / insulinRatios.dawn)
    }else if (minutes >= 330 && minutes < 660){ //05:30 - 11:00
        insulinRequired = (cabohydrateIntake / carbRatios.sunrise) + (requiredDrop / insulinRatios.sunrise)
    }else if (minutes >= 660 && minutes < 1020){ //11:00 - 17:00
        insulinRequired = (cabohydrateIntake / carbRatios.midday) + (requiredDrop / insulinRatios.midday)
    }else if (minutes >= 1020 && minutes < 1290){ //17:00 - 21:30
        insulinRequired = (cabohydrateIntake / carbRatios.sunset) + (requiredDrop / insulinRatios.sunset)
    }else if (minutes >= 1290 && minutes <= 1439){ //21:30 - 23:59
        insulinRequired = (cabohydrateIntake / carbRatios.night) + (requiredDrop / insulinRatios.night)
    }
    insulinRequiredText.textContent = (Math.round(insulinRequired * 10)/10) + " units"
}