const asyncHandler = require("express-async-handler");
const Provider = require("../models/ProviderModel");

// Controlador para crear un nuevo proveedor
exports.createProvider = asyncHandler(async (req, res) => {
    const { nombre, direccion, telefono } = req.body;
    const provider = new Provider({ nombre, direccion, telefono });
    const savedProvider = await provider.save();
    res.status(201).json(savedProvider);
});

// Controlador para obtener todos los proveedores
exports.getAllProviders = asyncHandler(async (req, res) => {
    const providers = await Provider.find();
    res.json(providers);
});

// Controlador para obtener un proveedor por ID
exports.getProviderById = asyncHandler(async (req, res) => {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json(provider);
});

// Controlador para actualizar un proveedor por ID
exports.updateProvider = asyncHandler(async (req, res) => {
    const { nombre, direccion, telefono } = req.body;
    const updatedProvider = await Provider.findByIdAndUpdate(
        req.params.id,
        { nombre, direccion, telefono },
        { new: true }
    );
    if (!updatedProvider) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json(updatedProvider);
});

// Controlador para eliminar un proveedor por ID
exports.deleteProvider = asyncHandler(async (req, res) => {
    const deletedProvider = await Provider.findByIdAndRemove(req.params.id);
    if (!deletedProvider) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json(deletedProvider);
});

// Controlador para agregar una compra a un proveedor
exports.addPurchaseToProvider = asyncHandler(async (req, res) => {
    const { fecha, cantidad, descripcion } = req.body;
    const providerId = req.params.id; // Obtén el ID del proveedor de la solicitud

    // Encuentra el proveedor por su ID
    const provider = await Provider.findById(providerId);

    if (!provider) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
    }

    // Agrega la compra al campo 'compras' del proveedor
    provider.compras.push({
        fecha,
        cantidad,
        descripcion,
    });

    // Guarda los cambios en el proveedor
    const updatedProvider = await provider.save();

    res.status(201).json(updatedProvider);
});