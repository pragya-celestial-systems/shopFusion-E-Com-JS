export function createCategories(categories) {
  const categoriesContainer = document.querySelector("#categories");

  categories.forEach((title) => {
    const categoryEl = `<p class="category-title">${title}</p>`;
    categoriesContainer.insertAdjacentHTML("afterbegin", categoryEl);
  });
}
