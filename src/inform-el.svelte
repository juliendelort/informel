<script>
    export let errorDisableSubmit = null;

    import { valuesToFormData, getFieldError } from "./utils";
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
    let invalid = false;
    let currentValues = {};
    let dirty = false;

    $: {
        // error-disable-submit
        errorDisableSubmitIsPresent = errorDisableSubmit !== null && errorDisableSubmit !== undefined; // Make this block reactive to a change on errorDisableSubmit
    }

    $: {
        // Submitting => add class
        if (submitting) {
            host.classList.add("submitting");
        } else {
            host.classList.remove("submitting");
        }
    }

    $: {
        // Submit button enabled
        if (submitButton) {
            submitButton.disabled = submitting || (invalid && errorDisableSubmitIsPresent);
        }
    }

    $: {
        // When currentValue changes => dirty check + validity check
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

    function updateHostDirtyState() {
        host.dirty = dirty;

        if (dirty) {
            host.classList.add("dirty");
        } else {
            host.classList.remove("dirty");
        }
    }

    function updateHostInvalidState() {
        // Invalid : add class
        if (invalid) {
            host.classList.add("invalid");
        } else {
            host.classList.remove("invalid");
        }
    }

    async function sendSubmitRequest(submitter) {
        if (form.getAttribute("action")) {
            // form.action is always set, we need to check if there is an attribute explicitely defined
            console.log("****sending", form.action, form.method, form.getAttribute("action"));
            const values = getFormValues();
            try {
                const hasFiles = Object.values(values).some((v) => v instanceof File);
                const isGet = form.method.toLowerCase() === "get";
                const url = new URL(form.action);

                if (isGet) {
                    // No body for get request
                    Object.keys(values).forEach((key) => {
                        url.searchParams.set(key, values[key]);
                    });
                }

                host.dispatchEvent(new CustomEvent("requestStart", { detail: { values }, bubbles: true }));
                submitting = true;
                submitter.disabled = true;

                try {
                    const result = await fetch(url.toString(), {
                        method: form.method,
                        headers: {
                            ...(!hasFiles && { "Content-Type": "application/json" }),
                        },
                        ...(!isGet && { body: hasFiles ? valuesToFormData(values) : JSON.stringify(values) }),
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

                host.dispatchEvent(new CustomEvent("requestEnd", { detail: { values }, bubbles: true }));
            }
        }
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

        if (!invalid) {
            host.dispatchEvent(new CustomEvent("submit", { detail: { values: getFormValues() }, bubbles: true }));
            await sendSubmitRequest(submitter);
            form.reset();
        }
    }

    function handleInput(e) {
        e.stopPropagation();
        currentValues = getFormValues();

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

        host.querySelectorAll(".dirty").forEach((e) => e.classList.remove("dirty"));
        await tick(); // wait for the form to be actually reset before getting the values;

        initialValues = getFormValues();
        currentValues = initialValues;
    }

    function checkDirty() {
        if (!form) {
            return;
        }
        let someDirty = false;
        Object.keys(currentValues).forEach((key) => {
            // For radio buttons we could get an array here
            const formElement = form.elements[key] instanceof RadioNodeList ? form.elements[key][0] : form.elements[key];
            const informField = formElement.closest("inform-field");

            if (currentValues[key] !== initialValues[key]) {
                someDirty = true;

                if (informField) {
                    informField.classList.add("dirty");
                }
            } else if (informField) {
                informField.classList.remove("dirty");
            }
        });

        dirty = someDirty;
    }
    function checkValidity() {
        if (!form) {
            return;
        }

        const customValidationErrors = host.validationHandler ? host.validationHandler({ values: getFormValues() }) : null;

        const elements = [...form.elements];

        elements.forEach((element) => {
            // Set native error
            element.setCustomValidity(customValidationErrors?.[element.name] ?? "");

            const informField = element.closest("inform-field");
            if (informField) {
                const errorPropValue = customValidationErrors?.[element.name] ?? getFieldError(element, informField);
                if (errorPropValue) {
                    informField.setAttribute("error", errorPropValue);
                } else {
                    informField.removeAttribute("error");
                }
            }
        });

        invalid = !form.checkValidity();
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

        initialValues = getFormValues();
        currentValues = initialValues;
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
            initialValues = getFormValues();
            currentValues = initialValues;
        }
    }
</script>

<div bind:this={container} on:customsubmit={handleSubmit}>
    <slot />
</div>
