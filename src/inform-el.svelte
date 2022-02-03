<script>
    let form;
    let container;

    function getFormValues() {
        return Object.fromEntries(new FormData(form));
    }
    const handleSubmit = () => {
        container.dispatchEvent(new CustomEvent("submit", { detail: { values: getFormValues() }, bubbles: true }));
    };
</script>

<div bind:this={container}>
    <form novalidate on:submit|preventDefault|stopPropagation={handleSubmit} bind:this={form}>
        <slot />
    </form>
</div>

<style>
    form {
        background: red;
    }
</style>
