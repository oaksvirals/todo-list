import './style.css';
import { todoList, completedList, makeTodo, changePriority, removeTodo, changeCategory, deleteTodo, undoComplete } from './todo';
import { categories, makeCategory, removeCategory } from './categories';
import { indexOf } from 'lodash';

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

makeCategory('Family');
makeCategory('Coding');
changePriority('make bacon', 'Low');

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
const catModal = document.querySelector('.catModal');
const newCatButton = document.querySelector('#manageCategoryBtn');
const overlay = document.querySelector('.overlay');
const closeCatModalBtn = document.querySelector('.modalCloseCategoryMenu');
const addCatButton = document.querySelector('.modalAddCategory');
const modalCatInput = document.querySelector('.modalCatInput');
const removeCategoryList = document.querySelector('#removeCategory');
const removeCategoryListBtn = document.querySelector('.removeCategoryBtn');

displayTasks();

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

        const removeCategoryOption = document.createElement('option');
        removeCategoryList.appendChild(removeCategoryOption);
        removeCategoryOption.text = categories[i];
        removeCategoryOption.setAttribute('value', categories[i]);

    };
})();

function newTask() {

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
        completeBtn.setAttribute('value', todoList[i].title);
        deleteBtn.setAttribute('class', 'taskDeleteBtn');
        deleteBtn.setAttribute('value', todoList[i].title);

        completeBtn.textContent = 'Complete';
        deleteBtn.textContent = 'Delete';

        taskButtons.appendChild(completeBtn);
        taskButtons.appendChild(deleteBtn);

        function clickDelete() {

            const index = todoList.findIndex(task => task.title === completeBtn.value);
            deleteTodo(index);
            clearDisplay();
            displayTasks();
            
        };

        function clickComplete() { // TO DO: maybe change styling of the task

        };

        deleteBtn.addEventListener('click', clickDelete);

    };

};

function clearDisplay() {

        const task = document.querySelectorAll('.task');
        task.forEach((element) => {
            element.remove();
        });

};

function openCatModal() {
    catModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

function closeCatModal() {
    catModal.classList.add('hidden');
    overlay.classList.add('hidden');
};

function addNewCat() {

    if (modalCatInput.value !== '' && categories.indexOf(modalCatInput.value) < 0) {
        
        makeCategory(modalCatInput.value); 

        const categoryOption = document.createElement('option');
        category.appendChild(categoryOption);
        categoryOption.textContent = modalCatInput.value;
        categoryOption.setAttribute('value', modalCatInput.value);

        const removeCategoryOption = document.createElement('option');
        removeCategoryList.appendChild(removeCategoryOption);
        removeCategoryOption.text = modalCatInput.value;
        removeCategoryOption.setAttribute('value', modalCatInput.value);

        const filterCategoryOption = document.createElement('option');
        filterCategory.appendChild(filterCategoryOption);
        filterCategoryOption.text = modalCatInput.value;
        filterCategoryOption.setAttribute('value', modalCatInput.value);

        modalCatInput.value = ''
        modalCatInput.focus();
    };

};

function removeSelectedCat() {

    if (removeCategoryList.value === 'Default') {
        return;
    };

    removeCategory(removeCategoryList.value);

    const removeOption = document.querySelectorAll('option[value=' + removeCategoryList.value +']');

    removeOption.forEach((item) => {
        item.remove();
    });

    console.log(categories);

};

// event listeners
addItemButton.addEventListener('click', newTask);
newCatButton.addEventListener('click', openCatModal);
closeCatModalBtn.addEventListener('click', closeCatModal);
addCatButton.addEventListener('click', addNewCat);
removeCategoryListBtn.addEventListener('click', removeSelectedCat);