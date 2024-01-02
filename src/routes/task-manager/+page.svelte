<script>
	import TaskList from "../../components/task-manager/TaskList.svelte";
	import {taskListStore} from "../../stores/tasks";	
	export let data;
</script>

<div class="p-10 h-full felx-it">
	<div class="text-white text-2xl mb-6">{data.page.appName} - {data.page.content}</div>
	<button class="text-xl mb-3 text-white font-bold cursor-pointer hover:underline flex items-start"
			on:click={taskListStore.addList}>
		+ Add List
	</button>
	<div class="flex-it h-full flex-1"> 
		<div class="flex-it flex-row rounded-xl h-full">
			{#each $taskListStore as item,i  (item.id)}
				<TaskList 
				list = {item}
				listIdx = {i}
				/>
			{/each}
		</div>
	</div>
</div>