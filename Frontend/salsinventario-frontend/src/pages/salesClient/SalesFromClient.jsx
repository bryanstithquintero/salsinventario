import React, { useState, useEffect } from 'react';
import SalesList from '../../components/sales/SalesList'; // Importa el nuevo componente SalesList
import salesService from '../../redux/features/sale/saleService'; // Importa el servicio de ventas
import { useParams } from 'react-router-dom';

const SalesPage = () => {
    const { clientId } = useParams();
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                // Realiza una solicitud para obtener la lista de ventas para el cliente específico
                const fetchedSales = await salesService.getSalesFromClient(clientId);
                setSales(fetchedSales.sales);
                setIsLoading(false);
            } catch (error) {
                console.error('Error al obtener la lista de ventas: ', error);
                setIsLoading(false);
            }
        };

        fetchSales(); // Llama a la función para obtener la lista de ventas

    }, [clientId]);

    return (
        <div>
            <h1>Lista de ventas</h1>
            <SalesList sales={sales} isLoading={isLoading} />
        </div>
    );
};

export default SalesPage;
