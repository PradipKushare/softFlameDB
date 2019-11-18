const newsModel = require('../model/news_modal').newsModel

const add_news_data = (req,res)=>{
    const news = new newsModel();
        news.newstitle = req.body.newstitle;
        news.newsdate = req.body.newsdate;
        news.newsdesc = req.body.newsdesc;
        news.save((err, newsData) => {
        if (err){ throw err;}
        res.json({success : true,data:newsData})
    })
}


const get_news_data = (req,res)=>{
        newsModel.find((err, newsData) => {
        if (err){ throw err;}
        if (newsData.length > 0) {
            res.json({ success:true,data:newsData });
        }else{
            res.json({ success:false,data:[] });
        }
    })
}

module.exports = {
    add_news_data,
    get_news_data
}