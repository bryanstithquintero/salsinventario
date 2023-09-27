import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { findProvider } from "../../../redux/features/provider/providerSlice"; // Importa la acción findProvider
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProviderDetail.scss";

const ProviderDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    // Obtén el estado y la información del proveedor del store
    const { provider, isLoading, isError, message } = useSelector(
        (state) => state.provider
    );

    useEffect(() => {
        // Llama a la acción findProvider para cargar los detalles del proveedor
        dispatch(findProvider(id));
    }, [id, isError, message, dispatch]);

    return (
        <div className="provider-detail">
            <h3 className="--mt">Detalle del proveedor</h3>
            <Card cardClass="card">
                {isLoading && <SpinnerImg />}
                {provider && (
                    <div className="detail">
                        <h4>
                            <span className="badge">Nombre: </span> &nbsp; {provider.nombre}
                        </h4>
                        <p>
                            <b>&rarr; Dirección : </b> {provider.direccion}
                        </p>
                        <p>
                            <b>&rarr; Teléfono : </b> {provider.telefono}
                        </p>
                        <Link to={`/provider/${id}/purchases`}>
                            {/* Agrega un botón para ver las compras */}
                            <button>Ver Compras</button>
                        </Link>
                    </div>
                )
                }
            </Card >
        </div >
    );
};

export default ProviderDetail;