import { sendKeys, sendMouse } from '@web/test-runner-commands';

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

export function eventCheck(element, eventName) {
    let listenerHasBeenCalled = false;
    let eventDetail = null;

    element.addEventListener(eventName, ({ detail }) => {
        eventDetail = detail;
        listenerHasBeenCalled = true;
    });
    return [
        () => listenerHasBeenCalled,
        () => eventDetail,
        () => { // reset
            eventDetail = null;
            listenerHasBeenCalled = false;
        }];
}


function getMiddleOfElement(element) {
    const { x, y, width, height } = element.getBoundingClientRect();

    return {
        x: Math.floor(x + window.pageXOffset + width / 2),
        y: Math.floor(y + window.pageYOffset + height / 2),
    };
}

export const setSelectMultipleValue = async (select, val) => {
    for (let o of select.querySelectorAll('option')) {
        const isInValue = val.includes(o.value);

        if (o.selected !== isInValue) {
            await selectMultipleToggleValue(o);
        }
    }
};

const selectMultipleToggleValue = async (option) => {
    const { x, y } = getMiddleOfElement(option);

    await sendKeys({
        down: 'Control'
    });
    await sendMouse({ type: 'click', position: [x, y] });
    await sendKeys({
        up: 'Control'
    });
};

export const generateMultiSelectValue = (currentValue) => JSON.stringify(currentValue) === JSON.stringify(["val1", "val2"]) ? ["val2", "val3"] : ["val1", "val2"];
