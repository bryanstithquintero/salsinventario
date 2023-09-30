import React from "react";
import Card from "../../card/Card";
import "./ClientForm.scss";

const ClientForm = ({
    client,
    handleInputChange,
    saveClient,
}) => {
    return (
        <div className="add-client">
            <Card cardClass={"card"}>
                <form onSubmit={saveClient}>
                    <label>Nombre del cliente:</label>
                    <input
                        type="text"
                        placeholder="Nombre del cliente"
                        name="nombre"
                        value={client?.nombre}
                        onChange={handleInputChange}
                    />

                    <label>Dirección del cliente:</label>
                    <input
                        type="text"
                        placeholder="Dirección del cliente"
                        name="direccion"
                        value={client?.direccion}
                        onChange={handleInputChange}
                    />

                    <label>Teléfono del cliente:</label>
                    <input
                        type="text"
                        placeholder="Teléfono del cliente"
                        name="telefono"
                        value={client?.telefono}
                        onChange={handleInputChange}
                    />
                    <label>Cartera del cliente:</label>
                    <input
                        type="number"
                        name="cartera"
                        value={client?.cartera}
                        onChange={handleInputChange}
                    />

                    <div className="--my">
                        <button type="submit" className="--btn --btn-primary">
                            Guardar
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ClientForm;
