export async function fetchData(endpoint = "") {
  try {
    const baseUrl = "https://fakestoreapi.com/products";
    const response = await fetch(`${baseUrl}${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
