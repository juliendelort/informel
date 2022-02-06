<script>
    export let error = "";
    export let submitOnChange = null;
    import { onMount } from "svelte";
    import { get_current_component } from "svelte/internal";

    let host = get_current_component();
    let rootElement;
    let errorSlot;
    let errorSlotHasContent;

    function getSubmitOnChange() {
        return submitOnChange !== null && submitOnChange !== undefined;
    }

    function handleInput() {
        host.dispatchEvent(new CustomEvent("input", { detail: null, bubbles: true, composed: true }));
    }

    function handleChange(e) {
        host.dispatchEvent(new CustomEvent("change", { detail: null, bubbles: true, composed: true }));
        if (getSubmitOnChange()) {
            host.dispatchEvent(new CustomEvent("customsubmit", { detail: { submitter: e.target }, bubbles: true, composed: true }));
        }
    }

    function updateErrorSlot(err = error) {
        const errorSlotChild = errorSlot?.assignedElements()?.[0];
        errorSlotHasContent = !!errorSlotChild;

        if (errorSlotChild) {
            errorSlotChild.textContent = error;
        }
    }

    onMount(() => {
        errorSlot = rootElement.querySelector('slot[name="error"]');

        errorSlot.addEventListener("slotchange", updateErrorSlot);
        return () => {
            errorSlot.removeEventListener("slotchange", updateErrorSlot);
        };
    });

    $: {
        // On error, update slot
        updateErrorSlot(error);
    }
</script>

<div on:input={handleInput} on:change={handleChange} bind:this={rootElement}>
    <slot />
    {#if error && !errorSlotHasContent}
        <span class="form-field-error" role="alert">{error}</span>
    {/if}
    <slot name="error" />
</div>

<style>
    .form-field-error {
        display: none;
        color: red;
    }
    :host(.touched) .form-field-error {
        display: block;
    }
</style>
