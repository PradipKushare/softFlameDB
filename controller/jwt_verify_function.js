const verifyToken = (req , res , next) => {
    const header = req.headers.authorization;
    if(header!== '' && header!== undefined && header !== null){
        req.token = header
        next()
    }else{
        res.json({success : false , message : 'token is null'})
    }
}

module.exports = verifyToken