const studModel = require('../model/register_model').studModel
var crypto = require('crypto'); 

const update_password= (req,res)=>{ 
     const student = new studModel();
     var chkPwd = crypto.createHash('md5').update(req.body.password).digest("hex");
      student.email = req.body.email;
      student.password = chkPwd;

     studModel.findOneAndUpdate({email: req.body.email}, {$set: {password:chkPwd}}, function(err,data) {
        if (err){ throw err;}
        if (data) {
                 res.json({ success: true, msg: 'Password updated successfully' })
            }else {
                res.json({success : false , msg :'Error in updating password'})
        }
    })
}

const change_login_password= (req,res)=>{ 

    var old_password = req.body.old_password;
    var new_password = req.body.new_password;
    var sess_user_id = req.body.sess_user_id;
    var chkPwd_oldPwd = crypto.createHash('md5').update(req.body.old_password).digest("hex");
    var chkPwd_newPwd = crypto.createHash('md5').update(req.body.new_password).digest("hex");

    studModel.findOne({ '_id': sess_user_id }, (err, data) => {
        var password = data.password;
        if (password == chkPwd_oldPwd) {
            studModel.updateOne({_id: sess_user_id}, {$set: {password:chkPwd_newPwd}}, function(err,data) {
                if (err){ throw err;}
                if (data) {
                    res.json({ success: true, msg: 'Password updated successfully' })
                    }else {
                    res.json({ success: false, msg: 'Old password does not match' }) 
                }
            })
        }else{
           res.json({ success: false, msg: 'Old password does not match' }) 
        }
    })
}

module.exports = {
    update_password,
    change_login_password,
}