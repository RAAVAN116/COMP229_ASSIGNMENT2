// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET all products
router.get('/', productController.getAllProducts);

// GET a product by ID
router.get('/:id', productController.getProductById);

// POST create a new product
router.post('/', productController.createProduct);

// PUT update a product by ID
router.put('/:id', productController.updateProduct);

// DELETE a product by ID
router.delete('/:id', productController.deleteProduct);

// DELETE all products
router.delete('/', productController.deleteAllProducts);

// GET products by name (keyword search)
router.get('/', productController.getProductsByName);

module.exports = router;