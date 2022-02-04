<script>
    let errorDisableSubmit;
    import { onMount } from "svelte";

    let form;
    let submitButton;
    let host;

    function getFormValues() {
        return Object.fromEntries(new FormData(form));
    }
    function handleSubmit() {
        if (checkValidity()) {
            host.dispatchEvent(new CustomEvent("submit", { detail: { values: getFormValues() }, bubbles: true }));
        }
    }
    function handleInput(e) {
        checkValidity();
    }

    function handleChange(e) {
        e.target.classList.add("touched");
    }

    function checkValidity() {
        let hasCustomError = false;

        if (host.validationHandler) {
            const errors = host.validationHandler({ values: getFormValues() });

            const elements = [...form.elements];

            elements.forEach((element) => {
                hasCustomError |= !!errors?.[element.name];
                element.setCustomValidity(errors?.[element.name] ?? "");
            });
        }

        const valid = form.checkValidity() && !hasCustomError;
        if (!valid) {
            host.classList.add("invalid");
        } else {
            host.classList.remove("invalid");
        }

        if (errorDisableSubmit) {
            submitButton.disabled = !valid;
        }

        return valid;
    }

    // error-disable-submit
    $: {
        errorDisableSubmit = $$props["error-disable-submit"] !== null && $$props["error-disable-submit"] !== undefined;
        if (submitButton) {
            if (!errorDisableSubmit) {
                submitButton.disabled = false;
            } else {
                checkValidity();
            }
        }
    }

    export function setValidationHandler(handler) {
        alert("toto");
    }

    onMount(() => {
        host = form.parentElement;
        submitButton = form.querySelector('[type="submit"]');

        if (!submitButton) {
            throw new Error("There is no submit button on this form!");
        }
    });
</script>

<form novalidate on:submit|preventDefault|stopPropagation={handleSubmit} on:input={handleInput} on:change={handleChange} bind:this={form}>
    <slot />
</form>
