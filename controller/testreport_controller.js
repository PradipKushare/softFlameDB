const testReport = require('../model/testreport_modal').testReport;
const testModel = require('../model/test_modal').testModel;
const userAnsSchema = require('../model/user_answer_given_modal').userAnsSchema;

const save_question_answers = (req,res)=>{
        const testreport = new testReport();
        var quesArr = JSON.stringify(req.body.quesArr);

        var tmp_testId = req.body.testId;
        var tmp_userId = req.body.userId;
        var tmp_testStatus = req.body.testStatus;

        if (req.body.testStatus == 2) {
        console.log('IFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
        calc_ques_marks(quesArr,tmp_testId,tmp_userId,tmp_testStatus, function(err,result){
        if (result) {
        var myRes = result.result;

       var correctQuestion = myRes.correctQuestion;
       var wrongQuestion = myRes.wrongQuestion;
       var rightMarks = myRes.rightMarks;
       var negativeMarks = myRes.negativeMarks;
       var totalMarks = myRes.totalMarks;

        testreport.testId = req.body.testId;
        testreport.userId = req.body.userId;
        testreport.totalQuestions = req.body.totalQuestion;
        testreport.totalAttempt = req.body.totalAttempt;
        testreport.leftQuestion = req.body.leftQuestion;
        testreport.markedQuestion = req.body.markedQuestion;
        testreport.remainingTime = req.body.remainingTime;
        testreport.testName = req.body.testName;
        testreport.subjectName = req.body.subjectName;
        testreport.testStatus = req.body.testStatus;

        testreport.correctQuestion = correctQuestion;
        testreport.wrongQuestion = wrongQuestion;
        testreport.rightMarks = rightMarks;
        testreport.negativeMarks = negativeMarks;
        testreport.totalMarks = totalMarks;

       testreport.save((err, quesdata) => {
          if (err){ throw err;}
            if (quesdata) {
        
             testModel.findOneAndUpdate({'_id': req.body.testId}, 
                 {$set: {testStatus:req.body.testStatus }}, function(err,updateData) {
                    res.json({ success:true,reportId:quesdata.testId});
                    });
                }else{
                    res.json({ success:false,reportId:''});
                    }
                });
            }
        });
    }else{
        console.log('ELSEEEEEEEEEEEEEEE')
        var funcData = JSON.parse(quesArr);
          for(var i = 0; i < funcData.length; i++){
             insert_user_given_ans(funcData,funcData[i],tmp_testId,tmp_userId,tmp_testStatus, function(err,funRes){
            });
         }
        testModel.findOneAndUpdate({'_id': req.body.testId}, 
            {$set: {testStatus:req.body.testStatus }}, function(err,updateData) {
            res.json({ success:true,reportId:''});
        });
    }
}

    function calc_ques_marks(quesArr,tmp_testId,tmp_userId,tmp_testStatus,callback) { 
        var correctQuestion = 0;
        var wrongQuestion = 0;
        var rightMarks = 0;
        var negativeMarks = 0;
        var totalMarks = 0;
        var funcData = JSON.parse(quesArr);

       for(var i = 0; i < funcData.length; i++){
                if (funcData[i].isAnswered == 'yes') {
                    if(parseInt(funcData[i].optionSelected) == parseInt(funcData[i].correctAns)){
                    correctQuestion++;
                    rightMarks+=4;
                }else{
                    wrongQuestion++;
                    negativeMarks-=1;
                    }
                }
        insert_user_given_ans(funcData,funcData[i],tmp_testId,tmp_userId,tmp_testStatus, function(err,funRes){

        });
    }
    totalMarks = parseInt(rightMarks) + parseInt(negativeMarks)
    var resultPass = {
        correctQuestion:correctQuestion,
        wrongQuestion:wrongQuestion,
        rightMarks:rightMarks,
        negativeMarks:negativeMarks,
        totalMarks:totalMarks
    }

    callback(null,{result:resultPass});
}

function insert_user_given_ans(funcData,data,tmp_testId,tmp_userId,tmp_testStatus,callback) { 
     const usranshema = new userAnsSchema();
        usranshema.testId = tmp_testId;
        usranshema.userId = tmp_userId;
        usranshema.questionId = data._id;
        usranshema.given_answer = data.optionSelected;
        usranshema.isCoorectAns = data.isCoorectAns; 
        usranshema.correctAns = data.correctAns; 
        usranshema.isCompleteTest = tmp_testStatus; 
        usranshema.quesData = funcData;

        usranshema.save((err, schemaData) => {
          if (err){ throw err;}
            if (schemaData) {
             callback(null,{success:true});
         }
     });
}

const get_test_report = (req,res)=>{
     const test = new testReport();
     test.testId = req.body.testId;
     test.userId = req.body.userId;
     testReport.find({ 'testId': req.body.testId,'userId':req.body.userId}, (err, reportData) => {
        if (err){ throw err;}
            if (reportData.length > 0) {
                res.json({ success:true,result:reportData[0] });
            }else{
                res.json({ success:false,result:[] });
            }
        });
    }

module.exports = {
   save_question_answers,get_test_report
}