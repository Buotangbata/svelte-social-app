<script>
    import {createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();
    export let value;
    let edit = false;
</script>

{#if edit}
    <div class="flex-it">
        <textarea bind:value/>
        <button 
        on:click={()=>{
            edit = false; 
            dispatch("close", {value});
            }} 
        class="flex-underline">
            close
        </button>
    </div>
    
{:else}
    <button on:click={()=>{
        edit = true;
    }}>
        <slot/>
    </button>
{/if}

        