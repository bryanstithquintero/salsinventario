const mongoose = require('mongoose');

const clientSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "Por favor, añade el nombre del cliente"],
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
        cartera: {
            type: Number,
            required: [true, "Por favor, añade la cartera del cliente"],
            trim: true,
        },
        ventas: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'sale',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;