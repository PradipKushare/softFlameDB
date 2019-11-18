var express = require('express');
var router = express.Router();
var newsPwdCntrl = require('../controller/news_controller');
 
 router.post('/add_news_data',newsPwdCntrl.add_news_data);
 router.get('/get_news_data',newsPwdCntrl.get_news_data);

	
	module.exports = router;