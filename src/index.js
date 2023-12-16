import './style.css';
import { todoList, makeTodo, deleteTodo } from './todo';
import { categories, makeCategory, removeCategory } from './categories';
import { get, indexOf } from 'lodash';

// Populating Todo App with demo display content.
(function init() {

    const localList = JSON.parse(localStorage.getItem('todo'));
    const localCategory = JSON.parse(localStorage.getItem('category'));

    if (localList !== null) {

        for (let i = 0; i < localList.length; i++) {
            todoList.push(localList[i])
        };

        // Starts at 1 to skip Default
        for (let i = 1; i < localCategory.length; i++) {
            categories.push(localCategory[i]);
        };

    } else {
        
        makeTodo('Create a Todo App', 'Create the Todo list project from The Odin Project.', '2023-12-20', 'High', 'Coding');
        makeTodo('Record YouTube Video', 'Make a "day in my life" video for the channel. YT.com@wesleyoaks', '2023-12-18', 'Medium', 'YouTube');
        makeTodo('Return Library Books', 'I almost forgot to return the books last time... not again!', '2023-12-19', 'Low', 'Default');
        makeCategory('Coding');
        makeCategory('YouTube');

        toLocalStorage();

    };

})();

let editingTask = '';

// Global Selectors
const addItemButton = document.querySelector('#addItem');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const due = document.querySelector('#due');
const priority = document.querySelector('#priority');
const category = document.querySelector('#category');
const filterCategory = document.querySelector('#filterCategory');
const filterPriority = document.querySelector('#filterPriority');
const filterResetBtn = document.querySelector('.resetFilterBtn');
const main = document.querySelector('main');
const catModal = document.querySelector('.catModal');
const newCatButton = document.querySelector('#manageCategoryBtn');
const closeCatModalBtn = document.querySelector('.modalCloseCategoryMenu');
const addCatButton = document.querySelector('.modalAddCategory');
const modalCatInput = document.querySelector('.modalCatInput');
const removeCategoryList = document.querySelector('#removeCategory');
const removeCategoryListBtn = document.querySelector('.removeCategoryBtn');
const hideCompletedBtn = document.querySelector('#hideCompleteBtn');
const taskModalCategory = document.querySelector('#taskModalCategory');
const taskModal = document.querySelector('.taskModal');
const taskModalExitBtn = document.querySelector('.taskModalExitBtn');
const editModalTitle = document.querySelector('#taskModalTitle');
const editModalDescription = document.querySelector('#taskModalDescription');
const editModalDate = document.querySelector('#taskModalDue');
const editModalPriority = document.querySelector('#taskModalPriority');
const editModalCategory = document.querySelector('#taskModalCategory');
const editModalSubmitBtn = document.querySelector('.taskModalSubmitBtn');

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
        removeCategoryOption.textContent = categories[i];
        removeCategoryOption.setAttribute('value', categories[i]);

        const taskModalOption = document.createElement('option');
        taskModalCategory.appendChild(taskModalOption);
        taskModalOption.textContent = categories[i];
        taskModalOption.setAttribute('value', categories[i]);

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

    toLocalStorage();
    clearDisplay();
    displayTasks();

};

function displayTasks() {
    
    for (let i = 0; i < todoList.length; i++) {

        // Building out the task tile
        const task = document.createElement('div');
        task.setAttribute('class', 'task');
        main.appendChild(task);

        const taskTitle = document.createElement('h2');
        taskTitle.setAttribute('class', 'taskTitle');
        taskTitle.setAttribute('value', todoList[i].title)
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
        const editBtn = document.createElement('button');

        completeBtn.setAttribute('class', 'taskCompleteBtn');
        completeBtn.setAttribute('value', todoList[i].title);
        deleteBtn.setAttribute('class', 'taskDeleteBtn');
        deleteBtn.setAttribute('value', todoList[i].title);
        editBtn.setAttribute('class', 'taskEditBtn');
        editBtn.setAttribute('value', todoList[i].title);

        completeBtn.textContent = 'Done';
        deleteBtn.textContent = 'Delete';
        editBtn.textContent = 'Edit';

        taskButtons.appendChild(completeBtn);
        taskButtons.appendChild(deleteBtn);
        taskButtons.appendChild(editBtn);

        function clickDelete() {

            const index = todoList.findIndex(task => task.title === deleteBtn.value);
            deleteTodo(index);
            task.remove();
            toLocalStorage();
            
        };

        function clickComplete() {

            const index = todoList.findIndex(task => task.title === completeBtn.value);
            
            if (completeBtn.textContent === 'Done') {

                task.classList.add('overlay');
                completeBtn.textContent = 'Undo';
                completeBtn.style.backgroundColor = 'var(--off)';
                completeBtn.style.color = 'var(--main)';
                todoList[index].status = 'complete';

                if (hideCompletedBtn.textContent === 'Show Completed') {
                    task.classList.add('hideTask');
                };

            } else if (completeBtn.textContent === 'Undo') {

                task.classList.remove('overlay');
                completeBtn.textContent = 'Done';
                completeBtn.style.backgroundColor = 'var(--accent)';
                completeBtn.style.color = 'black';
                todoList[index].status = 'pending';

            };

            toLocalStorage();

        };

        completeBtn.addEventListener('click', clickComplete);
        deleteBtn.addEventListener('click', clickDelete);

        // Apply edit values to modal

        function editFields() {

            const index = todoList.findIndex(task => task.title === editBtn.value);

            editingTask = todoList[index].title;

            editModalTitle.value = todoList[index].title;
            editModalDescription.value = todoList[index].desc;
            editModalDate.value = todoList[index].due;
            editModalPriority.value = todoList[index].priority;
            editModalCategory.value = todoList[index].category;

        };

        editBtn.addEventListener('click', openTaskModal);
        editBtn.addEventListener('click', editFields);
        
        // Check if task was marked complete already and apply settings
        if (todoList[i].status === 'complete') {

            task.classList.add('overlay');
            completeBtn.textContent = 'Undo';
            completeBtn.style.backgroundColor = 'var(--off)';
            completeBtn.style.color = 'var(--main)';

        };

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
};

function closeCatModal() {
    removeCategoryList.style.backgroundColor = '';
    catModal.classList.add('hidden');
};

function openTaskModal() {
    taskModal.classList.remove('hidden');
}

function closeTaskModal() {
    taskModal.classList.add('hidden');
}

function addNewCat() {

    if (modalCatInput.value !== '' && !isNaN(modalCatInput.value) === false && categories.indexOf(modalCatInput.value) < 0) {
        
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

        const editTaskCategoryOption = document.createElement('option');
        taskModalCategory.appendChild(editTaskCategoryOption);
        editTaskCategoryOption.text = modalCatInput.value;
        editTaskCategoryOption.setAttribute('value', modalCatInput.value);

        modalCatInput.value = ''
        modalCatInput.focus();

        toLocalStorage();

    };

};

function removeSelectedCat() {

    if (removeCategoryList.value === 'Default') {
        removeCategoryList.style.backgroundColor = 'var(--red)';
        return;
    };

    removeCategory(removeCategoryList.value);

    const removeOption = document.querySelectorAll('option[value=' + removeCategoryList.value +']');

    removeOption.forEach((item) => {
        item.remove();
    });

    toLocalStorage();

    removeCategoryList.style.backgroundColor = '';

};

function toggleCompleted() {

    const tasks = document.querySelectorAll('.overlay');
    const hiddenTasks = document.querySelectorAll('.hideTask');

    if (hideCompletedBtn.textContent === 'Hide Completed') {

        tasks.forEach((task) => {
            task.classList.add('hideTask');
        });

        hideCompletedBtn.textContent = 'Show Completed';
        hideCompletedBtn.style.backgroundColor = 'black';

    } else if (hideCompletedBtn.textContent === 'Show Completed') {

        hiddenTasks.forEach((task) => {
            task.classList.remove('hideTask');
        });

        hideCompletedBtn.textContent = 'Hide Completed';
        hideCompletedBtn.style.backgroundColor = 'var(--main)';
        hideCompletedBtn.style.color = 'var(--off)';

    };
    
};

function filterByCategory() {

    const taskCats = document.querySelectorAll('.task .meta .taskCategory');

    if (filterCategory.value === 'none') {

        taskCats.forEach((task) => {
            task.parentNode.parentNode.classList.remove('hideByCategory');
        });
        return;

    } else {

        taskCats.forEach((task) => {

        task.parentNode.parentNode.classList.remove('hideByCategory');

        if (task.textContent !== filterCategory.value) {
                task.parentNode.parentNode.classList.add('hideByCategory');
            };

    });

    };

};

function filterByPriority() {

    const taskPriority = document.querySelectorAll('.task .meta .taskPriority');

    if (filterPriority.value === 'none') {

        taskPriority.forEach((task) => {
            task.parentNode.parentNode.classList.remove('hideByPriority');
        });
        return;

    } else {

        taskPriority.forEach((task) => {

        task.parentNode.parentNode.classList.remove('hideByPriority');

        if (task.textContent !== filterPriority.value) {
                task.parentNode.parentNode.classList.add('hideByPriority');
            };

    });

    };

};

function resetFilter() {

    const tasks =  document.querySelectorAll('.task');

    tasks.forEach((task) => {
        task.classList.remove('hideByCategory');
        task.classList.remove('hideByPriority');
    });

    filterCategory.value = 'none';
    filterPriority.value = 'none';

};

function updateTask() {

    const index = todoList.findIndex(task => task.title === editingTask);

    todoList[index].title = editModalTitle.value;
    todoList[index].desc = editModalDescription.value;
    todoList[index].due = editModalDate.value;
    todoList[index].priority = editModalPriority.value;
    todoList[index].category = editModalCategory.value;
    
    toLocalStorage();
    closeTaskModal();
    clearDisplay();
    displayTasks();

};

function toLocalStorage() {

    localStorage.setItem('todo', JSON.stringify(todoList));
    localStorage.setItem('category', JSON.stringify(categories));

};

// Applying Event Listeners
addItemButton.addEventListener('click', newTask);
newCatButton.addEventListener('click', openCatModal);
closeCatModalBtn.addEventListener('click', closeCatModal);
addCatButton.addEventListener('click', addNewCat);
removeCategoryListBtn.addEventListener('click', removeSelectedCat);
hideCompletedBtn.addEventListener('click', toggleCompleted);
filterCategory.addEventListener('change', filterByCategory);
filterPriority.addEventListener('change', filterByPriority);
filterResetBtn.addEventListener('click', resetFilter);
taskModalExitBtn.addEventListener('click', closeTaskModal);
editModalSubmitBtn.addEventListener('click', updateTask);