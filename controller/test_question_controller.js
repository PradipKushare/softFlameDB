const mainTestModel = require('../model/test_question_modal').mainTestModel

const add_question_test_data = (req,res)=>{
    const questiontest = new mainTestModel();
        questiontest.subject = req.body.subject;
        questiontest.testId = req.body.testId;
        questiontest.question = req.body.question;
        questiontest.options = req.body.options;
        questiontest.correctAns = req.body.correctAns;
        questiontest.save((err, testData) => {
        if (err){ throw err;}
        res.json({success : true,data:testData})
    })
}


const get_question_test_data = (req,res)=>{
     const questiontest = new mainTestModel();
        questiontest.testId = req.body.testId;
        questiontest.subject = req.body.subject;

     mainTestModel.find({'testId': req.body.testId,'subject':req.body.subject}).countDocuments((err, countData) => {
            countData = countData
     mainTestModel.find({'testId': req.body.testId,'subject':req.body.subject}, (err, testData) => {
        if (err){ throw err;}
            if (testData) {
                res.json({ success:true,data:testData,countData:countData });
            }else{
                res.json({ success:false,data:[],countData:0 });
             }
            });
        });
    }

    const get_all_question_test_data = (req,res)=>{
     const questiontest = new mainTestModel();
   
     mainTestModel.find((err, testData) => {
        if (err){ throw err;}
        if (testData) {
            res.json({ success:true,data:testData });
        }else{
            res.json({ success:false,data:[] });
        }
    })
}

module.exports = {
    add_question_test_data,
    get_question_test_data,
    get_all_question_test_data
}