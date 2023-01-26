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


// Function that removes empty fields from objects
export function removeEmptyFields(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined && v !== ""));
}

function getPathParts(name) {
    return name.match(/[^\]\[.]+/g);
}

export function normalizePath(path) {
    // a[b].c[d].e => a.b.c.d.e
    return getPathParts(path).join('.');
}

export function flattenObject(obj, path = [], allPaths = {}) {
    for (let key in obj) {
        const newPath = [...path, key];
        const value = obj[key];
        if (typeof value === 'object') {
            flattenObject(value, newPath, allPaths);
        } else {
            allPaths[newPath.join('.')] = value;
        }
    }

    return allPaths;
}

export function getAtPath(obj, path) {
    const parts = getPathParts(path);
    return parts.reduce((acc, part) => acc?.[part], obj);
}

export function setAtPath(obj, path, value) {
    const parts = getPathParts(path);

    // console.log('setAtPath++', JSON.stringify({ obj, path, value }));

    parts.reduce((curr, accessor, index) => {
        // console.log(JSON.stringify({ curr, accessor, index }));
        if (index === parts.length - 1) {
            curr[accessor] = value;
        } else if (curr[accessor] === undefined) {
            const nextAccessor = parts[index + 1];
            curr[accessor] = isNaN(nextAccessor) ? {} : [];
        }
        return curr[accessor];
    }, obj);

    // console.log('setAtPath--', JSON.stringify({ obj }));
}



// TODO: current failing test:
// $0.setValues( {users:[undefined, undefined, {age:30}]}); ==> OK
// Change the first name of the second user in the form => `informel.values` is wrong as result

//----------------------------
// Stolen from https://github.com/angus-c/just/blob/master/packages/object-extend/index.cjs

/*
  var obj = {a: 3, b: 5};
  extend(obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 4, b: 5, c: 8}
  var obj = {a: 3, b: 5};
  extend({}, obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 3, b: 5}
  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  extend(obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3, 4]}
  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  extend(true, obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3]}
  extend({a: 4, b: 5}); // {a: 4, b: 5}
  extend({a: 4, b: 5}, 3); {a: 4, b: 5}
  extend({a: 4, b: 5}, true); {a: 4, b: 5}
  extend('hello', {a: 4, b: 5}); // throws
  extend(3, {a: 4, b: 5}); // throws
*/
export function extend(/* [deep], obj1, obj2, [objn] */) {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    if (isUnextendable(result)) {
        throw new Error('extendee must be an object');
    }
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0; i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            if (Object.prototype.hasOwnProperty.call(extender, key)) {
                var value = extender[key];
                if (deep && isCloneable(value)) {
                    var base = Array.isArray(value) ? [] : {};
                    result[key] = extend(
                        true,
                        Object.prototype.hasOwnProperty.call(result, key) && !isUnextendable(result[key])
                            ? result[key]
                            : base,
                        value
                    );
                } else {
                    result[key] = value;
                }
            }
        }
    }
    return result;
}

function isCloneable(obj) {
    return Array.isArray(obj) || {}.toString.call(obj) == '[object Object]';
}

function isUnextendable(val) {
    return !val || (typeof val != 'object' && typeof val != 'function');
}
