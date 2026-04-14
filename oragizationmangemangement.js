app.post("/organizations",authmiddleware,(req,res)=>{
    const userid = req.userid;
    organizations.push({
        id : organizations.length + 1,
        title : req.body.title,
        description: req.body.description,
        members :[]
        

    })
    if(userid){
        return res.status(200).json({
            msg:"org created succefully",
            organizations:organizations,
            userid:userid
        })
    }

    
})
app.post("/add-member-to-organization",authmiddleware,(req,res)=>{
    const userid = req.userid;
    const orgid = req.body.orgid;
    const memberid = req.body.memberid;
    const users = USERS.find(user => user.id === memberid); 
    const organazation = organizations.find(org => org.id === orgid);
    if(!organazation){
        return res.status(400).json({
            msg:"org is not found in the list please create the org first"
        })
    }
    if(!users){
        res.status(400).json({
            msg:"user is not existing pls ask them to signup first"
        })
        
    }
    if(userid){
         organazation.members.push({
        id : users.id,
        username : users.username
    })
    return res.status(200).json({
        msg:"member added succefully",
        organazation:organazation
    })
    }

   
    



    
})
    


app.listen(port,()=>{
    console.log(`server is listinig on ${port}`);
})
