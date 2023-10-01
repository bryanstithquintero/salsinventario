const express = require('express');
const router = express.Router();
const {
    createSale,
    getSales,
    findSale,
    deleteSale,
    updateSale,
    getSalesFromClient
} = require('../controllers/saleController');

router.post('/', createSale);
router.get('/', getSales);
router.get('/:id', findSale);
router.patch('/:id', updateSale);
router.delete('/:id', deleteSale);
router.get('/client/:id', getSalesFromClient);


module.exports = router;