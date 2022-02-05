<svelte:options tag="inform-field" />

<script>
    export let label = "";
    export let error = "";
    import { onMount } from "svelte";
    import { get_current_component } from "svelte/internal";

    let host = get_current_component();
    let rootElement;
    let controlElement;

    function handleInput() {
        host.dispatchEvent(new CustomEvent("input", { detail: null, bubbles: true, composed: true }));
    }

    function handleChange() {
        host.dispatchEvent(new CustomEvent("change", { detail: null, bubbles: true, composed: true }));
    }

    onMount(() => {
        const elements = rootElement.querySelector("slot").assignedElements();

        // Find control element
        elements.some((e) => {
            if (e.name) {
                controlElement = e;
                return true;
            } else {
                const c = e.querySelector("[name]");
                if (c) {
                    controlElement = c;
                    return true;
                }
            }
        });

        if (!controlElement) {
            throw new Error("<inform-field> must have one descendant with a name attribute.");
        }

        // controlElement.addEventListener("invalid", handleInvalid);
        host.setAttribute("name", controlElement.name);
    }); // controlElement.removeEventListener("invalid", handleInvalid);
</script>

{#if label}
    <label on:input={handleInput} on:change={handleChange} bind:this={rootElement}>
        {label}
        <slot />
        {#if error}
            <span class="form-field-error" role="alert">{error}</span>
        {/if}
    </label>
{:else}
    <div on:input={handleInput} on:change={handleChange} bind:this={rootElement}>
        {label}
        <slot />
        {#if error}
            <span class="form-field-error" role="alert">{error}</span>
        {/if}
    </div>
{/if}

<style>
    .form-field-error {
        display: none;
        color: red;
    }
    :host(.touched) .form-field-error {
        display: initial;
    }
</style>
