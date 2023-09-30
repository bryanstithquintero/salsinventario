import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ClientForm from "../../components/client/ClientForm/ClientForm"; // Asegúrate de importar el formulario adecuado
import {
    createClient, // Asegúrate de importar la acción adecuada
    selectIsLoading,
} from "../../redux/features/client/clientSlice"; // Asegúrate de importar el slice de clientes

const initialState = {
    nombre: "",
    direccion: "",
    telefono: "",
    cartera: 0,
    // Agrega otros campos de cliente según tus necesidades
};

const AddClient = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [client, setClient] = useState(initialState);
    const isLoading = useSelector(selectIsLoading);

    const { nombre, direccion, telefono, cartera } = client;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const saveClient = async (e) => {
        e.preventDefault();

        // Asegúrate de ajustar los nombres de los campos y los datos que deseas enviar
        const formData = {
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            cartera: cartera,
            // Agrega otros campos de cliente según tus necesidades
        };

        await dispatch(createClient(formData));

        navigate("/clients"); // Puedes redirigir a la lista de clientes o a donde desees
    };

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">Agregar nuevo cliente</h3>
            <ClientForm
                client={client}
                handleInputChange={handleInputChange}
                saveClient={saveClient}
            />
        </div>
    );
};

export default AddClient;
