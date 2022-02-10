export const type = (input, text, blur) => {
    input.value = text;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    if (blur) {
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }
};

export const setCb = (cb, checked) => {
    cb.checked = checked;
    cb.dispatchEvent(new Event('input', { bubbles: true }));
    if (blur) {
        cb.dispatchEvent(new Event('change', { bubbles: true }));
    }

};


export const randomString = () => Math.random().toString(36).substr(2, 5);
