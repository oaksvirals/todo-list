import { indexOf } from "lodash";

export { categories, makeCategory, removeCategory };

const categories = ['Default'];

function makeCategory(name) {

    if (categories.indexOf(name) < 0) {
       categories.push(name); 
    } else {
        return;
    };
};

function removeCategory(name) {

    let thisCategory;

    if (categories.indexOf(name) >= 0) {
        thisCategory = categories[categories.indexOf(name)];
    } else {
        return;
    }

    for (let i = 0; i < categories.length; i++) {
        if (categories[i] === thisCategory) {
            categories.splice(i, 1);
        }
    }
};