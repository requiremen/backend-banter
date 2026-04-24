//authmiddleware route
const jwt = require("jsonwebtoken");
function authmiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token,"mysecretkey");
    const userId = decoded.userId;
    if(userId){
        req.userId = userId;
        next();
    }else{
        res.status(401).json({
            msg:"unauthourized"
        })
    }
}
module.exports ={
    authmiddleware
}
