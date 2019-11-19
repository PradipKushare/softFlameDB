const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserAnswerSchema = new schema({
    testId: {type : String},
    userId:{type : String},
    isCompleteTest:{type : Number},
    quesData:[],
    created_at:{type:Date,default:Date.now}
});

module.exports={
 userAnsSchema : mongoose.model('user_given_answer' , UserAnswerSchema),
}

