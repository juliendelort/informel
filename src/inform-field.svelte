<script>
    export let errorMessage = '';
    export let touched = null;
    export let submitOnChange = null;
    export let touchedOnInput = null;
    import { onMount } from 'svelte';
    import { get_current_component } from 'svelte/internal';

    let host = get_current_component();
    let rootElement;
    let errorSlot;
    let errorSlotHasContent;
    let touchedIsPresent;
    let submitOnChangeIsPresent;
    let touchedOnInputIsPresent;
    let errorId = 'informel-err-el-screen-reader-' + Math.random().toString(36);
    let slotDisplayBackup;

    $: {
        // Update error attribute
        if (errorMessage && touchedIsPresent) {
            host.setAttribute('error', '');

            const errorEl = host.querySelector('.informel-err-el-screen-reader');
            if (errorEl) {
                errorEl.textContent = errorMessage;
            }

            const form = host.closest('form');
            if (form) {
                const formElement = [...form.elements].find((el) => host.contains(el));
                formElement?.setAttribute('aria-invalid', 'true');
                formElement?.setAttribute('aria-describedby', errorId);
            }
        } else {
            host.removeAttribute('error', '');

            const errorEl = host.querySelector('.informel-err-el-screen-reader');
            if (errorEl) {
                errorEl.textContent = '';
            }

            const form = host.closest('form');
            if (form) {
                const formElement = [...form.elements].find((el) => host.contains(el));
                formElement?.removeAttribute('aria-invalid');
                formElement?.removeAttribute('aria-describedby');
            }
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

    $: {
        touchedOnInputIsPresent = touchedOnInput !== null && touchedOnInput !== undefined;
    }

    function handleChange(e) {
        host.setAttribute('touched', '');
        if (submitOnChangeIsPresent) {
            host.dispatchEvent(new CustomEvent('customsubmit', { detail: { submitter: e.target }, bubbles: true, composed: true }));
        }
    }

    function handleInput(e) {
        if (touchedOnInputIsPresent) {
            host.setAttribute('touched', '');
        }
    }

    function updateErrorSlot() {
        // Update slot content
        const errorSlotChild = errorSlot?.assignedElements()?.[0];
        errorSlotHasContent = !!errorSlotChild;

        if (errorSlotChild && touchedIsPresent) {
            errorSlotChild.textContent = errorMessage;
            if (errorMessage) {
                errorSlotChild.style.display = slotDisplayBackup;
            } else {
                errorSlotChild.style.display = 'none';
            }
        }
    }

    onMount(() => {
        errorSlot = rootElement.querySelector('slot[name="error"]');

        errorSlot.addEventListener('slotchange', updateErrorSlot);

        const errorSlotChild = errorSlot?.assignedElements()?.[0];
        if (!!errorSlotChild) {
            slotDisplayBackup = getComputedStyle(errorSlotChild).display;
            errorSlotChild.style.display = 'none';
        }

        // Generate an invisible error message for screen readers, for using with aria-describedby
        const errEl = document.createElement('span');
        errEl.id = errorId;
        errEl.classList.add('informel-err-el-screen-reader');

        // sr-only style
        errEl.style =
            'clip: rect(1px, 1px, 1px, 1px); clip-path: polygon(0px 0px, 0px 0px, 0px 0px);-webkit-clip-path: polygon(0px 0px, 0px 0px, 0px 0px);height: 0;overflow: hidden;position: absolute;width: 0;';
        host.appendChild(errEl);

        return () => {
            host.querySelector('.informel-err-el-screen-reader')?.remove();
            errorSlot.removeEventListener('slotchange', updateErrorSlot);
        };
    });
</script>

<div on:change={handleChange} on:input={handleInput} bind:this={rootElement}>
    <slot />
    {#if errorMessage && !errorSlotHasContent && touchedIsPresent}
        <div class="form-field-error" role="alert">{errorMessage}</div>
    {/if}
    <slot name="error" />
</div>

<style>
    .form-field-error {
        color: var(--error-color, red);
        margin: var(--error-margin, 5px 0 0 0);
        font-size: var(--error-font-size, 1rem);
        font-family: var(--error-font-family, inherit);
        display: var(--error-display, block);
    }
</style>
