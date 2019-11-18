const studModel = require('../model/register_model').studModel

var path = require('path'); 
const mustache   = require('mustache');
const fs = require('fs'); //Filesystem  

var mailModule = require('../routes/mail');
var from_email = mailModule.from_email;
var transporter = mailModule.transporter;

const forgot_password= (req,res)=>{ 
    studModel.findOne({ 'email': req.body.email }, (err, data) => {
        if (err){ throw err;}
        if (data) {
            var static_url = 'http://localhost:3000/#/reset-password/email='+req.body.email;
            var firstname = data.firstname;
            var lastname = data.lastname;
            var link_reset = '<a href='+static_url+' target=_blank>Click Here</a>'
            var mailOptions = {
                    from:from_email ,
                    to:req.body.email,
                    subject:'SOFTFLAME MTS Reset Password' ,      
                    html: "Name : "  + firstname+ '<br>' +
                          "Email : " + lastname + '<br>' +
                          "Click here to reset your password : " + link_reset                    
                };
              transporter.sendMail(mailOptions, (error, info) => {
                        if (error) { return console.log(error); }
                    res.json({ success: true, msg: 'Password sent to your email address' })
               });
            }else {
                res.json({success : false , msg :'This email not exist!'})
        }
    })
}

module.exports = {
    forgot_password
}