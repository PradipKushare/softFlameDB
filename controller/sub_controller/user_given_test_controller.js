const UserGivenTestModel = require('../../model/sub_model/user_given_test_modal').UserGivenTestModel

const add_user_given_test = (req,res)=>{
const user_given_test = new UserGivenTestModel();
    user_given_test.user_id = req.body.user_id;
    user_given_test.test_id = req.body.test_id;
    user_given_test.test_status = req.body.test_status;       
        user_given_test.save((err, testQuesData) => {
        if (err){ throw err;}
        res.json({success : true,data:testQuesData})
    })
}

module.exports = {
    add_user_given_test
}