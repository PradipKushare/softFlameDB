const testReport = require('../model/save_ques_response_modal').testReport;


const save_question_ansewrs = (req,res)=>{
        const testreport = new testReport();
        var quesArr = JSON.stringify(req.body.quesArr);
        
        calc_ques_marks(quesArr, function(err,result){
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

        testreport.correctQuestion = correctQuestion;
        testreport.wrongQuestion = wrongQuestion;
        testreport.rightMarks = rightMarks;
        testreport.negativeMarks = negativeMarks;
        testreport.totalMarks = totalMarks;

       testreport.save((err, quesdata) => {
          if (err){ throw err;}
            if (quesdata) {
                res.json({ success:true,reportId:quesdata.testId});
            }else{
                res.json({ success:false,reportId:''});
                 }
              });
            }
        })
    }

    function calc_ques_marks(quesArr,callback) { 
        var correctQuestion = 0;
        var wrongQuestion = 0;
        var rightMarks = 0;
        var negativeMarks = 0;
        var totalMarks = 0;
        var funcData = JSON.parse(quesArr);

       for(var i = 0; i < funcData.length; ++i){
            if (funcData[i].isAnswered == 'yes') {
                if(parseInt(funcData[i].optionSelected) == parseInt(funcData[i].correctAns)){
                correctQuestion++;
                rightMarks+=4;
            }else{
                wrongQuestion++;
                negativeMarks-=1;
            }
        }
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
   save_question_ansewrs,get_test_report
}