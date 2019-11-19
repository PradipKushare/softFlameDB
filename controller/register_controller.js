const studModel = require('../model/register_model').studModel
var crypto = require('crypto'); 
var localStorage = require('localStorage')


const register= (req,res)=>{
    const student = new studModel();
    var chkPwd = crypto.createHash('md5').update(req.body.password).digest("hex");

    student.firstname = req.body.firstname;
    student.lastname = req.body.lastname;
    student.gender = req.body.gender;
    student.dob = req.body.dob;
    student.address = req.body.address;
    student.state = req.body.state;
    student.district = req.body.district;
    student.pincode = req.body.pincode;
    student.mobile_no = req.body.mobile_no;
    student.email = req.body.email;
    student.password = chkPwd;

    studModel.findOne({ 'email': req.body.email }, (err, data) => {
        if (err){ throw err;}
        if (data) {
            res.json({ success: false, msg: 'student already exists' })
        }else {
            student.save((err, studentData) => {
                if (err){ throw err;}
                res.json({success : true , msg : 'Registration successfully!', data: studentData})
            })
        }
    })
}

const get_user_profile = (req,res)=>{
    var sess = req.session;
    console.log(sess)
   var sess_user_id = localStorage.getItem('node_session_id');
    studModel.find({'_id':sess_user_id}, (err, data) => {
        if (err){ throw err;}
        res.json({success : true,data:data[0]})
    })
}

const get_profile_pics = (req,res)=>{
    var sess = req.session;
        console.log(sess)
    var sess_user_id = localStorage.getItem('node_session_id');
    console.log('sess_user_id:'+sess_user_id);

    studModel.find({'_id':sess_user_id}, (err, data) => {
        if (err){ throw err;}
        res.json({success : true,profilepic:data[0].profilepic})
    })
}

module.exports = {
    register,
    get_user_profile,
    get_profile_pics,
}