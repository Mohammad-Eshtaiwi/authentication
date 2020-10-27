const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../middlewares/bearerMiddleware');

router.get('/', bearerMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;
