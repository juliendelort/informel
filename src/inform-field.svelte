<script>
    let label;

    function handleInput() {
        label.parentNode.dispatchEvent(new CustomEvent("input", { detail: null, bubbles: true }));
    }

    function handleChange() {
        label.parentNode.dispatchEvent(new CustomEvent("change", { detail: null, bubbles: true }));
    }
</script>

<label on:input|stopPropagation={handleInput} on:change|stopPropagation={handleChange} bind:this={label}>
    <slot />
    <span class="form-field-error" role="alert" />
</label>

<style>
    :global(.form-field-error) {
        display: none;
        color: red;
    }
    :global(.touched :invalid ~ .form-field-error) {
        display: initial;
    }

    :global(.form-field-error:after) {
        content: var(--error-message, "Error");
        display: inline;
    }
</style>
