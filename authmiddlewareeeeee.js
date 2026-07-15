export const authmiddleware = async (req,res,next)=>{
    const token = req.headers;
    if(!token){
        return res.status(400).json({
            msg:"token is not available"
        })
    }
    const decoded = jwt.verify(token,process.env.A_SECRET_KEY);
    const user = User.findById(decoded?._id).select(
        "-password,-email"
    )
    if(!user){
        return res.status(400).json({
            msg:"user not foun"
        })
    }
    req.user = user;
    next()
}
