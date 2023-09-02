const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    findProduct,
    deleteProduct,
    updateProduct,
} = require("../controllers/productController");

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", findProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;