import React, { useState, useEffect } from "react";
import ProviderList from "../../components/provider/providerList/ProviderList";
import providerService from "../../redux/features/provider/providerService"; // Importa el servicio de proveedores
import { Link } from "react-router-dom";

const Providers = () => {
    const [providers, setProviders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                // Realiza una solicitud para obtener la lista de proveedores desde tu servicio
                const fetchedProviders = await providerService.getProviders();
                setProviders(fetchedProviders);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener la lista de proveedores: ", error);
                setIsLoading(false);
            }
        };

        fetchProviders(); // Llama a la función para obtener la lista de proveedores

    }, []);

    return (
        <div>
            <ProviderList providers={providers} isLoading={isLoading} />
            <Link to="/add-provider" className="--btn --bg-primary"> Agregar Proveedor </Link>
        </div>

    );
};

export default Providers;