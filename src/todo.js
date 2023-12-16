import { categories } from "./categories";

export {
    todoList,
    makeTodo,
    deleteTodo
};

// const todoList = [
//     {
//         category: "Coding",
//         desc: "Complete the Todo List App for The Odin Project.",
//         due: "2023-12-20",
//         priority: "High",
//         status: "pending",
//         title: "Create a Todo App"
//     }
// ];

const todoList = [];

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

function deleteTodo(index) {

    const localList = JSON.parse(localStorage.getItem('todo'));

    todoList.splice(index, 1);

};