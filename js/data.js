export async function fetchData(categoryType, id) {
    let url;

    // set the url accrodingly
    if (categoryType) {
        if (categoryType === 'all') {
            url = 'https://fakestoreapi.com/products/categories';
        } else {
            url = `https://fakestoreapi.com/products/category/${categoryType}`;
        }
    } else if (id) {
        url = `https://fakestoreapi.com/products/${id}`;
    } else {
        url = 'https://fakestoreapi.com/products';
    }

    // fetch the data
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}