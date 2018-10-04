const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

controller();

router.get('/', function(req, res, next) {
  res.send({"Last minute Bitcoin SMA": controller.varsBTC.lastSMA
           ,"Last minute Ethereum SMA": controller.varsETH.lastSMA})
});

module.exports = router;