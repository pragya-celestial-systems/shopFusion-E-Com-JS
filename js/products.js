import { fetchData } from "./data.js";

export function getParamsValue() {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const params = new URLSearchParams(url.search);
  const paramValue = params.get("id");
  return paramValue;
}

function displayProductPage(productData) {
  // create the product page and display that page
  console.log(productData);
  const productPageHtml = `

        <div id="leftSide">
          <img src=${productData.image} id="productImg" alt="product-img">
        </div>
        <div id="rightSide">
        <div class="topContainer">
          <h3 id="category">${productData.category}</p>
          <h1>${productData.title}</h4>
          <hr />
          <div id="ratingContainer">
            <p id="rating"><i class="fa-solid fa-star"></i>${productData.rating.rate} Rating</p>
            <p id="count">${productData.rating.count} Reviews</p>
          </div>
          <hr />
          <h2 id="price">$ ${productData.price}</h2>
          <p id="deliveryText">Free Delivery<p>
          <p id="description">${productData.description}</p>
         </div>
          <div id="bottomContainer">
            <button type="button" class="btn btn-warning">Order Now</button>
            <button type="button" class="btn btn-primary">Add to cart</button>
          </div>
        </div>

  `;

  const productDetailsContainer = document.querySelector("#productContainer");
  productDetailsContainer.insertAdjacentHTML("afterbegin", productPageHtml);
}

function createProductCard(productData) {
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

export function displayProductCards(products) {
  products.forEach((product) => {
    createProductCard(product);
  });
}

function addEventListenerOnCard(element, id) {
  element.addEventListener("click", () => {
    // open product detail page on the new tab
    window.open(`../product.html?id=${id}`, "_blank");
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const id = getParamsValue();

  if (id) {
    const productData = await fetchData(null, id);
    displayProductPage(productData);

    // set the title of the page
    document.title = productData.category;
  }
});
