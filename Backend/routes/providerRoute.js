const express = require('express');
const router = express.Router();
const {
    createProvider,
    getAllProviders,
    getProviderById,
    updateProvider,
    deleteProvider,
    addPurchaseToProvider,
} = require('../controllers/providerController');

// Ruta para crear un nuevo proveedor
router.post('/', createProvider);

// Ruta para obtener todos los proveedores
router.get('/', getAllProviders);

// Ruta para obtener un proveedor por su ID
router.get('/:id', getProviderById);

// Ruta para actualizar un proveedor por su ID
router.patch('/:id', updateProvider);

// Ruta para eliminar un proveedor por su ID
router.delete('/:id', deleteProvider);

// Ruta para agregar una compra a un proveedor por su ID
router.post('/:id/add-purchase', addPurchaseToProvider);

module.exports = router;
