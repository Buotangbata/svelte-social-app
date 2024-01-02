
import { writable, get } from "svelte/store";
const defData= [
    {id: "l-1", text: "List 1", items: [{id: "t-01", text: "Task 1"},{id: "t-02", text: "Task 2"},{id: "t-3", text: "Task 03"}]},
    {id: "l-2", text: "List 2", items: [{id: "t-11", text: "Task 4"},{id: "t-12", text: "Task 5"},{id: "t-13", text: "Task 6"}]},
    {id: "l-3", text: "List 3", items: [{id: "t-21", text: "Task 7"},{id: "2t-2", text: "Task 8"},{id: "t-23", text: "Task 9"}]},
  ];
function createStore(){
    const stored = JSON.parse(localStorage.getItem("task-manager-store"));
    const _taskList = stored? stored:defData;
    const taskList  = writable(_taskList);

    return {
      subscribe: taskList.subscribe,
      updateTask:(task,idx)=>{
          const taskidx = get(taskList)[idx].items.findIndex(item => item.id === task.id);
          if(taskidx !== null){
              taskList.update((list) => {
                  list[idx].items[taskidx].text =task.text;
                  return list;
              });
          }
      },
      updateList:(newText,idx)=>{
        taskList.update((list)=>{
          list[idx].text = newText;
          return list;
        })
      },
      addList: ()=>{
        taskList.update((list)=>{
          return [...list, {
            id: new Date().toISOString(),
            text:"New list "+ ++list.length ,
            items: [{id: new Date().toISOString(), text: "Task 1"}]
          }]
        })
        console.log(get(taskList))
      },
      addTask: (listIdx)=>{
        taskList.update((list)=>{
          const {items} =  list[listIdx];
          list[listIdx].items= [
            ...items, {
              id: new Date().toISOString(), 
              text: "New Task"}];
          return list;
        })
      },
      moveTask: (srcData, newIdx)=>{

        taskList.update((list)=>{
          const [task] = list[srcData.listIdx].items.splice(srcData.taskIdx,1);
          list[newIdx].items.push(task);
          return list;
        });
        console.log("dropping to list :" + newIdx);
        console.log("Source list idx:" + srcData);
      },
      removeTask: (listIdx,taskIdx)=>{
        taskList.update((list)=>{
          list[listIdx].items.splice(taskIdx,1);
          return list;
        });
      },

      removeList: (listIdx)=>{
        taskList.update((list)=>{
          list.splice(listIdx,1);
          return list;
        });
      }
}
}

export const taskListStore = createStore(); 

taskListStore.subscribe((list)=>{
  localStorage.setItem("task-manager-store",JSON.stringify(list));
});