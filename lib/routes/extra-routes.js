const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../middlewares/bearerMiddleware');
const permissions = require('../middlewares/authorize');

router.get('/', bearerMiddleware, (req, res) => {
  res.json(req.user);
});
router.get('/read', bearerMiddleware, permissions('read'), response);
router.post('/add', bearerMiddleware, permissions('create'), (req, res) => {
  res.status(201).json('done!');
});
router.put('/change', bearerMiddleware, permissions('update'), response);
router.delete('/remove', bearerMiddleware, permissions('delete'), response);

module.exports = router;
function response(req, res) {
  console.log('hhahahahahah');
  res.status(200).json('done!');
}
