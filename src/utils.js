/**
 * Converts camelCase => Kebab case
*/
function toKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Looks at the [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) of a form element,
 * and returns the first field that is true
 */
function getValidityKey(element) {
    for (let key in element.validity) {
        if (element.validity[key]) {
            return key;
        }
    }
}

/**
* Converts a JS object to FormData
*/
export function valuesToFormData(values) {
    const result = new FormData();
    for (let key in values) {
        result.append(key, values[key]);
    }

    return result;
}

/**
 * Returns the error to display given a form element and its corresponding informField.
 * Order of priority : informField valididty attribute > informField "default-error" attribute > element native [validationMessage](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage)
 */
export function getFieldError(element, informField) {
    const isValid = element.checkValidity();

    if (isValid) {
        return "";
    }
    const validityAttribute = toKebabCase(getValidityKey(element));

    return informField?.getAttribute(validityAttribute) ?? informField?.getAttribute("default-error") ?? element.validationMessage;
}


export function compareFieldValues(val1, val2) {
    if (Array.isArray(val1) && Array.isArray(val2)) {
        return JSON.stringify(val1.sort()) === JSON.stringify(val2.sort());
    } else {
        return val1 === val2;
    }
}
