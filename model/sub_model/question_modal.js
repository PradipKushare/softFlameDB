const mongoose = require('mongoose')
const schema = mongoose.Schema

const QuestionSchema = new schema({
    questions:{type : String},
    created_at:{type:Date,default:Date.now}
});

module.exports={
 questionModal : mongoose.model('question' , QuestionSchema),
}

