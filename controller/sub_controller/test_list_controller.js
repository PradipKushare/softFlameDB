const testModel = require('../../model/sub_model/test_list_modal').testModel;

const UserGivenTestModel = require('../../model/sub_model/user_given_test_modal').UserGivenTestModel;


const add_test = (req,res)=>{
    const test = new testModel();
        test.subject = req.body.subject;
        test.published_on = req.body.published_on;
        test.topic = req.body.topic;
        test.exam_name = req.body.exam_name;
        test.total_marks = req.body.total_marks;
        test.test_duration = req.body.test_duration;
        test.total_questions = req.body.total_questions;
            test.save((err, testData) => {
            if (err){ throw err;}
            res.json({success : true,data:testData})
        })
}

const get_user_test_data = (req,res)=>{

     const test = new testModel();
        test.subject = req.body.subject;

    var per_page = parseInt(req.body.per_page);
    var page_number = req.body.page_number;
    var from_limit =  (page_number * per_page)-per_page;
    var countData = 0;

     UserGivenTestModel.find({ 'user_id': req.body.user_id}, (err, checkRec) => {
        if (err){ throw err;}
            if (checkRec.length == 0) {
                
            testModel.find({ 'subject': req.body.subject}).countDocuments((err, countData) => {
                console.log('countData issssss:'+countData)
                    countData = countData
             testModel.find({ 'subject': req.body.subject}, (err, testData) => {
                if (err){ throw err;}
                    if (testData.length > 0) {
                        console.log(testData.length)
                        res.json({ success:true,data:testData,countData:countData,per_page:per_page });
                    }else{
                        res.json({ success:false,data:[],countData:0,per_page:0 });
                    }
                }).sort(req.body.sort_by == 'ascending' ? {published_on: 1} : {published_on: -1})
                .skip(from_limit).limit(per_page)
                });

        }else{
            console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNN')
        }
    })
 }

module.exports = {
    add_test,get_user_test_data
}