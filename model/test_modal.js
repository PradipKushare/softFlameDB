const mongoose = require('mongoose')
const schema = mongoose.Schema

const TestSchema = new schema({
    publishedOn : {type : Date},
    subjects: {type : String},
    topic: {type:String},
    examName: {type:String},
	totalMarks: {type:Number},
	testDuration: {type:Number},
	maximumMarks: {type:Number},
    totalQuestions: {type:Number},
    totalTime: {type:String},
    testStatus: {type:Number},
    created_at:{type:Date,default:Date.now}
});

module.exports={
 testModel : mongoose.model('test' , TestSchema),
}

