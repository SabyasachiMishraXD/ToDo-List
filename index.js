let mainTodoList = document.querySelector(".todo-list-elem")
let inputValue = document.getElementById("inputValue")
let myBtn = document.querySelector(".btn")


const getFromLocalStorage = () =>{
        return JSON.parse(localStorage.getItem('dailyTodo'))
}

const addTodoListLocalStorage = (todoListArr) => {
    return localStorage.setItem('dailyTodo', JSON.stringify(todoListArr))
}

var todoListArr = getFromLocalStorage() || []

const addTodoDynamic = (curr)=>{
    const divElement = document.createElement("div")
    divElement.classList.add("todo-item")
    divElement.innerHTML = `<li>${curr}</li>  <button class="deleteBtn">Delete</button> `
    mainTodoList.append(divElement)
}

const todoButtonHandler = (e) =>{
    e.preventDefault();//form has an default behavior to submit...so we use preventDefault method to prevent.
    const todoListVal = inputValue.value.trim()
    inputValue.value = "" //after adding item, clear the input field.
    if(todoListVal !== "" && !todoListArr.includes(todoListVal)){
        todoListArr.push(todoListVal)
        todoListArr = [...new Set(todoListArr)] //converted to set...and then that into array. It creates a multi level array..we dont need that so we used spread operator to simplify.
        localStorage.setItem('dailyTodo', JSON.stringify(todoListArr))


        addTodoDynamic(todoListVal)
        
    }
}

const showTodoList = () => {
    console.log(todoListArr)
    todoListArr.forEach((curr) => {
        addTodoDynamic(curr);
    });
}
showTodoList();

const deleteTodoDynamic = (e) => {
    let removeTarget = e.target
    let todoListContent = removeTarget.previousElementSibling.textContent;
    console.log(todoListContent)
    let parentElement = removeTarget.parentElement
    console.log(parentElement)
    todoListArr = todoListArr.filter((curr) =>{
        return curr!== todoListContent.toLowerCase();   
    })
    addTodoListLocalStorage(todoListArr)
    parentElement.remove()
}

mainTodoList.addEventListener("click",(e) => {
    e.preventDefault();
    console.log(e.target);
    if(e.target.classList.contains("deleteBtn")){
        deleteTodoDynamic(e);
    }
});

myBtn.addEventListener("click", (e) => {
    todoButtonHandler(e);
;})