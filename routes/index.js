var express = require('express');
var router = express.Router();

/* GET entrypoint. */
router.get('/', function(req, res, next) {
  res.send({ messege: 'Welcome to the SMA api, please refer to the readme for valid endpoints.'});
});

module.exports = router;