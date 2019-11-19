var express = require('express');
var router = express.Router();
var testController = require('../../controller/sub_controller/test_controller');

 	router.post('/add_test',testController.add_test);

module.exports = router;