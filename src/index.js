import flags from "./flags.js";

const textTextArea = document.getElementById("text");
const flagsTextArea = document.getElementById("flags");

const handleOnTextInput = () => {
    let text = textTextArea.value.toLowerCase();
    const chars = text.match(/[\S]{1,2}/g) || [];

    chars.forEach((char) => {
        const flag = flags.find((flag) => flag[0] === char);

        console.log(char, flag);

        if (!flag) return;

        text = text.replace(char, flag[1]);
    });

    flagsTextArea.value = text;
};

textTextArea.addEventListener("input", () => handleOnTextInput());
