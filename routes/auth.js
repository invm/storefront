const express = require('express');

const router = express.Router();

// @route       GET api/auth
// @desc        Register a client
// @access      Public

router.get('/', (req, res) => {
  res.json({
    msg: 'This is a POST request for api/auth'
  });
});

module.exports = router;
