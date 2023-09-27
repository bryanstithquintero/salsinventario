import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProviderForm from "../../components/provider/ProviderForm/ProviderForm"; // Asegúrate de importar el formulario adecuado
import {
    createProvider, // Asegúrate de importar la acción adecuada
    selectIsLoading,
} from "../../redux/features/provider/providerSlice"; // Asegúrate de importar el slice de proveedores

const initialState = {
    nombre: "",
    direccion: "",
    telefono: "",
    // Agrega otros campos de proveedor según tus necesidades
};

const AddProvider = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [provider, setProvider] = useState(initialState);
    const isLoading = useSelector(selectIsLoading);

    const { nombre, direccion, telefono } = provider;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProvider({ ...provider, [name]: value });
    };

    const saveProvider = async (e) => {
        e.preventDefault();

        // Asegúrate de ajustar los nombres de los campos y los datos que deseas enviar
        const formData = {
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            // Agrega otros campos de proveedor según tus necesidades
        };

        await dispatch(createProvider(formData));

        navigate("/providers"); // Puedes redirigir a la lista de proveedores o a donde desees
    };

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">Agregar nuevo proveedor</h3>
            <ProviderForm
                provider={provider}
                handleInputChange={handleInputChange}
                saveProvider={saveProvider}
            />
        </div>
    );
};

export default AddProvider;
