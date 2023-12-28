<script>
    let count = 0;
    $: {
        if(count > 10){
            console.log("We are the champion");
        }
    }

    $: doubled = count * 2;
</script>

<div class="text-white">
    <div>
        This is a task manager page - {count}
    </div>
    <div>
        The doubled value is - {doubled}
    </div>
    
    <button on:click={()=>{
        count++;
    }}>
        Increment by 1
    </button>
</div>