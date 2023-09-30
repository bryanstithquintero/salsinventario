import React, { useState, useEffect } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./ClientList.scss"; // Asegúrate de importar el archivo SCSS adecuado
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import clientService from "../../../redux/features/client/clientService"; // Importa el servicio de clientes

const ClientList = ({ clients }) => {
    const [search, setSearch] = useState("");
    const [filteredClients, setFilteredClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat("...");
            return shortenedText;
        }
        return text;
    };

    const delClient = async (id) => {
        console.log(id);
        // Implementa tu lógica de eliminación aquí

        try {
            await clientService.deleteClient(id); // Utiliza la función de eliminación del servicio de clientes
            // Luego puedes actualizar la lista de clientes llamando nuevamente a la función getClientList
            const updatedClients = await clientService.getClients();
            setFilteredClients(updatedClients);
        } catch (error) {
            console.error("Error al eliminar el cliente: ", error);
        }
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: "Eliminar Cliente",
            message: "¿Estás seguro de que quieres eliminar este cliente?",
            buttons: [
                {
                    label: "Eliminar",
                    onClick: () => delClient(id),
                },
                {
                    label: "Cancelar",
                },
            ],
        });
    };

    useEffect(() => {
        // Filtra los clientes en función de la entrada de búsqueda
        const filtered = clients.filter((client) =>
            client.nombre.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredClients(filtered);
        setIsLoading(false);
    }, [clients, search]);

    return (
        <div className="client-list">
            <hr />
            <div className="table">
                <div className="--flex-between --flex-dir-column">
                    <span>
                        <h3>Clientes</h3>
                    </span>
                    <span>
                        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                    </span>
                </div>

                {isLoading && <SpinnerImg />}

                <div className="table">
                    {!isLoading && filteredClients.length === 0 ? (
                        <p>-- Sin clientes, agrega clientes...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>s/n</th>
                                    <th>Nombre</th>
                                    <th>Dirección</th>
                                    <th>Teléfono</th>
                                    <th>Cartera</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredClients.map((client, index) => {
                                    const { _id, nombre, direccion, telefono, cartera } = client;
                                    return (
                                        <tr key={_id}>
                                            <td>{index + 1}</td>
                                            <td>{shortenText(nombre, 16)}</td>
                                            <td>{shortenText(direccion, 16)}</td>
                                            <td>{telefono}</td>
                                            <td>{cartera}</td>
                                            <td className="icons">
                                                <span>
                                                    <Link to={`/client-detail/${_id}`}>
                                                        <AiOutlineEye size={25} color={"purple"} />
                                                    </Link>
                                                </span>
                                                <span>
                                                    <Link to={`/edit-client/${_id}`}>
                                                        <FaEdit size={20} color={"green"} />
                                                    </Link>
                                                </span>
                                                <span>
                                                    <FaTrashAlt
                                                        size={20}
                                                        color={"red"}
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

export default ClientList;
