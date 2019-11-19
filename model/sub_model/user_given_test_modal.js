const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserGivenTestSchema = new schema({
    user_id: {type : String},
    test_id: {type : String},
    test_status : {type : Number},
    created_at:{type:Date,default:Date.now}
});

module.exports={
 UserGivenTestModel : mongoose.model('user_given_test' , UserGivenTestSchema),
}
