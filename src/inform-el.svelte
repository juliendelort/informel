<svelte:options tag="inform-el" />

<script>
    export let error_disable_submit;
    import { onMount } from "svelte";
    import { get_current_component } from "svelte/internal";

    let form;
    let submitButton;
    let host = get_current_component();
    let container;
    let defaultSlot;
    let errorDisableSubmit;

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

    function checkValidity() {
        const errors = host.validationHandler ? host.validationHandler({ values: getFormValues() }) : null;

        const elements = [...form.elements];

        elements.forEach((element) => {
            const informField = element.closest("inform-field");
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
            submitButton.disabled = !valid;
        }

        return valid;
    }

    // error_disable_submit
    $: {
        errorDisableSubmit = error_disable_submit !== null && error_disable_submit !== undefined;
        if (submitButton) {
            if (!errorDisableSubmit) {
                submitButton.disabled = false;
            } else {
                checkValidity();
            }
        }
    }

    function initSlot() {
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
        setTimeout(() => checkValidity(), 0);
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
