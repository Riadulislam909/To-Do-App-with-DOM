//select element and asign to variable

let newTask = document.querySelector("#new-task");
let form = document.querySelector("form");
let todoUl = document.querySelector("#items");
let completeUl = document.querySelector(".complete-list ul");

//function

let createTask = function(task){
    let listItem = document.createElement('li');
    let checkBox = document.createElement('input');
    let label = document.createElement('label');

    label.innerText = task;
    checkBox.type = 'checkbox';

    listItem.appendChild(checkBox);
    listItem.appendChild(label);

    return listItem;
}

let addTask = function(event){
    event.preventDefault();
    let listItem = createTask(newTask.value);
    todoUl.appendChild(listItem);
    newTask.value = "";

    //bind the new list to the incomplete list
    bindInCompleteItems(listItem, completeTask);

}

let bindInCompleteItems = function(taskItem, checkboxClick){
    let checkBox = taskItem.querySelector("input[type ='checkbox']");
    checkBox.onchange = checkboxClick;

}
let completeTask = function(){
    let listItem = this.parentNode;
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete";
    listItem.appendChild(deleteBtn);

    let checkBox = listItem.querySelector("input[type='checkbox']");
    checkBox.remove();

    completeUl.appendChild(listItem);

    //for delete purpose
    bindCompleteItems(listItem, deleteTask);

}
let bindCompleteItems = function(taskItem, deleteButtonClick){
    let deleteButton = taskItem.querySelector(".delete");
    deleteButton.onclick = deleteButtonClick;

}
let deleteTask = function(){
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}
let len1 = todoUl.children.length;
let len2 = completeUl.children.length;

for(let i=0; i<len1; i++){
    bindInCompleteItems(todoUl.children[i], completeTask);
}
for(let i=0; i<len2; i++){
    bindCompleteItems(completeUl.children[i], deleteTask);
}

form.addEventListener('submit', addTask);