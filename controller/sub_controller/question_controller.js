const questionModal = require('../../model/sub_model/question_modal').questionModal
const add_questions = (req,res)=>{
    const question = new questionModal();
        question.questions = req.body.questions;
        question.save((err, addQuestion) => {
        if (err){ throw err;}
        res.json({success : true,data:addQuestion})
    })
}

module.exports = {
   add_questions
}