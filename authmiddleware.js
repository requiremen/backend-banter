const jwt = require("jsonwebtoken");;
function authmiddleware(req,res,next){
   const token = req.headers.token;
   const decoded = jwt.verify(token,"secretkey");
   const userid = decoded.id
    if(userid){
        req.userid = userid;
        next();
    }else{
        res.status(400).json({
            msg:"unauthorized"
        })
    }




}
module.exports ={
    authmiddleware:authmiddleware
}
