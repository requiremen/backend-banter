const z = require("zod");
const signupSchema = z.object({
    username:z.string().min(5),
    password:z.string().min(5)
})

app.use (express.json());
app.post("/signup",(req,res)=>{
    const {data,success,error} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            msg:"validation failed",
            error:error
        })
    }
    const username = data.username;
    const password = data.password;
    const existinguser = users.find(user=>user.username === username);
    if(existinguser){
        return res.status(400).json({
            msg:"user already exists"
        })
    }
    users.push({
        username:username,
        password:password
    })
    res.status(200).json({
        msg:"user created succesfully"
    })

})
app.post("/sigin",(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    const existinguser = users.find(user=>user.username === username && user.password === password);
    if(!existinguser){
        return res.status(400).json({
            msg:"pls signup firstt"
        })
    }
    const token = jwt.sign({
        userId : existinguser.username
    },"mysecretkey")
    res.status(200).json({
        msg : "login succesfully",
        token:token
    })

})
let todoid = 1;
app.post("/addtodo",authmiddleware,(req,res)=>{
    const userId = req.userId;
    const todo = req.body.todo;
    const description = req.body.description;
    
    todos.push({
        todo,
        description,
        id:todoid++,
        userId:userId,

    })
    console.log(todos)
    res.status(200).json({
        msg:"todo added succesfulluy"
    })

})
app.delete("/deletetodo",authmiddleware,(req,res)=>{
    const userId = req.userId;
    const id = req.body.id;
    const checkingifyouownthetodo = todos.find(todo=>todo.id === id && todo.userId === userId);
    if(!checkingifyouownthetodo){
        return res.status(400).json({
            msg:"you dont have access to delete the todo or the todo is not created yet"
        })
    }
    todos = todos.filter(todo=>todo.id !== id);
    res.status(200).json({
        msg:"todo deleted succesfully"
    })
})
app.get("/gettodos",authmiddleware,(req,res)=>{
    const userId = req.userId;
    const findusertodos = todos.filter(todo=>todo.userId === userId);
    res.status(200).json({
        todos:findusertodos
    })

})
app.listen(port,()=>{
    console.log(`server is lisning on port ${port}`)
})
