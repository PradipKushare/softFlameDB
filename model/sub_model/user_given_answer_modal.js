const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserGivenAnswerSchema = new schema({
    user_id: {type : String},
    test_id: {type : String},
    user_given_test_id:{type : String},
    ques_id: {type : String},
    ques_option_id: {type : String},
    correct_ans: {type : String},
    created_at:{type:Date,default:Date.now}
});

module.exports={
 	UserGivenAnsModel : mongoose.model('user_given_test' , UserGivenAnswerSchema),
}
