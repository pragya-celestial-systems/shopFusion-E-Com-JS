export async function fetchData(categoryType, id, limit = 5) {
  let url;

  // set the url accrodingly
  if (categoryType) {
    if (categoryType === "all") {
      url = "https://fakestoreapi.com/products/categories";
    } else {
      url = `https://fakestoreapi.com/products/category/${categoryType}`;
    }
  } else if (id) {
    url = `https://fakestoreapi.com/products/${id}`;
  } else {
    url = `https://fakestoreapi.com/products?limit=${limit}`;
  }

  // fetch the data
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
