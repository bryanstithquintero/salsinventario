import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

console.log("backend es este", BACKEND_URL);
const API_URL = `${BACKEND_URL}/api/products/`;

// Create New Product
const createProduct = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

// Get all products
const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
    const response = await axios.delete(API_URL + id);
    return response.data;
};
// Get a Product
const findProduct = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
};
// Update Product
const updateProduct = async (id, formData) => {
    const response = await axios.patch(`${API_URL}${id}`, formData);
    return response.data;
};

const productService = {
    createProduct,
    getProducts,
    findProduct,
    deleteProduct,
    updateProduct,
};

export default productService;