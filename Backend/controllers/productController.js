const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");

const createProduct = asyncHandler(async (req, res) => {
    const { name, id_p, quantity, price, description, image } = req.body;

    //   Validation
    if (!name || !id_p || !quantity || !price || !description || !image) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    const product = await Product.create({
        name,
        id_p,
        quantity,
        price,
        description,
        image
    });

    res.status(201).json(product);
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().sort("-createdAt");
    res.status(200).json(products);
});

const findProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    // if product doesnt exist
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
    const { name, id_p, quantity, price, description, image } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id);

    // if product doesnt exist
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id },
        {
            name, id_p, quantity, price, description, image
        },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    // if product doesnt exist
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted." });
});

module.exports = {
    createProduct,
    getProducts,
    findProduct,
    updateProduct,
    deleteProduct,
};