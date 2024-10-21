import { fetchData } from "./data.js";

const productDetailsContainer = document.querySelector("#productContainer");
const productsContainer = document.querySelector("main");
const loadMoreButton = document.querySelector("#loadMore");
const messageEl = document.querySelector("#message");
let allItems,
  visibleItems = 5;

export function getParamsValue() {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const params = new URLSearchParams(url.search);
  const paramValue = params.get("id");
  return paramValue;
}

export function renderItems(products) {
  productsContainer.innerHTML = "";
  allItems = products;
  products.slice(0, visibleItems).forEach((productData) => {
    createProductCard(productData);
  });

  // Hide "Load More" button if all items are visible
  if (visibleItems > allItems.length) {
    loadMoreButton.style.display = "none";
    messageEl.style.display = "block";
  }
}

function displayProductPage(productData) {
  // create the product page and display that page
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
          <select>
            <option value="1">1</option>
            <option value="1">2</option>
            <option value="1">3</option>
            <option value="1">4</option>
            <option value="1">5 (max.)</option>
          </select>
         </div>
          <div id="bottomContainer">
            <button type="button" class="btn btn-warning">Order Now</button>
            <button type="button" class="btn btn-primary">Add to cart</button>
          </div>
        </div>

  `;

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

  productsContainer.insertAdjacentHTML("beforeend", cardHtml);

  const newCard = productsContainer.querySelector(".card-container");
  addEventListenerOnCard(newCard, productData.id);
}

function maintainScrollPosition() {
  const currentScrollPosition =
    window.scrollY || document.documentElement.scrollTop;

  window.scrollTo({
    top: currentScrollPosition,
    behavior: "auto",
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

loadMoreButton.addEventListener("click", async () => {
  visibleItems += 5;
  const products = await fetchData(null, null, visibleItems);
  allItems = products;
  renderItems(products);
  maintainScrollPosition();
});
