<script>
    export let label = "";
    import { onMount, onDestroy } from "svelte";

    let hostElement;
    let labelElement;
    let controlElement;
    let errorMessage;
    let labelClass;
    let errorClass;

    function handleInput() {
        hostElement.dispatchEvent(new CustomEvent("input", { detail: null, bubbles: true }));
    }

    function handleChange() {
        hostElement.dispatchEvent(new CustomEvent("change", { detail: null, bubbles: true }));
    }

    function handleInvalid(e) {
        console.log("!!!invalid", e.target);
        errorMessage = e.target.validationMessage;
    }

    onMount(() => {
        hostElement = labelElement.parentNode;
        controlElement = labelElement.querySelector("[name]");

        if (!controlElement) {
            console.log("label", labelElement);
            throw new Error("<inform-field> must have one descendant with a name attribute.");
        }

        console.log({ controlElement });
        controlElement.addEventListener("invalid", handleInvalid);
    });

    onDestroy(() => {
        controlElement.removeEventListener("invalid", handleInvalid);
    });

    // label-class
    $: {
        labelClass = $$props["label-class"] ?? "";
    }

    // error-class
    $: {
        errorClass = $$props["error-class"] ?? "";
    }
</script>

<label on:input|stopPropagation={handleInput} on:change|stopPropagation={handleChange} bind:this={labelElement} class={labelClass}>
    {label}
    <slot />
    <span class="form-field-error" role="alert">{errorMessage}</span>
</label>

<style>
    :global(.form-field-error) {
        display: none;
        color: red;
    }
    :global(.touched :invalid ~ .form-field-error) {
        display: initial;
    }
</style>
