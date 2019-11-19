const testModel = require('../model/sub_model/test_modal').testModel

const add_test = (req,res)=>{
    const test = new testModel();
        test.subject = req.body.subject;
        test.published_on = req.body.published_on;
        test.topic = req.body.topic;
        test.exam_name = req.body.exam_name;
        test.total_marks = req.body.total_marks;
        test.test_duration = req.body.test_duration;
        test.max_marks = req.body.max_marks;
        test.total_questions = req.body.total_questions;
            test.save((err, testData) => {
            if (err){ throw err;}
            res.json({success : true,data:testData})
        })
}

module.exports = {
    add_test
}