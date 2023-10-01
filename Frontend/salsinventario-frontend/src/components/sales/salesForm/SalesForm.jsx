import React, { useState, useEffect } from 'react';
import salesService from '../../../redux/features/sale/saleService'; // Importa el servicio de ventas
import clientService from '../../../redux/features/client/clientService'; // Importa el servicio de clientes
import productService from '../../../redux/features/product/productService'; // Importa el servicio de productos
import './SalesForm.scss'
import Card from '../../../components/card/Card';

const CreateSaleForm = () => {
    const [formData, setFormData] = useState({
        products: [],
        client: "",
        total: 0,
        fecha: "",
    });

    const [clients, setClients] = useState([]); // Almacenará la lista de clientes disponibles
    const [availableProducts, setAvailableProducts] = useState([]); // Almacenará la lista de productos disponibles

    // Función para cargar la lista de clientes disponibles
    const fetchClients = async () => {
        try {
            const fetchedClients = await clientService.getClients();
            setClients(fetchedClients);
        } catch (error) {
            console.error('Error al obtener la lista de clientes: ', error);
        }
    };

    // Función para cargar la lista de productos disponibles
    const fetchAvailableProducts = async () => {
        try {
            const fetchedProducts = await productService.getProducts();
            setAvailableProducts(fetchedProducts);
        } catch (error) {
            console.error('Error al obtener la lista de productos disponibles: ', error);
        }
    };

    useEffect(() => {
        // Cargar la lista de clientes y productos disponibles al montar el componente
        fetchClients();
        fetchAvailableProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Función para manejar la selección de productos vendidos
    const handleProductSelection = (e) => {
        const selectedProductIds = Array.from(e.target.selectedOptions, (option) => option.value);
        const productWithQuantity = selectedProductIds.map((productId) => ({
            _id: productId,
            quantity: 0,
        }));
        setFormData({
            ...formData,
            products: productWithQuantity, // Almacenar los IDs de los productos seleccionados
        });
    };

    const handleQuantityChange = (e, productId) => {
        const { value } = e.target;
        const updatedProducts = formData.products.map((product) => {
            if (product._id === productId) {
                return { ...product, quantity: value };
            }
            return product;
        }
        );
        setFormData({
            ...formData,
            products: updatedProducts,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Formulario de venta enviado: ', formData)
            // Llama a la función createSale del servicio de ventas para crear la venta
            const createdSale = await salesService.createSale(formData);
            console.log('Venta creada:', createdSale);
            // Lógica adicional después de crear la venta, como redireccionar a la lista de ventas

            return <navigate to="/dashboard" />
        } catch (error) {
            console.error('Error al crear la venta: ', error);
        }
    };

    return (
        <div className='create-sale'>
            <Card cardClass={"card"}>
                <h1>Crear Venta</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Cliente:</label>
                        <select
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona un cliente</option>
                            {clients.map((client) => (
                                <option key={client._id} value={client._id}>
                                    {client.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Productos Vendidos:</label>
                        <select
                            name="products"
                            multiple
                            onChange={handleProductSelection}
                        >
                            {availableProducts.map((product) => (
                                <option key={product._id} value={product._id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        {formData.products.map((product, index) => (
                            <div key={index}>
                                <label>Cantidad de {availableProducts.find((p) => p._id === product._id)?.name}:</label>
                                <input
                                    type="number"
                                    name={`quantity_${product._id}`}
                                    value={product.quantity}
                                    onChange={(e) => handleQuantityChange(e, product._id)}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <label>Fecha:</label>
                        <input
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Total:</label>
                        <input
                            type="number"
                            name="total"
                            value={formData.total}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="--my">
                        <button type="submit" className="--btn --btn-primary"> GUARDAR
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateSaleForm;
