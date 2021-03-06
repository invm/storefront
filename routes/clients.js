const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Client = require('../models/Client');

// @route       POST api/clients
// @desc        Register a client
// @access      Public

router.post(
  '/',
  [
    check('name', 'Plase add name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ msg: 'Bad request over here', errors: errors.array() });
    }
    const { name, company, phone, email, password } = req.body;

    try {
      let client = await Client.findOne({ email });
      if (client) {
        return res.status(400).json({
          msg: 'Email already registered, try another one.'
        });
      }

      client = new Client({
        name,
        company,
        email,
        password,
        phone,
        shops: []
      });

      const salt = await bcrypt.genSalt(10);

      client.password = await bcrypt.hash(password, salt);

      await client.save();

      const payload = {
        client: {
          id: client.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route       PUT api/clients:id
// @desc        Edit a client, add shops and orders
// @access      Private

router.put('/:id', (req, res) => {
  res.json(req.params.id);
});

module.exports = router;
