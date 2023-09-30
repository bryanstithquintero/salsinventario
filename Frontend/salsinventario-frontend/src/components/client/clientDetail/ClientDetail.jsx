import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findClient } from "../../../redux/features/client/clientSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ClientDetail.scss";
import { Link } from "react-router-dom";

const ClientDetail = () => {
    const dispatch = useDispatch();

    const { id } = useParams();
    const { client, isLoading, isError, message } = useSelector(
        (state) => state.client
    );

    useEffect(() => {
        dispatch(findClient(id));
    }, [isError, message, dispatch]);

    return (
        <div className="client-detail">
            <h3 className="--mt">Detalle del cliente</h3>
            <Card cardClass="card">
                {isLoading && <SpinnerImg />}
                {client && (
                    <div className="detail">
                        <h4>
                            <span className="badge">Nombre: </span> &nbsp; {client.nombre}
                        </h4>
                        <p>
                            <b>&rarr; Dirección : </b> {client.direccion}
                        </p>
                        <p>
                            <b>&rarr; Teléfono : </b> {client.telefono}
                        </p>
                        <p>
                            <b>&rarr; Cartera : </b> {client.cartera}
                        </p>
                        <hr />

                        <hr />
                        <code className="--color-dark">
                            Created on: {client.createdAt.toLocaleString("en-US")}
                        </code>
                        <br />
                        <code className="--color-dark">
                            Last Updated: {client.updatedAt.toLocaleString("en-US")}
                        </code>
                        <br />
                        <br />
                        <button className="--align-center --bg-dark"> <Link to={`/edit-client/${client._id}`}> ver compras </Link> </button>
                    </div>

                )}
            </Card>
        </div>
    );
};

export default ClientDetail;
