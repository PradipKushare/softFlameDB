const testQuesModel = require('../../model/sub_model/test_question_modal').testQuesModel

const add_test_question = (req,res)=>{
const test_ques = new testQuesModel();
    test_ques.test_id = req.body.test_id;
    test_ques.ques_id = req.body.ques_id;       
        test_ques.save((err, testQuesData) => {
        if (err){ throw err;}
        res.json({success : true,data:testQuesData})
    })
}

module.exports = {
    add_test_question
}