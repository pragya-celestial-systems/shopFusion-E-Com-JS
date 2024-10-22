"usestrict";

import { displayCategories } from "./js/categories.js";
import { fetchData } from "./js/httpHelper.js";
import {
  getParamsValue,
  renderItems,
  renderSearchByCategoryResults,
  renderSearchResult,
} from "./js/products.js";

const contentContainer = document.querySelector("#content");
const loadMoreButton = document.querySelector("#loadMore");
const loader = document.querySelector("#loader");

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
        loader.style.display = "none";
      } else {
        loader.style.display = "none";
      }

      renderItems(products);

      // display search result if user submits the form (search by category)
      document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        renderSearchByCategoryResults(searchVal);
      });

      // if the search input is empty, display all the products
      document.querySelector("input").addEventListener("input", (e) => {
        searchVal = e.target.value;

        if (e.target.value === "") {
          loadMoreButton.style.display = "flex";
          renderItems(products);
        } else {
          loadMoreButton.style.display = "none";
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
