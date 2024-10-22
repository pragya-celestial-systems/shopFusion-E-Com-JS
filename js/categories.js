import { fetchData } from "./httpHelper.js";
import { renderItems, renderSearchResult } from "./products.js";

const loadMoreContainer = document.querySelector("#loadMore");
const categoriesContainer = document.querySelector("#categories");
const productDetailsContainer = document.querySelector(
  "#productDetailsContainer"
);

export function displayCategories(categories) {
  categories.forEach((title) => {
    const categoryEl = `<p class="category-title">${title}</p>`;
    categoriesContainer.insertAdjacentHTML("beforeend", categoryEl);

    categoriesContainer.lastElementChild.addEventListener(
      "click",
      async (e) => {
        renderSearchByCategoryResults(e.target.innerText);

        // hide the load more button
        loadMoreContainer.style.display = "none";
      }
    );
  });
}

export async function renderSearchByCategoryResults(category) {
  try {
    // hide error page if there isn't any error
    productDetailsContainer?.firstElementChild.classList.add("active-content");
    productDetailsContainer?.firstElementChild.nextElementSibling.classList.remove(
      "active-content"
    );

    const products = await fetchData();
    const filteredProducts = products.filter((product) => {
      if (product.category.toLowerCase() === category.toLowerCase().trim()) {
        return product;
      }
    });

    renderItems(filteredProducts);
  } catch (error) {
    productDetailsContainer?.firstElementChild.classList.remove(
      "active-content"
    );
    productDetailsContainer?.firstElementChild.nextElementSibling.classList.add(
      "active-content"
    );
  }
}
