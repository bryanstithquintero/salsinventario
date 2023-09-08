const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    findProduct,
    deleteProduct,
    updateProduct,
} = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");

router.post("/", upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", findProduct);
router.patch("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;