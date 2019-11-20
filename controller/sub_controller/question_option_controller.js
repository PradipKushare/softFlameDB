const questionModal = require('../../model/sub_model/question_options_modal').questionModal
const add_options = (req,res)=>{
    const question_option = new questionModal();
        question_option.question_id = req.body.question_id;
        question_option.options = req.body.options;
        question_option.correct_ans = req.body.correct_ans;

        question_option.save((err, addOption) => {
        if (err){ throw err;}
        res.json({success : true,data:addOption})
    })
}

module.exports = {
   add_options
}