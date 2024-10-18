export function createCategory(title){
    const titleEl = document.createElement('p');
    titleEl.classList.add('category-title');
    titleEl.textContent = title;

    return titleEl;
}

export function createCategories(categories){
    const categoriesContainer = document.getElementById('categories');

    categories.forEach(title => {
        const categoryEl = createCategory(title);
        console.log(categoryEl);
        categoriesContainer.appendChild(categoryEl);
    });
}