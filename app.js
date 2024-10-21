"usestrict";

import { displayCategories } from "./js/categories.js";
import { fetchData } from "./js/data.js";
import { getParamsValue, renderItems } from "./js/products.js";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    if (!getParamsValue()) {
      // display categories
      const categories = await fetchData("all");

      displayCategories(categories);

      // display products
      const products = await fetchData();
      renderItems(products);

      // display the loader
      if (products) {
        // document.querySelector("#loader").style.display = "none";
      } else {
        document.querySelector("#loader").style.display = "none";
      }

      document.querySelector(".form-control").addEventListener("input", (e) => {
        const filteredProducts = products.filter((product) =>
          product.title.includes(e.target.value)
        );
        console.log(filteredProducts);
      });
      // add event listener on search bar
    }
  } catch (error) {
    console.error(error);
  }
});
