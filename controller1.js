const getprojectbyid = asynchandeler(async (req, res) => {
    const {projectid} = req.params
    const findprojects = await Project.findByIdAndUpdate(projectid)
    if(!findprojects){
        return res.status(400).json({
            msg:"user does not exist"
        })
    }
    return res.status(200).json({
        msg :`these are the projects ${findprojects}`
    })
});
