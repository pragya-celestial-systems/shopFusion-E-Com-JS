"usestrict";

import { displayCategories } from "./js/categories.js";
import { fetchData } from "./js/data.js";
import {
  getParamsValue,
  renderItems,
  renderSearchResult,
} from "./js/products.js";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const contentContainer = document.querySelector("#content");
    let searchVal;

    // hide error page if there isn't any error
    contentContainer.firstElementChild.classList.add("active-content");
    contentContainer.firstElementChild.nextElementSibling.classList.remove(
      "active-content"
    );

    if (!getParamsValue()) {
      // display categories
      const categories = await fetchData("/categories");
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

      document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();

        if (searchVal) {
          renderSearchResult(searchVal);
        }
      });

      // if the search input is empty, display all the products
      document.querySelector("input").addEventListener("input", (e) => {
        if (e.target.value === "") {
          renderItems(products);
        } else {
          searchVal = e.target.value;
          renderSearchResult(searchVal);
        }
      });
    }
  } catch (error) {
    contentContainer.firstElementChild.classList.remove("active-content");
    contentContainer.firstElementChild.nextElementSibling.classList.add(
      "active-content"
    );
  }
});