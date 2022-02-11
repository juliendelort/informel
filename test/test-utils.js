import { sendKeys } from '@web/test-runner-commands';

export const type = async (input, text, blur) => {
    input.focus();
    await sendKeys({
        type: text,
    });
    if (blur) {
        await tab();
    }
};

export const clear = async (input) => {
    input.focus();
    // Ctrl+A then Delete
    await sendKeys({
        down: 'Control',
    });

    await sendKeys({
        press: 'A',
    });

    await sendKeys({
        up: 'Control',
    });

    await sendKeys({
        press: 'Delete',
    });
};

export const tab = () => sendKeys({
    press: 'Tab',
});

export const randomString = () => Math.random().toString(36).substr(2, 5);


export const setTextInputValue = async (input, val) => {
    await clear(input);
    if (val) {
        await type(input, val, true);
    }
};
export const generateTextInputValue = () => randomString();

export const setCheckboxValue = (checkbox, val) => {
    if (checkbox.checked !== val) {
        checkbox.click();
    }
};

export const generateCheckboxValue = (currentValue) => !currentValue;

export const setRadioValue = (parent, val) => {
    if (val === "") {
        // Just uncheck all the radio buttons
        parent.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
        // Send the input+change event on the first one to trigger dirtycheck
        parent.querySelector('input[type="radio"]').dispatchEvent(new Event('input', { bubbles: true }));
        parent.querySelector('input[type="radio"]').dispatchEvent(new Event('change', { bubbles: true }));

    } else {
        parent.querySelector(`[value="${val}"]`).click();

    }
};

export const generateRadioValue = (currentValue) => currentValue === "val1" ? "val2" : "val1";

export const setSelectValue = async (select, val) => {
    const option = select.querySelector(`option[value="${val}"]`);

    const valIndex = [...select.children].indexOf(option);
    const selectedIndex = select.selectedIndex;

    select.focus();
    if (valIndex > selectedIndex) {
        for (let i = select.selectedIndex; i < valIndex; i++) {
            await sendKeys({
                press: 'ArrowDown'
            });
        }
    } else {
        for (let i = valIndex; i < selectedIndex; i++) {
            await sendKeys({
                press: 'ArrowUp'
            });
        }
    }
};

export const generateSelectValue = (currentValue) => currentValue === "val1" ? "val2" : "val1";
