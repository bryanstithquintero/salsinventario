const express = require('express');
const router = express.Router();
const {
    createSale,
    getSales,
    findSale,
    deleteSale,
    updateSale
} = require('../controllers/saleController');

router.post('/', createSale);
router.get('/', getSales);
router.get('/:id', findSale);
router.patch('/:id', updateSale);
router.delete('/:id', deleteSale);

module.exports = router;