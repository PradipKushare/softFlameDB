const testModel = require('../model/test_modal').testModel

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
        test.isCompleted = req.body.isCompleted;
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
            if (testData) {
                res.json({ success:true,data:testData,countData:countData,per_page:per_page });
            }else{
                res.json({ success:false,data:[],countData:0,per_page:0 });
            }
        }).sort(req.body.sort_by == 'ascending' ? {publishedOn: 1} : {publishedOn: -1})
        .skip(from_limit).limit(per_page)
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
    get_test_data_all
}