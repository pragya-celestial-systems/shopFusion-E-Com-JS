import { fetchData } from "./httpHelper.js";

const productContainer = document.querySelector(".product-container");
const productsContainer = document.querySelector("main");
const loadMoreButton = document.querySelector("#loadMore");
const productDetailsContainer = document.querySelector(
  "#productDetailsContainer"
);

let allItems,
  visibleItems = 5;

export function getParamsValue() {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const params = new URLSearchParams(url.search);
  const paramValue = params.get("id");
  return paramValue;
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
            <p class="rating"><i class="fa-solid fa-star"></i>${
              productData.rating.rate
            } Rating</p>
            <p class="count">${productData.rating.count} Reviews</p>
          </div>
          <hr />
          <p class="price">$${productData.price}</p>
          <p class="description">${
            productData.description.length > 150
              ? `${productData.description.slice(0, 145).trim()}...`
              : productData.description
          }</p>
        </div>
      </div>
      `;

  productsContainer?.insertAdjacentHTML("beforeend", cardHtml);

  const newCard = productsContainer.lastElementChild;
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
  element.addEventListener("click", (e) => {
    const targetVal = e.target.classList.value;

    if (
      targetVal === "card-img" ||
      targetVal === "card-title" ||
      targetVal === "description"
    ) {
      // open product detail page on the new tab
      window.open(`../product.html?id=${id}`, "_blank");
    }
  });
}

export function renderItems(products) {
  if (products.length <= 0) {
    productsContainer.innerHTML = "";
    console.log(products);
    const messageEl = `
    <div id="messageContainer">
      <p class="search-result-message">No items found.</p>
    </div>
    `;
    productsContainer?.insertAdjacentHTML("beforeend", messageEl);
    return;
  }

  productsContainer.innerHTML = "";
  allItems = products;
  products.slice(0, visibleItems).forEach((productData) => {
    createProductCard(productData);
  });

  // Hide "Load More" button if all items are visible
  if (visibleItems > allItems.length) {
    loadMoreButton.style.display = "none";
  }
}

export async function renderSearchResult(searchVal) {
  try {
    // hide error page if there isn't any error
    productDetailsContainer?.firstElementChild.classList.add("active-content");
    productDetailsContainer?.firstElementChild.nextElementSibling.classList.remove(
      "active-content"
    );

    const products = await fetchData();
    const filteredProducts = products.filter((product) => {
      if (
        product.category.includes(searchVal) ||
        product.title.includes(searchVal) ||
        product.description.includes(searchVal)
      ) {
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
        console.log(product);
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

  productContainer?.insertAdjacentHTML("afterbegin", productPageHtml);
}

// ------- event listener ---------

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // hide error page if there isn't any error
    productDetailsContainer?.firstElementChild.classList.add("active-content");
    productDetailsContainer?.firstElementChild.nextElementSibling.classList.remove(
      "active-content"
    );

    const id = getParamsValue();

    if (id) {
      const productData = await fetchData(`/${id}`);
      displayProductPage(productData);

      // set the title of the page
      document.title = productData.title;
    }
  } catch (error) {
    productDetailsContainer?.firstElementChild.classList.remove(
      "active-content"
    );
    productDetailsContainer?.firstElementChild.nextElementSibling.classList.add(
      "active-content"
    );
  }
});

loadMoreButton?.addEventListener("click", async () => {
  try {
    // hide error page if there isn't any error
    productDetailsContainer?.firstElementChild.classList.add("active-content");
    productDetailsContainer?.firstElementChild.nextElementSibling.classList.remove(
      "active-content"
    );

    visibleItems += 5;
    const products = await fetchData(`?limit=${visibleItems}`);
    allItems = products;
    renderItems(products);
    maintainScrollPosition();
  } catch (error) {
    productDetailsContainer?.firstElementChild.classList.remove(
      "active-content"
    );
    productDetailsContainer?.firstElementChild.nextElementSibling.classList.add(
      "active-content"
    );
  }
});
