<script>
    export let errorMessage = "";
    export let touched = null;
    export let submitOnChange = null;
    import { onMount } from "svelte";
    import { get_current_component } from "svelte/internal";

    let host = get_current_component();
    let rootElement;
    let errorSlot;
    let errorSlotHasContent;
    let touchedIsPresent;
    let submitOnChangeIsPresent;

    $: {
        // Update error attribute
        if (errorMessage && touchedIsPresent) {
            host.setAttribute("error", "");
        } else {
            host.removeAttribute("error", "");
        }

        // Update slot content when errorMessage or touched has changed
        updateErrorSlot();
    }

    $: {
        touchedIsPresent = touched !== null && touched !== undefined;
    }

    $: {
        submitOnChangeIsPresent = submitOnChange !== null && submitOnChange !== undefined;
    }

    function handleInput() {
        host.dispatchEvent(new CustomEvent("input", { detail: null, bubbles: true, composed: true }));
    }

    function handleChange(e) {
        host.dispatchEvent(new CustomEvent("change", { detail: null, bubbles: true, composed: true }));
        if (submitOnChangeIsPresent) {
            host.dispatchEvent(new CustomEvent("customsubmit", { detail: { submitter: e.target }, bubbles: true, composed: true }));
        }
    }

    function updateErrorSlot() {
        // Update slot content
        const errorSlotChild = errorSlot?.assignedElements()?.[0];
        errorSlotHasContent = !!errorSlotChild;

        if (errorSlotChild && touchedIsPresent) {
            errorSlotChild.textContent = errorMessage;
        }
    }

    onMount(() => {
        errorSlot = rootElement.querySelector('slot[name="error"]');

        errorSlot.addEventListener("slotchange", updateErrorSlot);
        return () => {
            errorSlot.removeEventListener("slotchange", updateErrorSlot);
        };
    });
</script>

<div on:input={handleInput} on:change={handleChange} bind:this={rootElement}>
    <slot />
    {#if errorMessage && !errorSlotHasContent && touchedIsPresent}
        <div class="form-field-error" role="alert">{errorMessage}</div>
    {/if}
    <slot name="error" />
</div>

<style>
    .form-field-error {
        color: var(--error-color, red);
        margin: var(--error-margin, 0 0 0 0);
        font-size: var(--error-font-size, 1rem);
        font-family: var(--error-font-family, 1rem);
        display: var(--error-display, block);
    }
</style>
