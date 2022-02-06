<script>
    export let errorDisableSubmit;

    import { onMount, tick } from "svelte";
    import { get_current_component } from "svelte/internal";

    let form;
    let submitButton;
    let host = get_current_component(); // can also be container.parentNode.host
    let container;
    let defaultSlot;

    function getFormValues() {
        return Object.fromEntries(new FormData(form));
    }
    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        host.querySelectorAll("inform-field").forEach((e) => e.classList.add("touched"));
        if (checkValidity()) {
            host.dispatchEvent(new CustomEvent("submit", { detail: { values: getFormValues() }, bubbles: true }));
        }
    }
    function handleInput(e) {
        checkValidity();
    }

    function handleChange(e) {
        const control = e.target;
        control.classList.add("touched");
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
        const validityAttribute = toKebabCase(getValidityKey(element));

        return informField.getAttribute(validityAttribute) ?? informField.getAttribute("error-message") ?? element.validationMessage;
    }

    function toKebabCase(str) {
        return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    }
    function checkValidity() {
        const errors = host.validationHandler ? host.validationHandler({ values: getFormValues() }) : null;

        const elements = [...form.elements];

        elements.forEach((element) => {
            // Set native error
            element.setCustomValidity(errors?.[element.name] ?? "");

            const informField = element.closest("inform-field");
            if (informField) {
                informField.setAttribute("error", errors?.[element.name] ?? getFieldError(element, informField));
            }
        });

        const valid = form.checkValidity();
        if (!valid) {
            host.classList.add("invalid");
        } else {
            host.classList.remove("invalid");
        }

        if (getErrorDisabledSubmit()) {
            submitButton.disabled = !valid;
        }

        return valid;
    }

    function getErrorDisabledSubmit() {
        return errorDisableSubmit !== null && errorDisableSubmit !== undefined;
    }

    // error-disable-submit
    $: {
        errorDisableSubmit; // Make this block reactive to a change on errorDisableSubmit
        if (submitButton) {
            if (!getErrorDisabledSubmit()) {
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

        form.addEventListener("submit", handleSubmit);
        form.addEventListener("input", handleInput);
        form.addEventListener("change", handleChange);

        submitButton = form.querySelector('[type="submit"]');
        if (!submitButton) {
            throw new Error("There is no submit button on this form!");
        }

        // Wait for children to be mounted before checking validity
        await tick();
        checkValidity();
    }

    onMount(() => {
        defaultSlot = container.querySelector("slot");
        initSlot();
        defaultSlot.addEventListener("slotchange", initSlot);
        return () => {
            defaultSlot.removeEventListener("slotchange", initSlot);
            form.removeEventListener("change", handleChange);
            form.removeEventListener("input", handleInput);
            form.removeEventListener("submit", handleSubmit);
        };
    });
</script>

<div bind:this={container}>
    <slot />
</div>
