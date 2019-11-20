const mongoose = require('mongoose')
const schema = mongoose.Schema

const TestQuesSchema = new schema({
    test_id: {type : String},
    ques_id : {type : String},
    created_at:{type:Date,default:Date.now}
});

module.exports={
 testQuesModel : mongoose.model('test_question' , TestQuesSchema),
}
