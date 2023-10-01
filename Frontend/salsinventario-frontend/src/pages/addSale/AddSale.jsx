import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import SalesForm from "../../components/sales/salesForm/SalesForm"; // Asegúrate de importar el formulario de ventas
import {
    createSale,
    selectIsLoading,
    selectProducts, // Asegúrate de importar el selector de productos
    selectClients, // Asegúrate de importar el selector de clientes
} from "../../redux/features/sale/saleSlice"; // Importa las acciones y selectores adecuados
import { getProducts } from "../../redux/features/product/productSlice"; // Importa la acción para obtener la lista de productos
import { getClients } from "../../redux/features/client/clientSlice"; // Importa la acción para obtener la lista de clientes

const initialState = {
    client: "",
    products: [],
    total: 0,
    fecha: "",
};

const AddSale = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sale, setSale] = useState(initialState);
    const isLoading = useSelector(selectIsLoading);
    const products = useSelector(selectProducts); // Obtén la lista de productos desde el estado
    const clients = useSelector(selectClients); // Obtén la lista de clientes desde el estado

    const { client, products: selectedProducts, fecha } = sale;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSale({ ...sale, [name]: value });
    };

    const handleProductChange = (e) => {
        const { value } = e.target;
        // Puedes usar esta función para seleccionar productos y agregarlos a la lista de productos seleccionados
        setSale({ ...sale, products: [...selectedProducts, value] });
    };

    const saveSale = async (e) => {
        e.preventDefault();

        const formData = {
            client,
            products: selectedProducts,
            fecha,
        };

        await dispatch(createSale(formData));

        navigate("/dashboard"); // Redirige a la página de ventas después de guardar la venta
    };

    useEffect(() => {
        dispatch(getProducts()); // Carga la lista de productos al montar el componente
        dispatch(getClients()); // Carga la lista de clientes al montar el componente
    }, [dispatch]);

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">Agregar nueva venta</h3>
            <SalesForm
                sale={sale}
                products={products} // Pasa la lista de productos al formulario de ventas
                clients={clients} // Pasa la lista de clientes al formulario de ventas
                availableProducts={products} // Pasa la lista de productos disponibles al formulario de ventas
                handleInputChange={handleInputChange}
                handleProductChange={handleProductChange}
                saveSale={saveSale}
            />
        </div>
    );
};

export default AddSale;
