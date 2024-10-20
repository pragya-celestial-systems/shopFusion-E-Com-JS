export function displayCategories(categories) {
  const categoriesContainer = document.querySelector("#categories");

  categories.forEach((title) => {
    const categoryEl = `<p class="category-title">${title}</p>`;
    categoriesContainer.insertAdjacentHTML("afterbegin", categoryEl);
  });
}

export function addEventListenerOnCategories(categories) {
  categories.forEach((category) => {
    category.addEventListener("click", () => {
      console.log(category);
    });
  });
}
