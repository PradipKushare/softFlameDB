	var nodemailer = require('nodemailer');
	let transporter = nodemailer.createTransport({
			    service: "gmail", //"gmail",
			    port: 465,//587,
   			secure:true, //false,
			    host: 'smtp.gmail.com',
			    auth: {
			        user: "nandu.kushare28061993@gmail.com",
			        pass: "Aspire$101MI"
			    }
			});
		
    var from_email = '"SOFTFLAME MTS" <nandu.kushare28061993@gmail.com>';
 
  module.exports={
   transporter,from_email
  }