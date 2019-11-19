const mainTestModel = require('../model/test_question_modal').mainTestModel;
const userAnsSchema = require('../model/user_answer_given_modal').userAnsSchema;


const add_question_test_data = (req,res)=>{
    const questiontest = new mainTestModel();
        questiontest.subject = req.body.subject;
        questiontest.testId = req.body.testId;
        questiontest.question = req.body.question;
        questiontest.options = req.body.options;
        questiontest.correctAns = req.body.correctAns;
        questiontest.isMarked = req.body.isMarked;
        questiontest.isAnswered = req.body.isAnswered;
        questiontest.markAnswered = req.body.markAnswered;
        questiontest.isRemaining = req.body.isRemaining;
        questiontest.optionSelected = req.body.optionSelected;
        questiontest.isCoorectAns = req.body.isCoorectAns;
        questiontest.questionTime = req.body.questionTime;

        questiontest.save((err, testData) => {
        if (err){ throw err;}
        res.json({success : true,data:testData})
    })
}


const get_question_test_data = (req,res)=>{
     const questiontest = new mainTestModel();
        questiontest.testId = req.body.testId;
        questiontest.userId = req.body.userId;

    const countData = 0;
    const usranshema = new userAnsSchema();
    let tmpArr = [];
    
    userAnsSchema.find({ 'testId': req.body.testId,'userId':req.body.userId,isCompleteTest:1 }, (err, quesData1) => {
    if (err){ throw err;}
    if (quesData1.length > 0) {

         userAnsSchema.find({ 'testId': req.body.testId,'subject':req.body.subject,'userId':req.body.userId,isCompleteTest:1 }).countDocuments((err, countData) => {
            countData = countData;

                quesData1.forEach(function(data){
                   tmpArr.push(data.quesData);
                });

                res.json({ success:true,data:tmpArr,countData:countData,tmp_test:true });
            });

        }else{
                console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx');

        mainTestModel.find({'testId': req.body.testId,'subject':req.body.subject}).countDocuments((err, countData) => {
                countData = countData
        mainTestModel.find({'testId': req.body.testId,'subject':req.body.subject}, (err, testData) => {
            if (err){ throw err;}
                if (testData) {
                    console.log('EEEEEEEEEEEEEEEEEEEEEE');
                console.log(testData)
                    res.json({ success:true,data:testData,countData:countData,tmp_test:false });
                }else{
                    res.json({ success:false,data:[],countData:0,tmp_test:false });
                    }
                });
            });
        }
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