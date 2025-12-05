const taskInput = document.getElementById("taskInput");
const searchInput = document.getElementById("searchInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks"))||[];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(searchText =""){
    taskList.innerHTML = "";

    tasks.filter(task=>task.text.toLowerCase().includes(searchText.toLowerCase()))
    .forEach(task=>{
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = task.text;
        if(task.completed){
            span.classList.add("completed");
        }
        span.onclick=()=> toggleTask(task.id);

        const actions = document.createElement("div");
        actions.className = "actions";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick=()=> deleteTask(task.id);
        actions.appendChild(deleteBtn);
        li.appendChild(span);
        li.appendChild(actions);
        taskList.appendChild(li);
    });
}
addBtn.onclick = () => {
    const text = taskInput.value.trim();
    if(text===""){
        alert("Task cannot be empty!");
        return;
    }
    const newTask = {
        id: Date.now(),
        text,
        completed:false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskInput.value="";
};

function toggleTask(id){
    tasks = tasks.map(task=>
        task.id === id ? { ...task, completed: !task.completed} :task
    );
    saveTasks();
    renderTasks(searchInput.value);
}

function deleteTask(id){
    tasks = tasks.filter(task=> task.id !==id);
    saveTasks();
    renderTasks(searchInput.value);
}
searchInput.oninput = () => {
    renderTasks(searchInput.value);
};
renderTasks();