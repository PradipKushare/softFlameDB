const testModel = require('../model/test_modal').testModel

const userAnsSchema = require('../model/user_answer_given_modal').userAnsSchema;

const set_test_status= (req,res)=>{
     var profilepic = '5dd2427ca0a7e6157435ddd1';
     testModel.findOneAndUpdate({'_id': profilepic}, 
        {$set: {testStatus:0 }}, function(err,updateData) {
        res.json({ success:true});
    });
 };

const add_test_data = (req,res)=>{
    const test = new testModel();
        test.publishedOn = req.body.publishedOn;
        test.subjects = req.body.subjects;
        test.topic = req.body.topic;
        test.examName = req.body.examName;
        test.totalMarks = req.body.totalMarks;
        test.testDuration = req.body.testDuration;
        test.totalQuestions = req.body.totalQuestions;
        test.totalTime = req.body.totalTime;
        test.testStatus = req.body.testStatus;
        test.maximumMarks = req.body.maximumMarks;

        test.save((err, testData) => {
        if (err){ throw err;}
        res.json({success : true,data:testData})
    })
}

const get_test_data = (req,res)=>{
     const test = new testModel();
    test.subjects = req.body.subject;

    var per_page = parseInt(req.body.per_page);
    var page_number = req.body.page_number;
    var from_limit =  (page_number * per_page)-per_page;
    var countData = 0;

     testModel.find({ 'subjects': req.body.subject}).countDocuments((err, countData) => {
            countData = countData
     testModel.find({ 'subjects': req.body.subject}, (err, testData) => {
        if (err){ throw err;}
            if (testData.length > 0) {
                res.json({ success:true,data:testData,countData:countData,per_page:per_page });
            }else{
                res.json({ success:false,data:[],countData:0,per_page:0 });
            }
        }).sort(req.body.sort_by == 'ascending' ? {publishedOn: 1} : {publishedOn: -1})
        .skip(from_limit).limit(per_page)
        });
    }


const check_stud_test_status = (req,res)=>{
    const usranshema = new userAnsSchema();
    userAnsSchema.findOne({ 'testId': req.body.testId,'userId':req.body.userId }, (err, quesData1) => {
        if (err){ throw err;}
            if (quesData1.length > 0) {
                console.log('DATAAAAAAAAAAAAAAAA')
                console.log(quesData1);
                }else{
                    console.log('NO DATAAAAAAAAA')
                }
            });
        }


const get_test_data_all = (req,res)=>{
     const test = new testModel();
   
     testModel.find((err, testData) => {
        if (err){ throw err;}
        if (testData) {
            res.json({ success:true,data:testData });
        }else{
            res.json({ success:false,data:[] });
        }
    })
}

module.exports = {
    add_test_data,
    get_test_data,
    get_test_data_all,
    set_test_status,
    check_stud_test_status
}