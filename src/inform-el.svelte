<script>
    let errorDisableSubmit;
    import { onMount } from "svelte";

    let form;
    let submitButton;
    let validationHandler;

    function getFormValues() {
        return Object.fromEntries(new FormData(form));
    }
    function handleSubmit() {
        if (checkValidity()) {
            form.parentElement.dispatchEvent(new CustomEvent("submit", { detail: { values: getFormValues() }, bubbles: true }));
        }
    }
    function handleInput(e) {
        checkSubmitButtonEnabled();
    }

    function handleChange(e) {
        e.target.classList.add("touched");
    }

    function checkValidity() {
        let errors = null;
        if (validationHandler) {
            errors = validationHandler({ values: getFormValues() });
        }

        return form.checkValidity() && !errors;
    }

    function checkSubmitButtonEnabled() {
        if (errorDisableSubmit) {
            submitButton.disabled = !checkValidity();
        }
    }

    // error-disable-submit
    $: {
        errorDisableSubmit = $$props["error-disable-submit"] !== null && $$props["error-disable-submit"] !== undefined;
        if (submitButton) {
            if (!errorDisableSubmit) {
                submitButton.disabled = false;
            } else {
                checkSubmitButtonEnabled();
            }
        }
    }

    export function setValidationHandler(handler) {
        alert("toto");
    }

    onMount(() => {
        // form.parentElement.setValidationHandler = (handler) => {
        //     validationHandler = handler;
        // };
        // form.parentElement.dispatchEvent(new CustomEvent("mounted", { bubbles: true }));
        submitButton = form.querySelector('[type="submit"]');

        if (!submitButton) {
            throw new Error("There is no submit button on this form!");
        }
    });
</script>

<form novalidate on:submit|preventDefault|stopPropagation={handleSubmit} on:input={handleInput} on:change={handleChange} bind:this={form}>
    <slot />
</form>
