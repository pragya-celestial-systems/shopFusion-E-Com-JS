import { renderSearchResult } from "./products.js";

export function displayCategories(categories) {
  const categoriesContainer = document.querySelector("#categories");

  categories.forEach((title) => {
    const categoryEl = `<p class="category-title">${title}</p>`;
    categoriesContainer.insertAdjacentHTML("beforeend", categoryEl);

    categoriesContainer.lastElementChild.addEventListener("click", async (e) => {
      renderSearchResult(e.target.innerText);

      // hide the load more button
      document.querySelector("#loadMore").style.display = "none";
    });
  });
}