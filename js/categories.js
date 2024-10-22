import { renderSearchResult } from "./products.js";

const loadMoreContainer = document.querySelector("#loadMore");
const categoriesContainer = document.querySelector("#categories");

export function displayCategories(categories) {
  categories.forEach((title) => {
    const categoryEl = `<p class="category-title">${title}</p>`;
    categoriesContainer.insertAdjacentHTML("beforeend", categoryEl);

    categoriesContainer.lastElementChild.addEventListener(
      "click",
      async (e) => {
        renderSearchResult(e.target.innerText);

        // hide the load more button
        loadMoreContainer.style.display = "none";
      }
    );
  });
}
