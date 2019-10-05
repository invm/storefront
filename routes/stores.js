const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Client = require('../models/Client');
const Store = require('../models/Store');

// @route       GET api/stores
// @desc        Get orders
// @access      Private

router.get('/', auth, async (req, res) => {
  try {
    const stores = await Store.find({ client: req.client.id }).sort({
      date: -1
    });
    // Loop through every store, check every order, if delivery date is passed,
    // then change isDelivered to true, update, than send response.
    let data = {
      client: req.client,
      stores
    };
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route       POST api/stores
// @desc        Add a store
// @access      Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Please provide store name.').isString(),
      check('address', 'Please provide valid address').exists(),
      check('contact', 'Please provide contact details.').exists()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ msg: 'Bad request over here', errors: errors.array() });
    }

    const { name, address, contact, size } = req.body;

    try {
      const newStore = new Store({
        name,
        size,
        address,
        contact,
        client: req.client.id
      });
      const store = await newStore.save();
      // Add store to client
      let client = await Client.findById(req.client.id);
      client.stores.push(store);
      client.save();
      res.json(store);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route       PUT api/stores
// @desc        Update store info, add orders, cancel orders
// @access      Private

router.put('/:storeId', auth, async (req, res) => {
  const { name, address, contact, size, newOrder, updateOrder } = req.body;
  // Build shop object based on submitted fields,
  const storeFields = {};
  if (name) storeFields.name = name;
  if (address) storeFields.address = address;
  if (contact) storeFields.contact = contact;
  if (size) storeFields.size = size;
  const orderFields = {};
  if (newOrder) orderFields.newOrder = newOrder;
  if (updateOrder) orderFields.updateOrder = updateOrder;
  try {
    let store = await Store.findById(req.params.storeId);
    if (!store) return res.status(404).json({ msg: 'Store not found' });

    // Make sure client owns store
    if (store.client.toString() !== req.client.id) {
      res.status(401).json({ msg: 'Not authorized' });
    }
    if (Object.keys(orderFields).length > 0) {
      // Handle orders
      if (orderFields.newOrder) {
        // Push new order to order list
        store.orders.push(orderFields.newOrder);
        store.save();
      } else {
        // Update order by deleting it and pushing the new order to the array.
        // When updating order, must provide order id to remove.
        store.orders.id(orderFields.updateOrder._id).remove();
        store.orders.push(updateOrder);
        store.save();
      }
    }
    if (Object.keys(storeFields).length > 0) {
      // Handle store info
      store = await Store.findByIdAndUpdate(
        req.params.storeId,
        {
          $set: storeFields
        }
        // ,{ // If does not exists, create new, this line is not needed, just for reference.
        //   new: true
        // }
      );
    }

    res.json(store);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route       DELETE api/stores
// @desc        Delete store and all nested info.
// @access      Private

router.delete('/:storeId', auth, async (req, res) => {
  try {
    let store = await Store.findById(req.params.storeId);
    if (!store) {
      res.status(404).json({ msg: 'Store not found' });
    }
    if (store.client.toString() !== req.client.id) {
      res.status(401).json({ msg: 'Not authorized' });
    }
    await Store.findByIdAndRemove(req.params.storeId);
    res.json({ msg: 'Your store and all related data has been deleted.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
