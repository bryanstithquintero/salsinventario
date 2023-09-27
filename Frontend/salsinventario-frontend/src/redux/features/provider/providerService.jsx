import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

console.log("backend es este", BACKEND_URL);
const API_URL = `${BACKEND_URL}/api/providers/`;

// Crear un nuevo proveedor
const createProvider = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

// Obtener todos los proveedores
const getProviders = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Eliminar un proveedor
const deleteProvider = async (id) => {
    const response = await axios.delete(API_URL + id);
    return response.data;
};

// Obtener un proveedor por ID
const findProvider = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
};

// Actualizar un proveedor
const updateProvider = async (id, formData) => {
    const response = await axios.patch(`${API_URL}${id}`, formData);
    return response.data;
};

// Agregar una compra a un proveedor por ID
const addPurchaseToProvider = async (id, purchaseData) => {
    const response = await axios.post(`${API_URL}${id}/add-purchase`, purchaseData);
    return response.data;
};

const providerService = {
    createProvider,
    getProviders,
    findProvider,
    deleteProvider,
    updateProvider,
    addPurchaseToProvider,
};

export default providerService;
