import React, { useState, useEffect } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./ProviderList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import providerService from "../../../redux/features/provider/providerService";

const ProviderList = ({ providers }) => {
    const [search, setSearch] = useState("");
    const [filteredProviders, setFilteredProviders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat("...");
            return shortenedText;
        }
        return text;
    };

    const delProvider = async (id) => {
        console.log(id);
        // Implement your delete logic here

        try {
            await providerService.deleteProvider(id); // Utiliza la función de eliminación del servicio
            // Luego puedes actualizar la lista de proveedores llamando nuevamente a la función getProviders
            const updatedProviders = await providerService.getProviders();
            setFilteredProviders(updatedProviders);
        } catch (error) {
            console.error("Error al eliminar el proveedor: ", error);
        }
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: "Delete Provider",
            message: "Are you sure you want to delete this provider?",
            buttons: [
                {
                    label: "Delete",
                    onClick: () => delProvider(id),
                },
                {
                    label: "Cancel",
                },
            ],
        });
    };

    useEffect(() => {
        // Filter the providers based on the search input
        const filtered = providers.filter((provider) =>
            provider.nombre.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProviders(filtered);
        setIsLoading(false);
    }, [providers, search]);

    return (
        <div className="provider-list">
            <hr />
            <div className="table">
                <div className="--flex-between --flex-dir-column">
                    <span>
                        <h3>Proveedores</h3>
                    </span>
                    <span>
                        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                    </span>
                </div>

                {isLoading && <SpinnerImg />}

                <div className="table">
                    {!isLoading && filteredProviders.length === 0 ? (
                        <p>-- Sin proveedores, agrega proveedores...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>s/n</th>
                                    <th>Nombre</th>
                                    <th>Dirección</th>
                                    <th>Teléfono</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredProviders.map((provider, index) => {
                                    const { _id, nombre, direccion, telefono } = provider;
                                    return (
                                        <tr key={_id}>
                                            <td>{index + 1}</td>
                                            <td>{shortenText(nombre, 16)}</td>
                                            <td>{shortenText(direccion, 16)}</td>
                                            <td>{telefono}</td>
                                            <td className="icons">
                                                <span>
                                                    <Link to={`/provider-detail/${_id}`}>
                                                        <AiOutlineEye size={25} color={"purple"} />
                                                    </Link>
                                                </span>
                                                <span>
                                                    <Link to={`/edit-provider/${_id}`}>
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

export default ProviderList;
