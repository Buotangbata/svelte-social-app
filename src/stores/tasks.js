
import { writable, get } from "svelte/store";
const defData= [
    {id: "l-1", text: "List 1", items: [{id: "t-1", text: "Task 1"},{id: "t-2", text: "Task 2"},{id: "t-3", text: "Task 3"}]},
    {id: "l-2", text: "List 2", items: [{id: "t-1", text: "Task 4"},{id: "t-2", text: "Task 5"},{id: "t-3", text: "Task 6"}]},
    {id: "l-3", text: "List 3", items: [{id: "t-1", text: "Task 7"},{id: "t-2", text: "Task 8"},{id: "t-3", text: "Task 9"}]},
  ];
function createStore(){
    const taskList  = writable(defData);
    return {
      subscribe: taskList.subscribe,
      updateTask:(task,idx)=>{
          const taskidx = get(taskList)[idx].items.findIndex(item => item.id === task.id);
          if(taskidx !== null){
              alert(`Update on task in index: ${taskidx}`);
              taskList.update((list) => {
                  list[idx].items[taskidx].text =task.text;
                  return list;
              });
          }
      },
      addList: ()=>{
        taskList.update((list)=>{
          return [...list, {
            id:"l-"+ ++list.length,
            text:"New list "+ ++list.length ,
            items: [{id: "t-1", text: "Task 1"}]
          }]
        })
        console.log(get(taskList))
      },
      addTask: (listIdx)=>{
        taskList.update((list)=>{
          const {items} =  list[listIdx];
          list[listIdx].items= [
            ...items, {
              id: "t-"+ ++items.length, 
              text: "New Task"}];
          return list;
        })
      }
    };
}

export const taskListStore = createStore();