'usestrict';

import { createCategories } from "./js/categories.js";
import { fetchData } from "./js/data.js";

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const categories = await fetchData('all');
        createCategories(categories)
    } catch (error) {
        console.log(error);
    }
});