export {
    todoList,
    makeTodo,
    changePriority,
    completeTodo,
    removeTodo
};

const todoList = [];

const makeTodo = (title, desc, due, priority) => {

    const thisTodo = {
        title,
        desc,
        due,
        priority,
        status: 'pending'
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
        };
    };

    if (location >= 0) {
        todoList.splice(location, 1);
    } else {
        return;
    };
};