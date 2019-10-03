const express = require('express');

const router = express.Router();

// @route       POST api/clients
// @desc        Register a client
// @access      Public

router.post('/', (req, res) => {
  res.json({
    msg: 'This is a POST request for api/clients'
  });
});

module.exports = router;
