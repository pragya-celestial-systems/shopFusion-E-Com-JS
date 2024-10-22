"usestrict";

import { displayCategories } from "./js/categories.js";
import { fetchData } from "./js/httpHelper.js";
import {
  getParamsValue,
  renderItems,
  renderSearchResult,
} from "./js/products.js";

const contentContainer = document.querySelector("#content");

window.addEventListener("DOMContentLoaded", async () => {
  try {
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

      // display the loader
      if (products) {
        document.querySelector("#loader").style.display = "none";
      } else {
        document.querySelector("#loader").style.display = "none";
      }

      renderItems(products);

      // display search result if user submits the form (search by category)
      document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();

        if (searchVal) {
          renderSearchResult(searchVal, true);
        }
      });

      // if the search input is empty, display all the products
      document.querySelector("input").addEventListener("input", (e) => {
        if (e.target.value === "") {
          document.querySelector('#loadMore').style.display = 'block';
          renderItems(products);
        } else {
          searchVal = e.target.value;
          renderSearchResult(searchVal);
        }
      });
    }
  } catch (error) {
    contentContainer?.firstElementChild.classList.remove("active-content");
    contentContainer?.firstElementChild.nextElementSibling.classList.add(
      "active-content"
    );
  }
});
