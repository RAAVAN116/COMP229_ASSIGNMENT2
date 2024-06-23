// controllers/productController.js

const Product = require('../models/Product');

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET a product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE a new product
const createProduct = async (req, res) => {
  const { name, description, price, quantity, category } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      category
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE a product by ID
const updateProduct = async (req, res) => {
  const { name, description, price, quantity, category } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
      quantity,
      category,
      updatedAt: Date.now()
    }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE all products
const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET products by name (keyword search)
const getProductsByName = async (req, res) => {
  const { name } = req.query;
  try {
    const products = await Product.find({ name: { $regex: new RegExp(name, 'i') } });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  getProductsByName
};