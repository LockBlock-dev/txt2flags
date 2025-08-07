import flagsData from "./flags.js";

const options = new Map([["offset", 0]]);
const stats = new Map([["count", 0]]);
const flags = new Map(flagsData);

const textTextArea = document.getElementById("text");
const resultTextArea = document.getElementById("result");

const processText = () => {
    const text = textTextArea.value.toLowerCase();
    const offset = options.get("offset");

    stats.set("count", 0);

    if (text.length < 2) {
        resultTextArea.value = text;
        updateStats();
        return;
    }

    let result = "";
    let count = 0;

    if (offset !== 0) result += text.substring(0, offset);

    for (let i = offset; i < text.length; i += 2) {
        const twoChar = text.substring(i, i + 2);

        if (flags.has(twoChar)) {
            result += flags.get(twoChar);
            count++;
        } else {
            result += twoChar;
        }
    }

    stats.set("count", count);

    resultTextArea.value = result;

    updateStats();
};

const initializeOptions = () => {
    options.forEach((value, key) => {
        const optionInput = document.getElementById(key);
        const optionValueDisplay = document.getElementById(`${key}_value`);

        if (!optionInput || !optionValueDisplay) {
            console.warn(`Option '${key}' element not found!`);
            return;
        }

        optionInput.value = value;
        optionValueDisplay.innerText = value;

        optionInput.addEventListener("input", ({ target: { value } }) => {
            const newValue = parseInt(value, 10);

            options.set(key, newValue);

            optionValueDisplay.innerText = newValue;

            processText();
        });
    });
};

const updateStats = () => {
    stats.forEach((value, key) => {
        const statValueDisplay = document.getElementById(`${key}_value`);

        if (statValueDisplay) statValueDisplay.innerText = value;
    });
};

const main = () => {
    initializeOptions();
    updateStats();

    textTextArea.addEventListener("input", processText);
};

main();
