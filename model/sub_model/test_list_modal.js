const mongoose = require('mongoose')
const schema = mongoose.Schema

const TestSchema = new schema({
    subject: {type : String},
    published_on : {type : Date},
    topic: {type:String},
    exam_name: {type:String},
	total_marks: {type:Number},
	test_duration: {type:Number},
    total_questions: {type:Number},
    created_at:{type:Date,default:Date.now}
});

module.exports={
 testModel : mongoose.model('test_list' , TestSchema),
}

