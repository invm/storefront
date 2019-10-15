const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

// @route       GET api/products
// @desc        Get products
// @access      Public

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route       POST api/products
// @desc        Add products
// @access      Private, only to be used by me, to populate the db

router.post('/', async (req, res) => {
  const products = req.body.products;

  try {
    products.forEach(product => {
      const { name, price, category, quantityInBox, supplier } = product;
      const newProduct = new Product({
        name,
        price,
        category,
        quantityInBox,
        supplier
      });
      newProduct.save();
    });

    let result = await Product.find();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
