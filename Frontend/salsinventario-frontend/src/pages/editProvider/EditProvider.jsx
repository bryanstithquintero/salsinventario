import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProviderForm from "../../components/provider/providerForm/ProviderForm"; // Asegúrate de importar el formulario adecuado
import {
    findProvider, // Asegúrate de importar la acción adecuada
    updateProvider, // Asegúrate de importar la acción adecuada
    selectIsLoading,
    selectProvider,
} from "../../redux/features/provider/providerSlice"; // Asegúrate de importar el slice de proveedores

const EditProvider = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectIsLoading);

    const providerEdit = useSelector(selectProvider);

    const [provider, setProvider] = useState(providerEdit);

    useEffect(() => {
        dispatch(findProvider(id));
    }, [dispatch, id]);

    useEffect(() => {
        setProvider(providerEdit);
    }, [providerEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProvider({ ...provider, [name]: value });
    };

    const saveProvider = async (e) => {
        e.preventDefault();

        // Asegúrate de ajustar los nombres de los campos y los datos que deseas actualizar
        const formData = {
            nombre: provider?.nombre,
            direccion: provider?.direccion,
            telefono: provider?.telefono,
            // Agrega otros campos que desees actualizar
        };

        await dispatch(updateProvider({ id, formData }));
        navigate("/providers"); // Puedes redirigir a la lista de proveedores o a donde desees
    };

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">Edit Provider</h3>
            <ProviderForm
                provider={provider}
                handleInputChange={handleInputChange}
                saveProvider={saveProvider}
            />
        </div>
    );
};

export default EditProvider;
