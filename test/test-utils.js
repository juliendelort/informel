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
