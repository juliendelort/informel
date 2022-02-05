<svelte:options tag="inform-el" />

<script>
    let errorDisableSubmit;
    import { onMount, onDestroy } from "svelte";
    import { get_current_component } from "svelte/internal";

    let form;
    let submitButton;
    let host = get_current_component();
    let container;

    function getFormValues() {
        return Object.fromEntries(new FormData(form));
    }
    function handleSubmit(e) {
        e.preventDefault();
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

    function checkValidity() {
        // let hasCustomError = false;

        const errors = host.validationHandler ? host.validationHandler({ values: getFormValues() }) : null;

        const elements = [...form.elements];

        elements.forEach((element) => {
            // hasCustomError |= !!errors?.[element.name];
            const informField = host.querySelector(`inform-field[name="${element.name}"]`);
            if (informField) {
                element.setCustomValidity(errors?.[element.name] ?? "");
                informField.setAttribute("error", errors?.[element.name] ?? element.validationMessage);
            }
        });

        const valid = form.checkValidity();
        if (!valid) {
            host.classList.add("invalid");
        } else {
            host.classList.remove("invalid");
        }

        if (errorDisableSubmit) {
            console.log({ errorDisableSubmit, submitButton, valid });
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

    onMount(() => {
        form = container.querySelector("slot").assignedElements()[0];
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
    });

    onDestroy(() => {
        form.removeEventListener("change", handleChange);
        form.removeEventListener("input", handleInput);
        form.removeEventListener("submit", handleSubmit);
    });
</script>

<div bind:this={container}>
    <slot />
</div>
