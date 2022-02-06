<svelte:options tag="my-test" />

<script>
    import { onMount } from "svelte";

    let tasks = [];
    let container;

    async function refreshTasks() {
        const result = await fetch("https://61ffdd875e1c4100174f6fe7.mockapi.io/api/task");
        tasks = await result.json();
    }

    function onRequestEnd() {
        refreshTasks();
    }

    function onSubmit({ detail: { values } }) {
        console.log({ values });
    }
    onMount(() => {
        refreshTasks();
        container.addEventListener("request-end", onRequestEnd);
        container.addEventListener("submit", onSubmit);

        return () => {
            container.removeEventListener("submit", onSubmit);
            container.removeEventListener("request-end", onRequestEnd);
        };
    });
</script>

<div bind:this={container}>
    <inform-el action="https://61ffdd875e1c4100174f6fe7.mockapi.io/api/task">
        <form>
            <inform-field>
                <input type="text" name="title" required />
            </inform-field>
            <button type="submit">Create task</button>
        </form>
    </inform-el>

    {#each tasks as task}
        <div class="task-container">
            <div class="task-id">
                {task.id}
            </div>
            <div class="task-createdat">
                {task.createdAt}
            </div>
            <div class="task-title">
                {task.title}
            </div>
            <div class="task-done">
                <inform-el action={`https://61ffdd875e1c4100174f6fe7.mockapi.io/api/task/${task.id}`} method="PUT">
                    <form>
                        <inform-field submit-on-change>
                            <input type="checkbox" name="done" checked={task.done} />
                        </inform-field>
                    </form>
                </inform-el>
            </div>
            <inform-el action={`https://61ffdd875e1c4100174f6fe7.mockapi.io/api/task/${task.id}`} method="DELETE">
                <form>
                    <button type="submit">X</button>
                </form>
            </inform-el>
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
</style>
