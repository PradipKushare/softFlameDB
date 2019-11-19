var express = require('express');
var router = express.Router();
var quesController = require('../../controller/sub_controller/question_controller');

 	router.post('/add_questions',quesController.add_questions);

module.exports = router;