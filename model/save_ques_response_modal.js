const mongoose = require('mongoose')
const schema = mongoose.Schema

const testReportsSchema = new schema({
    testId: {type : String},
    userId:{type : String},
    totalQuestions: {type:Number},
    totalAttempt: {type:Number},
    leftQuestion: {type:Number},
    markedQuestion: {type:Number},
    remainingTime: {type:Number},
    testName: {type:String},
    subjectName: {type:String},
    correctQuestion:{type : String},
    wrongQuestion:{type : String},
    rightMarks:{type : String},
    negativeMarks:{type : String},
    totalMarks:{type : String},
    created_at:{type:Date,default:Date.now}
});


module.exports={
 	testReport : mongoose.model('testreport' , testReportsSchema),

}