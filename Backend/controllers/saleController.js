const asyncHandler = require("express-async-handler");
const Sale = require("../models/SaleModel");
const Client = require("../models/ClientModel");
const Product = require("../models/ProductModel");

//crear venta
const createSale = asyncHandler(async (req, res) => {
    const { products, client, fecha, total } = req.body;

    if (!products || !client || !fecha || !total) {
        res.status(400);
        throw new Error("Por favor, llene todos los campos");
    }


    // Recorre la lista de productos vendidos
    for (const { _id, quantity } of products) {
        // Actualiza la cantidad disponible del producto
        const product = await Product.findById(_id);

        const currentQuantity = parseInt(product.quantity, 10);
        const quantityAsNumber = parseInt(quantity, 10);

        if (product.quantity >= quantityAsNumber) {
            product.quantity = (currentQuantity - quantityAsNumber).toString();

            await product.save();
        } else {
            return res.status(400).json({
                error: `No hay suficientes unidades de ${product.name}`,
            });
        }
    }


    const sale = await Sale.create({
        client,
        products,
        total,
    });

    const updatedClient = await Client.findByIdAndUpdate(
        client,
        { $push: { ventas: sale._id } },
        { new: true, runValidators: true }
    );

    if (!updatedClient) {
        return res.status(404).json({ error: "Cliente no encontrado" });
    };

    res.status(201).json(sale);
});

//obtener todas las ventas
const getSales = asyncHandler(async (req, res) => {
    const sales = await Sale.find().sort("-createdAt");
    res.status(200).json(sales);
});

//obtener una venta por id 
const findSale = asyncHandler(async (req, res) => {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
        return res.status(404).json({ error: "Venta no encontrada" });
    }
    res.status(200).json(sale);
});

//actualizar una venta por id
const updateSale = asyncHandler(async (req, res) => {
    const { products, client, fecha, total } = req.body;
    const updatedSale = await Sale.findByIdAndUpdate(
        req.params.id,
        { products, client, fecha, total },
        { new: true, runValidators: true }
    );
    if (!updatedSale) {
        return res.status(404).json({ error: "Venta no encontrada" });
    }
    res.status(200).json(updatedSale);
});

//borrar una venta por id
const deleteSale = asyncHandler(async (req, res) => {
    const deletedSale = await Sale.findByIdAndRemove(req.params.id);
    if (!deletedSale) {
        return res.status(404).json({ error: "Venta no encontrada" });
    }
    res.status(200).json(deletedSale);
});

//obtener ventas por cliente
const getSalesFromClient = asyncHandler(async (req, res) => {
    const sales = await Sale.find({ client: req.params.id });
    if (!sales) {
        return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.status(200).json(sales);
});

module.exports = {
    createSale,
    getSales,
    findSale,
    updateSale,
    deleteSale,
    getSalesFromClient,
};