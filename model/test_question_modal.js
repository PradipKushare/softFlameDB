const mongoose = require('mongoose')
const schema = mongoose.Schema

const mainTestSchema = new schema({
    subject : {type : String},
    testId: {type : String},
    question: {type:String},
    options: [{ans_id:{type:String},answer:{type:String}}],
	correctAns: {type:String},
	isMarked: {type : String},
	isAnswered: {type : String},
	markAnswered: {type : String},
	isRemaining: {type : String},
	optionSelected: {type : String},
	isCoorectAns: {type : String},
	questionTime: {type : Number},
    created_at:{type:Date,default:Date.now}
});

module.exports={
 mainTestModel : mongoose.model('questiontest' , mainTestSchema),
}