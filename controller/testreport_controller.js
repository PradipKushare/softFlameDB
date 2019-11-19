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
                    res.json({ success:true,reportId:quesdata.testId});
                }else{
                      res.json({ success:false,reportId:''});
                    }
                });
            }
        });
    }else{
        var funcData = JSON.parse(quesArr);
         insert_user_given_ans(funcData,tmp_testId,tmp_userId,tmp_testStatus, function(err,funRes){
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
    }

    insert_user_given_ans(funcData,tmp_testId,tmp_userId,tmp_testStatus, function(err,funRes){

        });

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

function insert_user_given_ans(funcData,tmp_testId,tmp_userId,tmp_testStatus,callback) { 
     const usranshema = new userAnsSchema();
        usranshema.testId = tmp_testId;
        usranshema.userId = tmp_userId;
        usranshema.isCompleteTest = tmp_testStatus; 
        usranshema.quesData = funcData;

    userAnsSchema.find({ 'testId': tmp_testId,'userId':tmp_userId,isCompleteTest:tmp_testStatus }, (err, checkRec) => {
       if (err){ throw err;}
         if (checkRec.length == 0) {
        usranshema.save((err, schemaData) => {
          if (err){ throw err;}
             callback(null,{success:true});
       });
    }else{
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



    const get_test_report_subject_data = (req,res)=>{
      const test = new testReport();
      test.subjectName = req.body.subject;

    var per_page = parseInt(req.body.per_page);
    var page_number = req.body.page_number;
    var from_limit =  (page_number * per_page)-per_page;
    var countData = 0;

     testReport.find({ 'subjectName': req.body.subject}).countDocuments((err, countData) => {
            countData = countData
     testReport.find({ 'subjectName': req.body.subject}, (err, testData) => {
        if (err){ throw err;}
            if (testData.length > 0) {
                res.json({ success:true,data:testData,countData:countData,per_page:per_page });
            }else{
                res.json({ success:false,data:[],countData:0,per_page:0 });
            }
        }).sort(req.body.sort_by == 'ascending' ? {created_at: 1} : {created_at: -1})
        .skip(from_limit).limit(per_page)
        });
    }


module.exports = {
   save_question_answers,get_test_report,get_test_report_subject_data
}