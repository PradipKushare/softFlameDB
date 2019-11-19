var express = require('express');
var router = express.Router();
var userGivenTestController = require('../../controller/sub_controller/user_given_test_controller');

 	router.post('/add_user_given_test',userGivenTestController.add_user_given_test);

module.exports = router;