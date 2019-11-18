const mongoose = require('mongoose')
const schema = mongoose.Schema

const DashboardSchema = new schema({
    testGiven : {type : Number},
    testPerformance : {type : Number},
    questionTime: {type : Number},
    testOverview: [{
    				wrongQuestion: {type:Number},
    				rightQuestion: {type:Number},
    				remainQuestion: {type:Number}}],
    created_at:{type:Date,default:Date.now}
});

module.exports={
 dashboardModel : mongoose.model('dashboard' , DashboardSchema),
}