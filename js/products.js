function createProduct(productData) {
  const cardHtml = `
    <div class="card-container">
        <div class="leftSideCard">
          <img src="${productData.image}" class="card-img" alt="product-img">
        </div>
        <div class="rightSideCard">
          <p class="card-category">${productData.category}</p>
          <h4 class="card-title">${productData.title}</h4>
          <hr />
          <div class="card-ratings-container">
            <p class="rating"><i class="fa-solid fa-star"></i>${productData.rating.rate} Rating</p>
            <p class="count">${productData.rating.count} Reviews</p>
          </div>
          <hr />
          <p class="price">$${productData.price}</p>
          <p class="description">${productData.description}</p>
        </div>
      </div>
      `;

  const productsContainer = document.querySelector("main");
  productsContainer.insertAdjacentHTML("afterbegin", cardHtml);

  const newCard = productsContainer.querySelector(".card-container");
  addEventListenerOnCard(newCard, productData.id);
}

export function displayProducts(products) {
  products.forEach((product) => {
    createProduct(product);
  });
}

function addEventListenerOnCard(element, id) {
  element.addEventListener("click", () => {
    // open product detail page on new tab
  });
}
