"usestrict";

import { createCategories } from "./js/categories.js";
import { fetchData } from "./js/data.js";
import { displayProducts } from "./js/products.js";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    // display categories
    const categories = await fetchData("all");
    createCategories(categories);

    // display products
    const products = await fetchData();
    displayProducts(products);
    document.querySelector('.form-control').addEventListener('input', e => {
        const filteredProducts = products.filter(product => product.title.includes(e.target.value));
        console.log(filteredProducts);
    })
    // add event listener on search bar 
  } catch (error) {
    console.log(error);
  }
});
