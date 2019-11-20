var express = require('express');
var router = express.Router();
var testController = require('../../controller/sub_controller/test_list_controller');


 	router.post('/add_test',testController.add_test);
 	router.post('/get_user_test_data',testController.get_user_test_data);
 	

module.exports = router;