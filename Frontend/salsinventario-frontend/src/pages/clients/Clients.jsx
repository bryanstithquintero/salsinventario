import React, { useState, useEffect } from "react";
import ClientList from "../../components/client/clientList/ClientList"; // Asegúrate de importar el componente adecuado para la lista de clientes
import clientService from "../../redux/features/client/clientService"; // Importa el servicio de clientes
import { Link } from "react-router-dom";

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                // Realiza una solicitud para obtener la lista de clientes desde tu servicio
                const fetchedClients = await clientService.getClients();
                setClients(fetchedClients);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener la lista de clientes: ", error);
                setIsLoading(false);
            }
        };

        fetchClients(); // Llama a la función para obtener la lista de clientes

    }, []);

    return (
        <div>
            <ClientList clients={clients} isLoading={isLoading} />
            <Link to="/add-client" className="--btn --bg-primary"> Agregar Cliente </Link>
        </div>
    );
};

export default Clients;

