import { categories } from "./categories";

export {
    todoList,
    makeTodo,
    changePriority,
    completeTodo,
    removeTodo,
    changeCategory
};

const todoList = [];

const makeTodo = (title, desc, due, priority) => {

    const thisTodo = {
        title,
        desc,
        due,
        priority,
        status: 'pending',
        category: 'default'
    };

    return todoList.push(thisTodo);
};

function changePriority(title, priority) {
    todoList.forEach((element) => {
        if (element.title === title) {
            element.priority = priority;
        };
    });
};

function completeTodo(title) {
    todoList.forEach((element) => {
        if (element.title === title) {
            element.status = 'complete';
        };
    });
};

function removeTodo(title) {

    let location;

    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].title === title) {
            location = i;
            break;
        };
    };

    if (location >= 0) {
        todoList.splice(location, 1);
    } else {
        return;
    };
};

function changeCategory(title, category) {

    let foundTitle = false;
    let foundCategory = false;

    todoList.forEach((element) => {
        if (element.title === title) {
            foundTitle = true;
        };
    });

    for (let i = 0; i < categories.length; i++) {
        if (categories[i] === category) {
            foundCategory = true;
            break;
        };
    };

    if (foundTitle === true && foundCategory === true) {
        todoList.forEach((element) => {
            if (element.title === title) {
                element.category = category;
            };
        });
    };
};