<script>
    export let errorDisableSubmit = null;
    export let action = null;
    export let method = "POST";

    import kebabCase from "just-kebab-case";
    import { onMount, tick } from "svelte";
    import { get_current_component } from "svelte/internal";

    let form;
    let submitButton;
    let host = get_current_component(); // can also be container.parentNode.host
    let container;
    let defaultSlot;
    let submitting;
    let initialValues;
    let errorDisableSubmitIsPresent;

    async function sendSubmitRequest(submitter) {
        if (action) {
            const values = getFormValues();
            try {
                const hasFiles = Object.values(values).some((v) => v instanceof File);

                host.dispatchEvent(new CustomEvent("requestStart", { detail: { values: getFormValues() }, bubbles: true }));
                submitting = true;
                submitter.disabled = true;

                try {
                    const result = await fetch(action, {
                        method,
                        headers: {
                            ...(!hasFiles && { "Content-Type": "application/json" }),
                        },
                        body: hasFiles ? valuesToFormData(values) : JSON.stringify(values),
                    });
                    const response = await result.json();
                    if (result.ok) {
                        host.dispatchEvent(new CustomEvent("requestSuccess", { detail: { response, status: result.status, values }, bubbles: true }));
                    } else {
                        host.dispatchEvent(new CustomEvent("requestError", { detail: { response, status: result.status, values }, bubbles: true }));
                    }
                } catch (e) {
                    host.dispatchEvent(new CustomEvent("requestError", { detail: { error: e, values }, bubbles: true }));
                }
            } catch (e) {
                console.error(e);
            } finally {
                submitting = false;
                submitter.disabled = false;

                host.dispatchEvent(new CustomEvent("requestEnd", { detail: values, bubbles: true, composed: true }));
            }
        }
    }

    $: {
        if (submitting) {
            host.classList.add("submitting");
        } else {
            host.classList.remove("submitting");
        }
    }

    function valuesToFormData(values) {
        const result = new FormData();
        for (let key in values) {
            result.append(key, values[key]);
        }

        return result;
    }

    function getFormValues() {
        const values = Object.fromEntries(new FormData(form));
        // Add missing values (checkboxes)
        [...form.elements].forEach((e) => {
            const name = e.name;

            if (e.type === "checkbox") {
                const elementValue = e.type === "checkbox" ? e.checked : e.value;
                values[name] = elementValue;
            } else if (e.type === "radio" && name && !values[name]) {
                values[name] = "";
            }
        });

        return values;
    }
    async function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        const submitter = e.submitter || e.detail.submitter; // If event is customsubmit, we need to check e.detail.submitter

        host.querySelectorAll("inform-field").forEach((e) => e.setAttribute("touched", ""));
        if (checkValidity()) {
            host.dispatchEvent(new CustomEvent("submit", { detail: { values: getFormValues() }, bubbles: true }));
            await sendSubmitRequest(submitter);
            form.reset();
        }
    }
    function handleInput(e) {
        e.stopPropagation();
        checkDirty();

        checkValidity();
        host.dispatchEvent(new CustomEvent("input", { detail: { values: getFormValues() }, bubbles: true }));
    }

    function handleChange(e) {
        e.stopPropagation();

        const formField = e.target;
        formField.setAttribute("touched", "");

        host.dispatchEvent(new CustomEvent("change", { detail: { values: getFormValues() }, bubbles: true }));
    }

    async function handleFormReset() {
        host.querySelectorAll("[touched]").forEach((e) => {
            e.removeAttribute("touched");
        });

        host.classList.remove("dirty");
        host.dirty = false;
        host.querySelectorAll(".dirty").forEach((e) => e.classList.remove("dirty"));
        await tick(); // wait for the form to be actually reset before getting the values;
        host.values = getFormValues();

        checkValidity();
    }

    function getValidityKey(element) {
        for (let key in element.validity) {
            if (element.validity[key]) {
                return key;
            }
        }
    }

    function getFieldError(element, informField) {
        const isValid = element.checkValidity();

        if (isValid) {
            return "";
        }
        const validityAttribute = kebabCase(getValidityKey(element));

        return informField.getAttribute(validityAttribute) ?? informField.getAttribute("default-error") ?? element.validationMessage;
    }

    function checkDirty() {
        const newValues = getFormValues();
        let dirty = false;
        Object.keys(newValues).forEach((key) => {
            // For radio buttons we could get an array here
            const formElement = form.elements[key] instanceof RadioNodeList ? form.elements[key][0] : form.elements[key];
            const informField = formElement.closest("inform-field");

            if (newValues[key] !== initialValues[key]) {
                dirty = true;

                if (informField) {
                    informField.classList.add("dirty");
                }
            } else if (informField) {
                informField.classList.remove("dirty");
            }
        });

        host.dirty = dirty;

        if (dirty) {
            host.classList.add("dirty");
        } else {
            host.classList.remove("dirty");
        }

        host.values = newValues;
    }
    function checkValidity() {
        const errors = host.validationHandler ? host.validationHandler({ values: getFormValues() }) : null;

        const elements = [...form.elements];

        elements.forEach((element) => {
            // Set native error
            element.setCustomValidity(errors?.[element.name] ?? "");

            const informField = element.closest("inform-field");
            if (informField) {
                const errorPropValue = errors?.[element.name] ?? getFieldError(element, informField);
                if (errorPropValue) {
                    informField.setAttribute("error", errorPropValue);
                } else {
                    informField.removeAttribute("error");
                }
            }
        });

        const valid = form.checkValidity();
        if (!valid) {
            host.classList.add("invalid");
        } else {
            host.classList.remove("invalid");
        }

        if (!submitting && errorDisableSubmitIsPresent && submitButton) {
            submitButton.disabled = !valid;
        }

        return valid;
    }

    // error-disable-submit
    $: {
        errorDisableSubmitIsPresent = errorDisableSubmit !== null && errorDisableSubmit !== undefined; // Make this block reactive to a change on errorDisableSubmit
        if (submitButton) {
            if (!errorDisableSubmitIsPresent) {
                submitButton.disabled = false;
            } else {
                checkValidity();
            }
        }
    }

    async function initSlot() {
        form = defaultSlot.assignedElements()[0];

        if (!form || form.tagName.toLowerCase() !== "form") {
            throw new Error("<inform-el> must have a <form> element as direct child");
        }
        form.noValidate = true;

        host.reset = publicReset;
        form.addEventListener("submit", handleSubmit);
        form.addEventListener("input", handleInput);
        form.addEventListener("change", handleChange);
        form.addEventListener("reset", handleFormReset);

        submitButton = form.querySelector('[type="submit"]');

        // Wait for children to be mounted before checking validity
        await tick();

        host.dirty = false;
        initialValues = getFormValues();
        host.values = initialValues;
        checkValidity();
    }

    onMount(() => {
        defaultSlot = container.querySelector("slot");
        defaultSlot.addEventListener("slotchange", initSlot);
        return () => {
            defaultSlot.removeEventListener("slotchange", initSlot);
            form.removeEventListener("change", handleChange);
            form.removeEventListener("input", handleInput);
            form.removeEventListener("submit", handleSubmit);
            form.removeEventListener("reset", handleFormReset);
        };
    });

    //
    // Public methods
    //
    function publicReset(newValues) {
        host.classList.remove("dirty");
        host.dirty = false;
        host.querySelectorAll(".dirty").forEach((e) => e.classList.remove("dirty"));

        if (!newValues) {
            form.reset();
        } else {
            [...form.elements].forEach((e) => {
                const name = e.name;

                if (e.type === "checkbox") {
                    e.checked = newValues[name];
                } else if (e.type === "radio") {
                    e.checked = newValues[name] === e.value;
                } else {
                    e.value = newValues[name];
                }
            });
        }

        initialValues = getFormValues();
        host.values = initialValues;
    }
</script>

<div bind:this={container} on:customsubmit={handleSubmit}>
    <slot />
</div>
