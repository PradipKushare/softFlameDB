const studModel = require('../model/register_model').studModel
var crypto = require('crypto'); 
var localStorage = require('localStorage')
var multer = require('multer');
const jwt = require('jsonwebtoken');


const login= (req,res)=>{
    const student = new studModel();
    student.email = req.body.email;
    student.password = req.body.password;
    var chkPwd = crypto.createHash('md5').update(req.body.password).digest("hex");
    var sess = req.session;
    studModel.findOne({ 'email': req.body.email,'password':chkPwd }, (err, data) => {
        if (err){ throw err;}
        if (!data) {
            res.json({ success: false, msg: 'Invalid credentials' })
        }else {
            if (data.password == chkPwd) {

          const JWTToken = jwt.sign({
               email: data.email,
               _id: data._id
             },
             'secretcode',
              {
                expiresIn: '2h'
              });
            
                var _id = data._id;
                sess.user_id =_id;
                 localStorage.setItem('node_session_id',_id);
                    res.json({success : true , msg : 'Login successfully!',data: data,'user_id':sess.user_id,token:JWTToken});
                }else{
                    res.json({ success: false, msg: 'Invalid credentials' })
                }
            }
    });
}


const update_profile= (req,res)=>{
    const student = new studModel();
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var gender = req.body.gender;
    var dob = req.body.dob;
    var address = req.body.address;
    var state = req.body.state;
    var pincode = req.body.pincode;
    var mobile_no = req.body.mobile_no;
    var email = req.body.email;
    var middlename = req.body.middlename;
    var parentemail = req.body.parentemail;
    var parentcontact = req.body.parentcontact;
    var city = req.body.city;
    var sess = req.session;

studModel.findOneAndUpdate({'_id': req.body.sess_user_id}, 
                     {$set: {'firstname':firstname,
                             'lastname':lastname,
                             'gender':gender,
                             'dob':dob,
                             'address':address,
                             'state':state,
                             'pincode':pincode,
                             'mobile_no':mobile_no,
                             'email':email,
                             'middlename':middlename,
                             'parentemail':parentemail,
                             'city':city,
                             'parentcontact':parentcontact }}, function(err,data) {
      if (err){ throw err;}
        if (data) {
            res.json({ success: true, msg: 'Profile updated successfully' })
        }else {
            res.json({success : false , msg :'Error in updating profile'})
        }
    });
}


const update_profile_pics= (req,res)=>{
  var num =  Math.random().toString(36).substr(2, 5);
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,'F:/softFlameMTS-develope/src/assets/img/student_profiles/');
    },
        filename: (req, file, cb) => {
            var newNAme = file.originalname.split(".");
            var file_name = Date.now()+num+'.'+newNAme[1];
            cb(null, file_name)
    }
});
    var upload = multer({storage: storage}).single('userProfile');   
    upload(req, res, function(err){
         var profilepic = req.file.filename;
    studModel.findOneAndUpdate({'_id': req.body.sess_user_id}, 
        {$set: {'profilepic':profilepic }}, function(err,data) {
          if (err){ throw err;}
            if (data) {
                res.json({ success: true, msg: 'Profile updated successfully',profilepic:data.profilepic })
            }else {
                res.json({success : false , msg : 'Error in updating profile',profilepic:'' })
            }
        });
    });
}

module.exports = {
    login,update_profile,update_profile_pics
}