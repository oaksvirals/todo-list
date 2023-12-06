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
const makeBacon = makeTodo('make bacon', 'make it hot', 'tomorrow', 'high');
const makeHam = makeTodo('make ham', 'make it greasy', 'tonight', 'low');
const makeChicken = makeTodo('make chicken', 'make it cold', 'morning', 'medium');

makeCategory('Kitchen');
changePriority('make bacon', 'low');
// removeCategory('kitchen');
changeCategory('make bacon', 'kitchen');

console.log(todoList);
console.log(categories);

// category handling
const category = document.querySelector('#category');
const filterCategory = document.querySelector('#filterCategory');

function displayCategories() {

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
};

displayCategories();