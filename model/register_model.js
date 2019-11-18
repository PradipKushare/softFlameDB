const mongoose = require('mongoose')
const schema = mongoose.Schema

const studentSchema = new schema({
    firstname : {type : String},
    lastname : {type : String},
    gender: {type : String},
    dob: {type : String},
    address: {type : String},
    state: {type : String},
    district: {type : String},
    pincode: {type : Number},
    mobile_no: {type : String},
    email: {type : String},
    password: {type : String},  
    middlename: {type : String},  
    parentemail: {type : String},  
    parentcontact: {type : String},  
    profilepic: {type : String}, 
    city: {type : String}, 
    created_at:{type:Date,default:Date.now}
});

module.exports={
 studModel : mongoose.model('student' , studentSchema),
}