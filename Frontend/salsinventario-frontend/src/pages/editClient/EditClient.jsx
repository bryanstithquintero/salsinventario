import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ClientForm from "../../components/client/ClientForm/ClientForm";
import {
    findClient,
    updateClient,
    selectIsLoading,
    selectClient,
} from "../../redux/features/client/clientSlice";

const EditClient = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectIsLoading);

    const clientEdit = useSelector(selectClient);

    const [client, setClient] = useState(clientEdit);

    useEffect(() => {
        dispatch(findClient(id));
    }, [dispatch, id]);

    useEffect(() => {
        setClient(clientEdit);
    }, [clientEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const saveClient = async (e) => {
        e.preventDefault();


        const formData = {
            nombre: client?.nombre,
            direccion: client?.direccion,
            telefono: client?.telefono,
            cartera: client?.cartera,

        };

        await dispatch(updateClient({ id, formData }));
        navigate("/clients");
    };

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">Editar Cliente</h3>
            <ClientForm
                client={client}
                handleInputChange={handleInputChange}
                saveClient={saveClient}
            />
            <button className="--btn --btn-danger" onClick={() => navigate("/clients")}> Cancelar </button>
        </div>
    );
};

export default EditClient;
