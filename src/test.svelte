<svelte:options tag="my-test" />

<script>
    import { onMount } from "svelte";

    let tasks = [];
    let informEl;

    async function refreshTasks() {
        const result = await fetch("https://61ffdd875e1c4100174f6fe7.mockapi.io/api/task");
        tasks = await result.json();
    }

    function handleAddSuccess() {
        refreshTasks();
    }
    onMount(() => {
        informEl.validationHandler = ({ values }) => {};
        refreshTasks();
    });

    function handleDeleteSubmit({ detail: { values } }) {
        // Hide the deleted task
        tasks = tasks.map((t) => (t.id !== values.id ? t : { ...t, hidden: true }));
    }

    function handleDeleteError({ detail: { values } }) {
        // Error: unhide the deleted task
        tasks = tasks.map((t) => (t.id !== values.id ? t : { ...t, hidden: false }));
    }

    function handleAdd({ detail: { values } }) {
        tasks = [...tasks, { ...values, id: tasks[tasks.length - 1].id + 1, createdAt: new Date(), new: true }];
    }

    function handleAddError({ detail: { values } }) {
        tasks = tasks.filter((t) => !t.new);
    }
</script>

<div>
    <inform-el
        action="https://61ffdd875e1c4100174f6fe7.mockapi.io/api/task"
        error-disable-submit
        on:requestSuccess={handleAddSuccess}
        on:submit={handleAdd}
        on:requestError={handleAddError}
        bind:this={informEl}
    >
        <form>
            <inform-field>
                <input type="email" name="title" required />
            </inform-field>
            <inform-field>
                <input type="radio" name="field" value="val1" />
                <input type="radio" name="field" value="val2" />
            </inform-field>
            <button type="submit">Create task</button>
        </form>
    </inform-el>

    {#each tasks as task}
        <div class="task-container" class:hidden={task.hidden}>
            <div class="task-id">
                {task.id}
            </div>
            <div class="task-createdat">
                {task.createdAt}
            </div>
            <div class="task-title">
                {task.title}
            </div>
            {#if !task.new}
                <div class="task-done">
                    <inform-el action={`https://61ffdd875e1c4100174f6fe7.mockapi.io/api/task/${task.id}`} method="PUT" id="toto">
                        <form>
                            <inform-field submit-on-change>
                                <input type="checkbox" name="done" checked={task.done} />
                            </inform-field>
                        </form>
                    </inform-el>
                </div>
                <inform-el action={`https://61ffdd875e1c4100174f6fe7.mockapi.io/api/task/${task.id}`} method="DELETE" on:submit={handleDeleteSubmit} on:requestError={handleDeleteError}>
                    <form>
                        <input type="hidden" value={task.id} name="id" />
                        <button type="submit">X</button>
                    </form>
                </inform-el>
            {/if}
        </div>
    {/each}
</div>

<style>
    .task-container {
        display: flex;
        gap: 10px;
        max-width: 800px;
    }
    .task-title {
        flex: 1;
    }

    .hidden {
        display: none;
    }
</style>
