const mongoose = require('mongoose');

const saleSchema = mongoose.Schema(
    {
        productos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
            },
        ],
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'client',
        },
        fecha: {
            type: Date,
            default: Date.now,
        },
        total: {
            type: Number,
            required: [true, "Por favor, añade el total de la venta"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;