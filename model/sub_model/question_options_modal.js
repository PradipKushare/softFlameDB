const mongoose = require('mongoose')
const schema = mongoose.Schema

const QuesOptionSchema = new schema({
    question_id:{type : String},
    options: {type:String},
    correct_ans: {type:String},
    created_at:{type:Date,default:Date.now}
});

module.exports={
 questionModal : mongoose.model('question_option' , QuesOptionSchema),
}

