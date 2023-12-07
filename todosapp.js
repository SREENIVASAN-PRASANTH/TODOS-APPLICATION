let todoItemsContainer = document.getElementById("todoItemsContainer");
let saveTodoButtonEl = document.getElementById("saveTodoButton");


let todoList = getTodoListFromLocalStorage();

saveTodoButtonEl.onclick = function(){
  localStorage.setItem("todoList",JSON.stringify(todoList));
 
}

function getTodoListFromLocalStorage(){
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);

  if (parsedTodoList === null){
    return [];
  }
  else{
    return parsedTodoList;
  }
}


let todoCount = todoList.length;

function ondeleteTodo(todoId){
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);

  let deleteElIndex = todoList.findIndex(function(eachTodo){
        let eachtodoId = "todo" + eachTodo.uniqueno;
        if (eachtodoId === todoId){
          return true;
        }
        else{
          return false;
        }
  });
  todoList.splice(deleteElIndex,1);
}

function onToDoStatusChanged(checkboxId,labelId){
    let checkboxEl = document.getElementById(checkboxId);
    let labelEl = document.getElementById(labelId);
    
    labelEl.classList.toggle('checked');
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueno
    let labelId = "label" + todo.uniqueno;
    let todoId = "todo" + todo.uniqueno;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.classList.add("checkbox-input");

  inputElement.onclick = function(){
    onToDoStatusChanged(checkboxId,labelId);
  };

  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  labelElement.id = labelId;
  labelContainer.appendChild(labelElement);


  
  

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function(){
    ondeleteTodo(todoId);
  }
  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}

let addTodoButton = document.getElementById("addTodoButton");

function onAddTodo(){
  let userInputEl = document.getElementById("todoUserInput");
  let userInputValue = userInputEl.value;

  if (userInputValue === ""){
    alert("Enter a Valid Text");
    return;
  }
  todoCount = todoCount + 1;

  let newTodo = {
    text : userInputValue,
    uniqueno: todoCount
  }
  todoList.push(newTodo);

  createAndAppendTodo(newTodo);
  userInputEl.value = "";
}

addTodoButton.onclick = function(){
  onAddTodo();
}