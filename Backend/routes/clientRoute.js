const express = require('express');
const router = express.Router();
const {
    createClient,
    getClients,
    findClient,
    deleteClient,
    updateClient,
    findClientWithSales
} = require('../controllers/clientController');

router.post('/', createClient);
router.get('/', getClients);
router.get('/:id', findClient);
router.patch('/:id', updateClient);
router.delete('/:id', deleteClient);
router.get('/:id/sales', findClientWithSales);

module.exports = router;