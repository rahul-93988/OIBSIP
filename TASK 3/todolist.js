let todoItemsContainer = document.getElementById("todoitemscontainer");
let saveButton = document.getElementById("saveButton");

saveButton.onclick = function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}

function getSavedItems(){
    let items = localStorage.getItem("todoList");
    let parsedItems = JSON.parse(items);
    if (parsedItems===null){
        return [];
    }
    else{
        return parsedItems;
    }
}
let todoList = getSavedItems();

function todoStatusChange(labelId,labelTextId){
    let todoChangedElement = document.getElementById(labelId);
    let labelTextElement = document.getElementById(labelTextId);
    //let checked = todoChangedElement.checked;
    /*if (checked === true){
        labelTextElement.classList.add("todoChangeStatus");
    }
    else{
        labelTextElement.classList.remove("todoChangeStatus");
    }*/
    labelTextElement.classList.toggle("todoChangeStatus");
    let itemIndex = todoList.findIndex(function(eachitem){
        let eachItemId = "input"+eachitem.no;
        if(eachItemId===labelId){
            return true;
        }
        else{
            return false;
        }
    });
    let object = todoList[itemIndex];
    if (object.isChecked===true){
        object.isChecked=false;
    }
    else{
        object.isChecked=true;
    }
}

function deleteTodo(todoId){
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let itemIndex = todoList.findIndex(function(eachItem){
        let eachItemId = "todo"+eachItem.no;
        if(eachItemId===todoId){
            return true;
        }
        else{
            return false;
        }
    });
    todoList.splice(itemIndex,1);
}

function createTodoItem(todo){
    let labelId = "input"+todo.no;
    let labelTextId = "label"+todo.no;
    let todoId = "todo"+todo.no;

    let todoItem = document.createElement("li");
    todoItem.id = todoId;
    todoItem.classList.add("d-flex","flex-row","listitem");
    todoItemsContainer.appendChild(todoItem);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = labelId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox");
    inputElement.onclick = function() {
        todoStatusChange(labelId,labelTextId);
    }
    todoItem.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("labelcontainer","d-flex","flex-row");
    todoItem.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for",labelId);
    labelElement.id = labelTextId;
    labelElement.classList.add("labeltext");
    if(todo.isChecked===true){
        labelElement.classList.add("todoChangeStatus");
    }
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("del-container");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular","fa-trash-can");
    deleteIcon.onclick = function(){
        deleteTodo(todoId);
    }
    deleteContainer.appendChild(deleteIcon);
}

for (let i of todoList){
    createTodoItem(i);
}

let uniqueno = todoList.length;
function addTodoItem(){
    let userinput = document.getElementById("userInput");
    userinputvalue = userinput.value;
    if (userinputvalue===""){
        alert("Enter a valid String");
        return;
    }
    uniqueno = uniqueno+1;
    newTodo ={
            text : userinputvalue,
            no : uniqueno,
            isChecked: false
        }
    todoList.push(newTodo);

    createTodoItem(newTodo);
    userinput.value = "";
}

let button = document.getElementById("addButton");
button.onclick = function(){
    addTodoItem()
}