const mongoose = require("mongoose");

const providerSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "Por favor, añade el nombre del proveedor"],
            trim: true,
        },
        direccion: {
            type: String,
            required: [true, "Por favor, añade la dirección del proveedor"],
            trim: true,
        },
        telefono: {
            type: String,
            required: [true, "Por favor, añade el teléfono del proveedor"],
            trim: true,
        },
        compras: [
            {
                fecha: Date,
                cantidad: Number,
                descripcion: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Provider = mongoose.model("Provider", providerSchema);
module.exports = Provider;
