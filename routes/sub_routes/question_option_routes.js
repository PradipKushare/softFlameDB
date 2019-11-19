var express = require('express');
var router = express.Router();
var quesOptionController = require('../../controller/sub_controller/question_option_controller');

 	router.post('/add_options',quesOptionController.add_options);

module.exports = router;