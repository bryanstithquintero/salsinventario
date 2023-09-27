import React from "react";
import Card from "../../card/Card";

import "./ProviderForm.scss";

const ProviderForm = ({
    provider,
    handleInputChange,
    saveProvider,
}) => {
    return (
        <div className="add-provider">
            <Card cardClass={"card"}>
                <form onSubmit={saveProvider}>
                    <Card cardClass={"group"}>
                        <label>Nombre del proveedor:</label>
                        <input
                            type="text"
                            placeholder="Nombre del proveedor"
                            name="nombre"
                            value={provider?.nombre}
                            onChange={handleInputChange}
                        />
                    </Card>
                    <Card cardClass={"group"}>
                        <label>Dirección del proveedor:</label>
                        <input
                            type="text"
                            placeholder="Dirección del proveedor"
                            name="direccion"
                            value={provider?.direccion}
                            onChange={handleInputChange}
                        />
                    </Card>
                    <Card cardClass={"group"}>
                        <label>Teléfono del proveedor:</label>
                        <input
                            type="text"
                            placeholder="Teléfono del proveedor"
                            name="telefono"
                            value={provider?.telefono}
                            onChange={handleInputChange}
                        />
                    </Card>
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

export default ProviderForm;
