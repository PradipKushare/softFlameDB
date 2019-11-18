const mongoose = require('mongoose')
const schema = mongoose.Schema

const NewsSchema = new schema({
    newstitle : {type : String},
    newsdate : {type : String},
    newsdesc: {type : String},
    created_at:{type:Date,default:Date.now}
});

module.exports={
 newsModel : mongoose.model('news' , NewsSchema),
}