const dashboardModel = require('../model/dashboard_modal').dashboardModel
const verifyToken = require('../controller/jwt_verify_function')
const config_secret_key = require('../helpers/jwt_secreat')
const jwt = require('jsonwebtoken')


const add_dashboard_data = (req,res)=>{
    const dashboard = new dashboardModel();
        dashboard.testGiven = req.body.testGiven;
        dashboard.testPerformance = req.body.testPerformance;
        dashboard.questionTime = req.body.questionTime;
        dashboard.testOverview = req.body.testOverview;

        dashboard.save((err, dashboardData) => {
        if (err){ throw err;}
        res.json({success : true,data:dashboardData})
    })
}

const get_dashboard_data = (req,res)=>{
    var sess = req.session;
   
    jwt.verify(req.token, config_secret_key.secret_key, function(err, decoded) {
      if (typeof decoded  !== undefined) {
        dashboardModel.findOne((err, dashboardData) => {
        if (err){ throw err;}
        if (dashboardData) {
            res.json({ success:true,data:dashboardData });
        }else{
            res.json({ success:false,data:[] });
            }
        })
      }else{
          res.json({ success:false,data:[] });
        }
    });
}

module.exports = {
    add_dashboard_data,
    get_dashboard_data
}