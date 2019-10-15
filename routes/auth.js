const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const Client = require('../models/Client');

// @route       GET api/auth
// @desc        Auth client and get token
// @access      Private

router.get('/', auth, async (req, res) => {
  try {
    const client = await Client.findById(req.client.id)
      .select('-password')
      .select('-__v');
    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route       POST api/auth
// @desc        Auth client and get token
// @access      Public

router.post(
  '/',
  [
    check('email', 'Please provide an email.').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ msg: 'Bad request ', errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let client = await Client.findOne({ email });
      if (!client) {
        return res.status(400).json({
          msg: 'Invalid credentials.'
        });
      }

      const isMatch = await bcrypt.compare(password, client.password);

      if (!isMatch) {
        return res.status(400).json({
          msg: 'Invalid credentials.'
        });
      }

      const payload = {
        client: {
          id: client._id
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

module.exports = router;
