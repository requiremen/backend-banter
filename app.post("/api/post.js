app.post("/api/v1/signup",async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        if(await User.findone(username)){
            return res.status(400).json({
                msg:"username alerady exist"
            })
        }
        const user =  await User.create({
            username,
            password
        })
        return res.status(200).json({
            msg: `${username} your sign up is completed`,
            user
        })

    }catch(err){
        return err;
    }


});
