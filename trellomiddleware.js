const jwt = require("jsonwebtoken");
function authmiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token,"secretkey")
    const userId = decoded.id;
   
    if(userId){
        req.userId = userId
        next();
    }else{
        res.status(401).json({
            msg: "Unauthorized"
        })
    }

}
module.exports = {
    authmiddleware
};
