import { categories } from "./categories";

export {
    todoList,
    completedList,
    makeTodo,
    changePriority,
    changeCategory,
    deleteTodo,
    undoComplete
};

const todoList = [];
const completedList = [];

const makeTodo = (title, desc, due, priority, category, status = 'pending') => {

    const thisTodo = {
        title,
        desc,
        due,
        priority,
        category,
        status
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

// function completeTodo(title) {
//     todoList.forEach((element) => {
//         if (element.title === title) {
//             element.status = 'complete';
//         };
//     });
// };

// function removeTodo(title) {

//     let location;

//     for (let i = 0; i < todoList.length; i++) {
//         if (todoList[i].title === title) {
//             location = i;
//             break;
//         };
//     };

//     if (location >= 0) {
//         todoList.splice(location, 1);
//     } else {
//         return;
//     };
// };

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

function deleteTodo(index) {

    todoList[index].status = 'complete';
    completedList.push(todoList[index]);
    todoList.splice(index, 1);

    console.log(todoList)
    console.log(completedList)

};

function undoComplete(index) {

    completedList[index].status = 'pending';
    todoList.push(completedList[index]);
    completedList.splice(index, 1);

};