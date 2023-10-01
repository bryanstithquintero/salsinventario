import React, { useEffect, useState } from 'react';
import { SpinnerImg } from '../../components/loader/Loader';
import './SalesList.scss'; // Asegúrate de importar el archivo SCSS adecuado
import { FaTrashAlt } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import clientService from '../../redux/features/client/clientService';
import salesService from '../../redux/features/sale/saleService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';

const SalesList = ({ sales }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [clients, setClients] = useState([]);

    const deleteSale = async (id) => {
        console.log(id);
        // Implementa tu lógica de eliminación aquí

        try {
            await salesService.deleteSale(id); // Utiliza la función de eliminación del servicio de ventas
            const updatedSales = await salesService.getSales();
            setSales(updatedSales);
        } catch (error) {
            console.error('Error al eliminar la venta: ', error);
        }
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Eliminar Venta',
            message: '¿Estás seguro de que quieres eliminar esta venta?',
            buttons: [
                {
                    label: 'Eliminar',
                    onClick: () => deleteSale(id),
                },
                {
                    label: 'Cancelar',
                },
            ],
        });
    };

    useEffect(() => {
        if (Array.isArray(sales) && sales.length > 0) {
            setIsLoading(false);
        } else {
            setIsLoading(false); // Otra lógica que necesites si sales es indefinido o está vacío
        }
    }, [sales]);

    return (
        <div className="sales-list">
            <hr />
            <div className="table">
                <div className="--flex-between --flex-dir-column">
                    <span>
                        <h3>Ventas</h3>
                    </span>
                </div>

                {isLoading && <SpinnerImg />}

                <div className="table">
                    {!isLoading && sales.length === 0 ? (
                        <p>-- Sin ventas registradas --</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>s/n</th>
                                    {/* Agrega aquí las columnas necesarias para mostrar la información de las ventas */}
                                    {/* Ejemplo: <th>Fecha</th> */}
                                    {/* Ejemplo: <th>Total</th> */}
                                    {/* Ejemplo: <th>Acción</th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {sales.map((sale, index) => {
                                    const { _id } = sale;
                                    return (
                                        <tr key={_id}>
                                            <td>{index + 1}</td>
                                            {/* Agrega aquí las celdas para mostrar la información de las ventas */}
                                            {/* Ejemplo: <td>{sale.fecha}</td> */}
                                            {/* Ejemplo: <td>{sale.total}</td> */}
                                            <td className="icons">
                                                <span>
                                                    <Link to={`/sale-detail/${_id}`}>
                                                        <AiOutlineEye size={25} color={'purple'} />
                                                    </Link>
                                                </span>
                                                <span>
                                                    <FaTrashAlt
                                                        size={20}
                                                        color={'red'}
                                                        onClick={() => confirmDelete(_id)}
                                                    />
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalesList;

