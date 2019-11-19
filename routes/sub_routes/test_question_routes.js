var express = require('express');
var router = express.Router();
var quesOptionController = require('../../controller/sub_controller/test_question_controller');

 	router.post('/add_test_question',quesOptionController.add_test_question);

module.exports = router;