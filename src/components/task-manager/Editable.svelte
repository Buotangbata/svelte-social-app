<script>
    let edit = false;
</script>

{#if edit}
    <div class="flex-it">
        <textarea/>
        <button 
        on:click={()=>{
            edit = false; 
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

        