var express = require('express');
var router = express.Router();
const verifyToken = require('../controller/jwt_verify_function')

var registerCntrl = require('../controller/register_controller');
var loginCntrl = require('../controller/login_controller');
var forgotPwdCntrl = require('../controller/forgot_pwd_controller');
var updatePwdCntrl = require('../controller/update_pwd_controller');
var newsPwdCntrl = require('../controller/news_controller');
var dashboardCntrl = require('../controller/dashboard_controller');
var testCntrl = require('../controller/test_controller');
var maintestCntrl = require('../controller/test_question_controller');
var testreportCntrl = require('../controller/testreport_controller');

 router.post('/register',registerCntrl.register);
 router.post('/login',loginCntrl.login);
 router.post('/forgot_password',forgotPwdCntrl.forgot_password);
 router.post('/update_password',updatePwdCntrl.update_password);
 router.post('/update_profile',loginCntrl.update_profile);
 router.post('/update_profile_pics',loginCntrl.update_profile_pics);
 router.post('/change_login_password',updatePwdCntrl.change_login_password);
 router.post('/get_profile_pics',registerCntrl.get_profile_pics);
 router.get('/get_user_profile',registerCntrl.get_user_profile);

 router.post('/add_dashboard_data',dashboardCntrl.add_dashboard_data);
 router.get('/get_dashboard_data',verifyToken, dashboardCntrl.get_dashboard_data);

 router.post('/add_test_data',testCntrl.add_test_data);
 router.post('/get_test_data',testCntrl.get_test_data);
 router.get('/get_test_data_all',testCntrl.get_test_data_all);
 router.get('/set_test_status',testCntrl.set_test_status);


 router.post('/add_news_data',newsPwdCntrl.add_news_data);
 router.post('/add_question_test_data',maintestCntrl.add_question_test_data);
 router.post('/get_question_test_data',maintestCntrl.get_question_test_data);
 router.post('/save_question_answers',testreportCntrl.save_question_answers);
 router.post('/get_test_report',testreportCntrl.get_test_report);

		module.exports = router;