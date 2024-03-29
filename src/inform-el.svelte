<script>
    export let errorDisableSubmit = null;
    export let resetOnSubmit = null;
    export let defaultSubmit = null;

    import { valuesToFormData, getFieldError, compareFieldValues, removeEmptyFields, setAtPath, flattenObject, getAtPath, normalizePath, extend, deepCompare } from './utils';
    import { onMount, tick } from 'svelte';
    import { get_current_component } from 'svelte/internal';

    let form;
    let submitButton;
    let host = get_current_component(); // can also be container.parentNode.host
    let container;
    let defaultSlot;
    let initialValues;
    let errorDisableSubmitIsPresent;
    let currentValues = {};
    let extraValues = {};
    let dirty = false;
    let submitting = false;
    let invalid = false;
    let errorShown = false;
    let resetOnSubmitIsPresent;
    let observer;
    let defaultSubmitIsPresent;

    $: {
        // error-disable-submit
        errorDisableSubmitIsPresent = errorDisableSubmit !== null && errorDisableSubmit !== undefined; // Make this block reactive to a change on errorDisableSubmit
    }

    $: {
        // reset-on-submit
        resetOnSubmitIsPresent = resetOnSubmit !== null && resetOnSubmit !== undefined; // Make this block reactive to a change on resetOnSubmit
    }

    $: {
        // default-submit
        defaultSubmitIsPresent = defaultSubmit !== null && defaultSubmit !== undefined; // Make this block reactive to a change on defaultSubmit
    }

    $: {
        // When currentValue or initialValues change => dirty check + validity check
        currentValues;
        checkDirty();
        checkValidity();
        host.values = currentValues;
    }

    $: {
        dirty;
        updateHostDirtyState();
    }

    $: {
        invalid;
        updateHostInvalidState();
    }

    $: {
        submitting;
        updateHostSubmittingState();
    }

    $: {
        // Submit button enabled
        if (submitButton) {
            submitButton.disabled = submitting || (errorShown && errorDisableSubmitIsPresent);
        }
    }

    function updateHostDirtyState() {
        host.dirty = dirty;

        if (dirty) {
            host.setAttribute('dirty', '');
        } else {
            host.removeAttribute('dirty');
        }
    }

    function updateHostInvalidState() {
        host.invalid = invalid;

        // Invalid : add class
        if (invalid) {
            host.setAttribute('invalid', '');
        } else {
            host.removeAttribute('invalid');
        }
    }

    function updateHostSubmittingState() {
        host.submitting = submitting;
        // Submitting => add class
        if (submitting) {
            host.setAttribute('submitting', '');
        } else {
            host.removeAttribute('submitting');
        }
    }

    async function sendSubmitRequest(submitter) {
        if (defaultSubmitIsPresent) {
            return;
        }
        if (form.hasAttribute('action') || submitter?.hasAttribute('formaction')) {
            // form.action is always set, we need to check if there is an attribute explicitely defined
            const rawValues = getFormValues();

            const values = host.submitTransform && typeof host.submitTransform === 'function' ? host.submitTransform(rawValues) : rawValues;
            try {
                const hasFiles = Object.values(values).some((v) => v instanceof File);
                const method = submitter?.getAttribute('formmethod') ?? form.getAttribute('method') ?? 'get';
                const isGet = method.toLowerCase() === 'get';
                const url = new URL(submitter?.hasAttribute('formaction') ? submitter?.formAction : form.action);

                if (isGet) {
                    // No body for get request
                    Object.keys(values).forEach((key) => {
                        url.searchParams.set(key, typeof values[key] === 'object' ? JSON.stringify(values[key]) : values[key]);
                    });
                }

                host.dispatchEvent(new CustomEvent('request-start', { detail: { values }, bubbles: true }));
                submitting = true;
                if (submitter) {
                    submitter.disabled = true;
                }

                try {
                    const result = await fetch(url.toString(), {
                        method,
                        headers: {
                            ...(!hasFiles && { 'Content-Type': 'application/json' }),
                        },
                        ...(!isGet && { body: hasFiles ? valuesToFormData(values) : JSON.stringify(values) }),
                    });

                    const response = await result.json();
                    if (result.ok) {
                        host.dispatchEvent(new CustomEvent('request-success', { detail: { response, status: result.status, values }, bubbles: true }));
                    } else {
                        host.dispatchEvent(new CustomEvent('request-error', { detail: { response, status: result.status, values }, bubbles: true }));
                    }
                } catch (e) {
                    host.dispatchEvent(new CustomEvent('request-error', { detail: { error: e, values }, bubbles: true }));
                }
            } catch (e) {
                console.error(e);
            } finally {
                submitting = false;
                if (submitter) {
                    submitter.disabled = false;
                }

                host.dispatchEvent(new CustomEvent('request-end', { detail: { values }, bubbles: true }));
            }
        }
    }

    function getInformFieldByName(name) {
        const all = [...host.querySelectorAll('inform-field')];
        const normalizedName = normalizePath(name);
        return all.find((f) => f.getAttribute('name') && normalizePath(f.getAttribute('name')) === normalizedName);
    }

    function getFormElementByName(name) {
        // Look for normalized name: a[b].c[d].e => a.b.c.d.e
        const normalizedName = normalizePath(name);
        for (let el of getAllFormElements()) {
            if (normalizePath(el.name) === normalizedName) {
                return el?.constructor?.name === 'RadioNodeList' ? el[0] : el;
            }
        }
    }

    function getAllFormElements() {
        return [...form.elements].filter((formElement) => !!formElement.name);
    }

    function getAllFormElementsNormalizedNames() {
        return getAllFormElements().map((e) => normalizePath(e.name));
    }

    function getFormValues(withExtraValues = true) {
        const values = {};

        getAllFormElements().forEach((e) => {
            const name = e.name;
            if (e.type === 'radio' && !e.checked) {
                return;
            }
            const value = getControlValue(e);
            if (value === undefined) {
                return;
            }

            const currentVal = getAtPath(values, name);

            // If we a;ready processed that field name (multiselects)
            if (currentVal !== undefined) {
                if (Array.isArray(currentVal)) {
                    setAtPath(values, name, [...currentVal, value]);
                } else {
                    setAtPath(values, name, [currentVal, value]);
                }
            } else {
                setAtPath(values, name, value);
            }
        });

        return withExtraValues ? extend(true, {}, extraValues, values) : values;
    }
    async function handleSubmit(e) {
        if (!defaultSubmitIsPresent) {
            e.preventDefault();
        }
        const submitter = e.submitter || e.detail?.submitter; // If event is customsubmit (attribute submit-on-change on inform0-field), we need to check e.detail.submitter

        host.querySelectorAll('inform-field').forEach((e) => e.setAttribute('touched', ''));

        checkValidity();
        if (!invalid) {
            host.dispatchEvent(new CustomEvent('inform-submit', { detail: { values: getFormValues(), submitter: submitter ?? null }, bubbles: true }));
            await sendSubmitRequest(submitter);
            if (resetOnSubmitIsPresent) {
                publicReset();
            }

            // Remove touched + dirty statuses after submitting
            resetTouched();
            initialValues = currentValues;
            checkDirty();
        } else {
            if (defaultSubmitIsPresent) {
                e.preventDefault(); // prevent navigation if the form is invalid
            }
            // focus the first invalid element
            getAllFormElements().some((e) => {
                if (!e.checkValidity()) {
                    e.focus();
                    return true;
                }
                const informField = e.closest('inform-field');
                if (informField && informField.hasAttribute('error')) {
                    e.focus();
                    return true;
                }
            });
            form.querySelector('inform-field[error]')?.focus();
        }
    }

    function handleInput(e) {
        if (!e.target.name) {
            return;
        }

        currentValues = getFormValues();
        const fieldName = e.target.name;
        setTimeout(() => {
            // Waiting for dirty and values to be updated after setting currentValues above
            host.dispatchEvent(
                new CustomEvent('inform-input', {
                    detail: {
                        values: { ...currentValues },
                        changedField: fieldName,
                    },
                    bubbles: true,
                })
            );
        }, 0);
    }

    function handleChange(e) {
        if (!e.target.name) {
            // Not a form field: we don't interfere
            return;
        }

        const newValues = getFormValues();
        const fieldName = e.target.name;

        setTimeout(() => {
            // Waiting for dirty and values to be updated after setting currentValues above
            host.dispatchEvent(
                new CustomEvent('inform-change', {
                    detail: {
                        values: { ...newValues },
                        changedField: fieldName,
                    },
                    bubbles: true,
                })
            );
        }, 0);
        currentValues = newValues;
    }

    function resetTouched() {
        host.querySelectorAll('[touched]').forEach((e) => {
            e.removeAttribute('touched');
        });
    }

    async function handleFormReset() {
        resetTouched();

        await tick(); // wait for the form to be actually reset before getting the values;

        initialValues = getFormValues();
        currentValues = initialValues;
    }

    function checkDirty() {
        if (!form) {
            return;
        }

        let someDirty = false;
        getAllFormElements().forEach((formElement) => {
            const name = formElement.name;
            const informField = formElement.closest('inform-field');

            const currVal = getAtPath(currentValues, name);
            const initVal = getAtPath(initialValues, name);

            if (!compareFieldValues(currVal, initVal)) {
                someDirty = true;

                if (informField) {
                    informField.setAttribute('dirty', '');
                }
            } else if (informField) {
                informField.removeAttribute('dirty');
            }
        });

        Object.keys(extraValues).forEach((key) => {
            if (!deepCompare(extraValues[key], initialValues[key])) {
                someDirty = true;
            }
        });

        dirty = someDirty;
    }

    function checkZodValidity() {
        try {
            if (host.zodSchema && typeof host.zodSchema.safeParse === 'function') {
                const zodResult = host.zodSchema.safeParse(removeEmptyFields(getFormValues()));

                if (!zodResult.success) {
                    return zodResult.error.issues.reduce(
                        (agg, issue) => ({
                            ...agg,
                            ...(issue.path.at(-1) && { [normalizePath(issue.path.join('.'))]: issue.message }),
                        }),
                        {}
                    );
                }
            }
        } catch (e) {
            console.error('Informel: Error validating zod schema', e);
        }
    }
    function checkValidity() {
        if (!form) {
            return;
        }

        const zodErrors = checkZodValidity();
        const validationHandleErrors = host.validationHandler && typeof host.validationHandler === 'function' ? host.validationHandler({ values: getFormValues() }) : null;

        const validationErrors = {
            ...zodErrors,
            ...validationHandleErrors,
        };

        const normalizedValidationErrors = Object.keys(validationErrors).reduce(
            (result, key) => ({
                ...result,
                [normalizePath(key)]: validationErrors[key],
            }),
            {}
        );

        getAllFormElements().forEach((element) => {
            const normalizedElName = normalizePath(element.name);
            // Set native error
            element.setCustomValidity(normalizedValidationErrors?.[normalizedElName] ?? '');

            const informField = element.closest('inform-field');
            if (informField) {
                const errorPropValue = normalizedValidationErrors?.[normalizedElName] ?? getFieldError(element, informField);
                if (errorPropValue) {
                    informField.setAttribute('error-message', errorPropValue);
                } else {
                    informField.removeAttribute('error-message');
                }
            }
        });

        const informFieldsWithName = [...host.querySelectorAll('inform-field[name]')];
        informFieldsWithName.forEach((informField) => {
            const name = normalizePath(informField.getAttribute('name'));
            const errorPropValue = normalizedValidationErrors?.[name];
            if (errorPropValue) {
                informField.setAttribute('error-message', errorPropValue);
            } else {
                informField.removeAttribute('error-message');
            }
        });

        const flatExtraValues = flattenObject(extraValues);

        // extra fields that are not present
        for (let key in flatExtraValues) {
            const error = normalizedValidationErrors?.[key];
            const informField = getInformFieldByName(key);

            if (informField && !error) {
                informField.removeAttribute('error-message');
            }
        }

        invalid = !form.checkValidity() || Object.keys(normalizedValidationErrors ?? {}).some((key) => !!normalizedValidationErrors[key]);

        errorShown = !!host.querySelector('inform-field[error]');
    }

    async function initSlot() {
        if (form) {
            cleanup();
        }
        form = defaultSlot.assignedElements()[0];

        if (!form || form.tagName.toLowerCase() !== 'form') {
            console.error('<inform-el> must have a <form> element as direct child');
        }
        form.noValidate = true;

        host.reset = publicReset;
        host.setValues = publicSetValues;
        host.requestSubmit = publicRequestSubmit;
        host.getExtraValues = () => extraValues;
        form.addEventListener('submit', handleSubmit);
        form.addEventListener('input', handleInput);
        form.addEventListener('change', handleChange);
        form.addEventListener('reset', handleFormReset);

        submitButton = form.querySelector('[type="submit"]');

        // Wait for children to be mounted before checking validity
        await tick();

        initialValues = getFormValues();
        currentValues = initialValues;

        host.dispatchEvent(new CustomEvent('informel-ready', { bubbles: true }));

        observeDescendants();
    }

    function isWatchedNode(n) {
        return n.nodeType === Node.ELEMENT_NODE && (n.tagName?.toLowerCase() === 'inform-el' || n.hasAttribute('name'));
    }

    function observeDescendants() {
        if ('MutationObserver' in window) {
            observer = new MutationObserver((mutationList) => {
                if (mutationList.some((m) => (m.target === form || form.contains(m.target)) && ([...m.addedNodes].some(isWatchedNode) || [...m.removedNodes].some(isWatchedNode)))) {
                    // if some extra values match some fields, assign values to the fields
                    const flatExtraValues = flattenObject(extraValues);
                    const newExtraValues = {};
                    const formElementNames = getAllFormElementsNormalizedNames();
                    for (const key in flatExtraValues) {
                        const field = getFormElementByName(key);

                        if (field) {
                            if (!controlHasValue(field)) {
                                // if the field doesn't already have a value
                                setControlValue(field, flatExtraValues[key]);
                            }
                        } else if (flatExtraValues[key]?.length !== 0 || !formElementNames.some((n) => n.startsWith(`${key}.`))) {
                            setAtPath(newExtraValues, key, flatExtraValues[key]);
                        }
                    }

                    extraValues = newExtraValues;
                    currentValues = getFormValues();

                    // Also remove from initial values the fields that were removed
                    const flatInitialValues = flattenObject(initialValues);
                    const flatFormValues = flattenObject(currentValues);
                    const newInitialValues = {};

                    for (const key in flatInitialValues) {
                        if (key in flatFormValues) {
                            setAtPath(newInitialValues, key, flatInitialValues[key]);
                        }
                    }
                    // Add the fields that were added to the initial values
                    for (const key in flatFormValues) {
                        if (!(key in flatInitialValues)) {
                            setAtPath(newInitialValues, key, flatFormValues[key]);
                        }
                    }
                    initialValues = newInitialValues;
                }
            });

            observer.observe(form, { childList: true, subtree: true });
            return observer;
        }
    }

    function cleanup() {
        if (observer) {
            observer.disconnect();
        }
        form?.removeEventListener('change', handleChange);
        form?.removeEventListener('input', handleInput);
        form?.removeEventListener('submit', handleSubmit);
        form?.removeEventListener('reset', handleFormReset);
    }

    onMount(() => {
        defaultSlot = container.querySelector('slot');
        defaultSlot.addEventListener('slotchange', initSlot);
        return () => {
            defaultSlot.removeEventListener('slotchange', initSlot);
            cleanup();
        };
    });

    function setControlValue(control, value) {
        if (control.type === 'checkbox') {
            control.checked = value;
        } else if (control.type === 'radio') {
            control.checked = value === control.value;
        } else if (control.tagName.toLowerCase() === 'select' && control.hasAttribute('multiple')) {
            const valArray = Array.isArray(value) ? value : [value];
            control.querySelectorAll('option').forEach((o) => {
                o.selected = valArray.includes(o.value);
            });
        } else if (control.type === 'file') {
            if (['', null, undefined].includes(value) || (Array.isArray(value) && value.length === 0)) {
                control.value = '';
            }
        } else {
            control.value = value;
        }

        // Dispatch an event to let others know that this has changed
        control.dispatchEvent(new CustomEvent('inform-updated', { bubbles: true }));
    }

    function getControlValue(control) {
        if (control.type === 'checkbox') {
            return control.checked;
        } else if (control.type === 'radio') {
            return control.checked ? control.value : undefined;
        } else if (control.tagName.toLowerCase() === 'select' && control.hasAttribute('multiple')) {
            return [...control.querySelectorAll('option')].map((o) => (o.selected ? o.value : undefined)).filter(Boolean);
        } else if (control.type === 'file') {
            const files = [...control.files];
            if (control.multiple) {
                return files;
            } else {
                return files[0];
            }
        } else if (control.type === 'number') {
            return control.value ? Number(control.value) : undefined;
        } else {
            return control.value;
        }
    }

    function controlHasValue(control) {
        const value = getControlValue(control);
        return !!value && (!Array.isArray(value) || value.length > 0);
    }

    function setValues(newValues) {
        getAllFormElements().forEach((e) => {
            const value = getAtPath(newValues, e.name);
            if (value !== undefined) {
                setControlValue(e, value);
            }
        });

        const formElementNames = getAllFormElementsNormalizedNames();
        Object.entries(flattenObject(newValues)).forEach(([path, value]) => {
            if (value?.length === 0 && formElementNames.some((n) => n.startsWith(`${path}.`))) {
                // Some fields are array of objects and the values specify the array is empty.
                // Example: we have a field "users.0.name" and the value of users is an empty array.
                // Although we don't have a strictly matching field ("users"), this is not an extra value
                return;
            }
            if (!getFormElementByName(path)) {
                setAtPath(extraValues, path, value);
            }
        });
        currentValues = getFormValues();
    }

    //
    // Public methods
    //
    function publicReset(v) {
        const newValues = extend(true, {}, initialValues, v);

        form.reset(); // This will trigger handleFormReset which will reset touched
        // Reset current extra values
        for (let key in extraValues) {
            if (initialValues[key]) {
                extraValues[key] = initialValues[key];
            } else {
                delete extraValues[key];
            }
        }
        setValues(newValues);
        initialValues = currentValues;
    }

    function publicSetValues(newValues) {
        setValues(newValues);

        const flatObject = flattenObject(newValues);

        // Setting the touched attributes on inform-field
        Object.keys(flatObject).forEach((key) => {
            const control = getFormElementByName(key);
            if (control) {
                const informField = control.closest('inform-field');
                if (informField) {
                    informField.setAttribute('touched', '');
                }
            } else {
                const informField = getInformFieldByName(key);

                if (informField) {
                    informField.setAttribute('touched', '');
                }
            }
        });
    }

    function publicRequestSubmit() {
        if (typeof form.requestSubmit === 'function') {
            form.requestSubmit();
        } else {
            // requestSubmit not supported on safari
            const submitter = document.createElement('input');
            submitter.type = 'submit';
            submitter.style.display = 'none';
            submitter.hidden = true;
            form.appendChild(submitter);
            submitter.click();
            form.removeChild(submitter);
        }
    }
</script>

<div bind:this={container} on:customsubmit={handleSubmit}>
    <slot />
</div>
