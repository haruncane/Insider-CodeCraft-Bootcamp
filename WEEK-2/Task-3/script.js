const timeDisplay = document.getElementById("timeDisplay");

const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");


const updateTimeDisplay = (hours = "00", minutes = "00", seconds = "00") => {
    const hoursData = hours > 23 ? "23" : (hours + "").padStart(2, "0") || "00";
    const minutesData = minutes > 59 ? "59" : (minutes + "").padStart(2, "0") || "00";
    const secondsData = seconds > 59 ? "59" : (seconds + "").padStart(2, "0") || "00";

    timeDisplay.textContent = `${hoursData}:${minutesData}:${secondsData}`;
}

hoursInput.addEventListener("input", () => updateTimeDisplay(hoursInput.value, minutesInput.value, secondsInput.value));
minutesInput.addEventListener("input", () => updateTimeDisplay(hoursInput.value, minutesInput.value, secondsInput.value));
secondsInput.addEventListener("input", () => updateTimeDisplay(hoursInput.value, minutesInput.value, secondsInput.value));

let time;

startButton.addEventListener("click", () => {
    time = timeDisplay.textContent.split(":").reduce((acc, num, index) => {
        const value = Number(num);

        if (index === 0) {
            acc += value * 60 * 60;
        } else if (index === 1) {
            acc += value * 60;
        } else {
            acc += value;
        }

        return acc;
    }, 0);

    const interval = setInterval(() => {
        if (time > 0) {
            time--;

            const hours = Math.floor(time / 3600)
            const minutes = Math.floor((time % 3600) / 60);
            const seconds = time % 60;
            
            updateTimeDisplay(hours, minutes, seconds);
            
        } else if (time === 0) {
            clearInterval(interval);
            alert("Time is up!");

        } else {
            clearInterval(interval);
        }
    }, 1000);
});

resetButton.addEventListener("click", () => {
    time = undefined;

    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";

    updateTimeDisplay("", "", "");
});