# ShopFusion - E-Commerce Product Listing App

**ShopFusion** is an online store app that shows products from an API. It includes product categories, a search feature, and product detail pages. Built with **HTML**, **CSS**, **Bootstrap**, and **JavaScript**.

### Features

- **App Bar**: Includes logo (clickable), search box, and non-clickable cart and login buttons.
- **Product Categories**: Displays categories horizontally. Clicking on a category fetches relevant products.
- **Product Listing**: Shows product images, titles, descriptions, category, rating, and price. Initially, 5 products are shown with a **Load More** button to fetch more.
- **Search**: Search by category, title, or description.
- **Product Detail**: Clicking a product shows its details on a separate page.

### Technologies Used

- **HTML**: For structure.
- **CSS**: For styling and layout.
- **Bootstrap**: For responsive design (On some elements).
- **JavaScript**: For dynamic content and API interaction.

### API Endpoints

- **Categories**: `GET https://fakestoreapi.com/products/categories`
- **Products**: `GET https://fakestoreapi.com/products?_limit=5&_page=1`
- **Category Products**: `GET https://fakestoreapi.com/products/category/<category>`
- **Product Details**: `GET https://fakestoreapi.com/products/<id>`

### Installation and How to Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/shopfusion.git

2. Open the live server.
