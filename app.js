"usestrict";

import { createCategories } from "./js/categories.js";
import { fetchData } from "./js/data.js";
import { displayProducts } from "./js/products.js";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const categories = await fetchData("all");
    createCategories(categories);

    const products = await fetchData();
    displayProducts(products);
  } catch (error) {
    console.log(error);
  }
});
