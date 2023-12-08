import './style.css';
import { todoList, makeTodo, changePriority, completeTodo, removeTodo, changeCategory } from './todo';
import { categories, makeCategory, removeCategory } from './categories';

// -- Todo Min Requirments --
// Title
// Description
// dueDate
// Priority
// -- Todo Other Ideas --
// Notes
// Checklist

// -- Project Lists (Categories) --
// Start with Default Category
// User can create additional categories
// Ability to assign todos into categories

// -- Modules --
// Creating New Todo
// Marking Todos Complete
// Changing Priorities
// DOM Manipulation

// -- UI --
// view all projects
// view all todos in each project (probably just title, duedate, changing color for diff priorities)
// expand single todo to see/edit its details
// delete a todo

// test subjects
const makeBacon = makeTodo('make bacon', 'cupiditate dolor esse veritatis.', '2023-12-10', 'High', 'Default');
const makeHam = makeTodo('make ham', 'make it greasy', '2023-12-15', 'Low', 'Kitchen');
const makeChicken = makeTodo('make chicken', 'make it cold', '2024-04-10', 'Medium', 'Kitchen');

makeCategory('Kitchen');
changePriority('make bacon', 'Low');
// removeCategory('kitchen');
changeCategory('make bacon', 'Kitchen');

console.log(todoList);
console.log(categories);

// selectors
const addItemButton = document.querySelector('#addItem');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const due = document.querySelector('#due');
const priority = document.querySelector('#priority');
const category = document.querySelector('#category');
const filterCategory = document.querySelector('#filterCategory');
const main = document.querySelector('main');

// category handling
(function displayCategories() {

    for (let i = 0; i < categories.length; i++) {
        const categoryOption = document.createElement('option');
        category.appendChild(categoryOption);
        categoryOption.textContent = categories[i];
        categoryOption.setAttribute('value', categories[i]);

        const filterOption = document.createElement('option');
        filterCategory.appendChild(filterOption);
        filterOption.textContent = categories[i];
        filterOption.setAttribute('value', categories[i]);
    };
})();

// new task handling
const newTask = () => {

    if (title.value === '') {
        title.style.backgroundColor = 'var(--required)';
    }
    if (description.value === '') {
        description.style.backgroundColor = 'var(--required)';
    }
    if (due.value === '') {
        due.style.backgroundColor = 'var(--required)';
    };

    if (title.value === '' || description.value === '' || due.value === '') {
        return;
    }

    makeTodo(title.value, description.value, due.value, priority.value, category.value);

    title.value = '';
    description.value = '';
    due.value = '';
    title.style.backgroundColor = null;
    description.style.backgroundColor = null;
    due.style.backgroundColor = null;

    console.log(todoList, 'new task handling');

    clearDisplay();
    displayTasks();

};

// task display
function displayTasks() {
    
    for (let i = 0; i < todoList.length; i++) {

        const task = document.createElement('div');
        task.setAttribute('class', 'task');
        main.appendChild(task);

        const taskTitle = document.createElement('h2');
        taskTitle.setAttribute('class', 'taskTitle');
        taskTitle.textContent = todoList[i].title;
        task.appendChild(taskTitle);

        const meta = document.createElement('div');
        meta.setAttribute('class', 'meta');
        task.appendChild(meta);

        const due = document.createElement('p');
        const priority = document.createElement('p');
        const category = document.createElement('p');

        due.setAttribute('class', 'taskDue');
        priority.setAttribute('class', 'taskPriority');
        category.setAttribute('class', 'taskCategory');

        due.textContent = todoList[i].due;
        priority.textContent = todoList[i].priority;
        category.textContent = todoList[i].category;

        meta.appendChild(due);
        meta.appendChild(priority);
        meta.appendChild(category);

        const description = document.createElement('p');
        description.setAttribute('class', 'taskDescription');
        description.textContent = todoList[i].desc;
        task.appendChild(description);

        const taskButtons = document.createElement('div');
        taskButtons.setAttribute('class', 'taskBtns');
        task.appendChild(taskButtons);

        const completeBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        completeBtn.setAttribute('class', 'taskCompleteBtn');
        deleteBtn.setAttribute('class', 'taskDeleteBtn');

        completeBtn.textContent = 'Complete';
        deleteBtn.textContent = 'Delete';

        taskButtons.appendChild(completeBtn);
        taskButtons.appendChild(deleteBtn);

    }

};

displayTasks();

// clear display
function clearDisplay() {

        const task = document.querySelectorAll('.task');
        task.forEach((element) => {
            element.remove();
        });

};

// event listeners
addItemButton.addEventListener('click', newTask);