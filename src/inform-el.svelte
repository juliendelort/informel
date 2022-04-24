<script>
    export let errorDisableSubmit = null;
    export let resetOnSubmit = null;

    import { valuesToFormData, getFieldError, compareFieldValues } from './utils';
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

    $: {
        // error-disable-submit
        errorDisableSubmitIsPresent = errorDisableSubmit !== null && errorDisableSubmit !== undefined; // Make this block reactive to a change on errorDisableSubmit
    }

    $: {
        // reset-on-submit
        resetOnSubmitIsPresent = resetOnSubmit !== null && resetOnSubmit !== undefined; // Make this block reactive to a change on resetOnSubmit
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
                        url.searchParams.set(key, values[key]);
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

    function getFormElementByName(name) {
        return form.elements[name] instanceof RadioNodeList ? form.elements[name][0] : form.elements[name];
    }

    function getAllFormElements() {
        return [...form.elements].filter((formElement) => !!formElement.name);
    }

    function getFormValues() {
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
            if (values.hasOwnProperty(name)) {
                if (Array.isArray(values[name])) {
                    values[name] = [...values[name], value];
                } else {
                    values[name] = [values[name], value];
                }
            } else {
                values[name] = value;
            }
        });

        return {
            ...extraValues,
            ...values,
        };
    }
    async function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const submitter = e.submitter || e.detail?.submitter; // If event is customsubmit (attribute submit-on-change on inform0-field), we need to check e.detail.submitter

        host.querySelectorAll('inform-field').forEach((e) => e.setAttribute('touched', ''));

        checkValidity();
        if (!invalid) {
            host.dispatchEvent(new CustomEvent('submit', { detail: { values: getFormValues(), submitter: submitter ?? null }, bubbles: true }));
            await sendSubmitRequest(submitter);
            if (resetOnSubmitIsPresent) {
                publicReset();
            }

            // Remove touched + dirty statuses after submitting
            resetTouched();
            initialValues = currentValues;
            checkDirty();
        }
    }

    function handleInput(e) {
        // Not a form field: we don't interfere
        if (!e.target.name) {
            return;
        }
        e.stopPropagation();

        currentValues = getFormValues();
        host.dispatchEvent(
            new CustomEvent('input', {
                detail: {
                    values: { ...currentValues },
                    changedField: e.target.name,
                },
                bubbles: true,
            })
        );
    }

    function handleChange(e) {
        if (!e.target.name) {
            // Not a form field: we don't interfere
            return;
        }
        e.stopPropagation();

        const newValues = getFormValues();

        host.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    values: { ...currentValues },
                    changedField: e.target.name,
                },
                bubbles: true,
            })
        );

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

            if (!compareFieldValues(currentValues[name], initialValues[name])) {
                someDirty = true;

                if (informField) {
                    informField.setAttribute('dirty', '');
                }
            } else if (informField) {
                informField.removeAttribute('dirty');
            }
        });

        Object.keys(extraValues).forEach((key) => {
            if (!compareFieldValues(extraValues[key], initialValues[key])) {
                someDirty = true;
            }
        });

        dirty = someDirty;
    }
    function checkValidity() {
        if (!form) {
            return;
        }

        const customValidationErrors = host.validationHandler && typeof host.validationHandler === 'function' ? host.validationHandler({ values: getFormValues() }) : null;

        getAllFormElements().forEach((element) => {
            // Set native error
            element.setCustomValidity(customValidationErrors?.[element.name] ?? '');

            const informField = element.closest('inform-field');
            if (informField) {
                const errorPropValue = customValidationErrors?.[element.name] ?? getFieldError(element, informField);
                if (errorPropValue) {
                    informField.setAttribute('error-message', errorPropValue);
                    element.setAttribute('aria-invalid', 'true');
                } else {
                    informField.removeAttribute('error-message');
                    element.removeAttribute('aria-invalid');
                }
            }
        });

        // Look for extra fields in the validation result
        if (customValidationErrors) {
            for (let key in customValidationErrors) {
                const informField = host.querySelector(`inform-field[name="${key}"]`);

                if (informField) {
                    informField.setAttribute('error-message', customValidationErrors[key]);
                }
            }
        }

        // extra fields that are not present
        for (let key in extraValues) {
            const error = customValidationErrors?.[key];
            const informField = host.querySelector(`inform-field[name="${key}"]`);

            if (informField && !error) {
                informField.removeAttribute('error-message');
            }
        }

        invalid = !form.checkValidity() || Object.keys(customValidationErrors ?? {}).some((key) => !!customValidationErrors[key]);

        errorShown = !!host.querySelector('inform-field[error]');
    }

    async function initSlot() {
        form = defaultSlot.assignedElements()[0];

        if (!form || form.tagName.toLowerCase() !== 'form') {
            console.error('<inform-el> must have a <form> element as direct child');
        }
        form.noValidate = true;

        host.reset = publicReset;
        host.setValues = publicSetValues;
        host.requestSubmit = publicRequestSubmit;
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
    }

    onMount(() => {
        defaultSlot = container.querySelector('slot');
        defaultSlot.addEventListener('slotchange', initSlot);
        return () => {
            defaultSlot.removeEventListener('slotchange', initSlot);
            form.removeEventListener('change', handleChange);
            form.removeEventListener('input', handleInput);
            form.removeEventListener('submit', handleSubmit);
            form.removeEventListener('reset', handleFormReset);
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

    function setValues(newValues) {
        getAllFormElements().forEach((e) => {
            const name = e.name;
            if (newValues.hasOwnProperty(name)) {
                setControlValue(e, newValues[name]);
            }
        });

        // Reset current extra values
        for (let key in extraValues) {
            if (initialValues[key]) {
                extraValues[key] = initialValues[key];
            } else {
                delete extraValues[key];
            }
        }

        // Looking for new extra values
        Object.keys(newValues).forEach((key) => {
            if (!getFormElementByName(key)) {
                extraValues = {
                    ...extraValues,
                    [key]: newValues[key],
                };
            }
        });

        currentValues = getFormValues();
    }

    //
    // Public methods
    //
    function publicReset(v) {
        const newValues = {
            ...initialValues,
            ...v,
        };

        form.reset(); // This will trigger handleFormReset which will reset touched
        setValues(newValues);
        initialValues = currentValues;
    }

    function publicSetValues(newValues) {
        setValues(newValues);

        // Setting the touched attributes on inform-field
        Object.keys(newValues).forEach((key) => {
            const control = getFormElementByName(key);
            if (control) {
                const informField = control.closest('inform-field');
                if (informField) {
                    informField.setAttribute('touched', '');
                }
            } else {
                const informField = host.querySelector(`inform-field[name="${key}"]`);

                if (informField) {
                    informField.setAttribute('touched', '');
                }
            }
        });
    }

    function publicRequestSubmit() {
        form.requestSubmit();
    }
</script>

<div bind:this={container} on:customsubmit={handleSubmit}>
    <slot />
</div>
