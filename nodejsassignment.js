/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login
**/
const express = require("express");
const app = express();
const port = 3000;

let users = [];
let numberid = 1;

app.use(express.json());

app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    let flag = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            flag = true;
            break;
        }
    }

    if (flag) {
        return res.status(400).json({
            msg: "User already exists"
        });
    }

    const newuser = {
        id: numberid++,
        username,
        password
    };

    users.push(newuser);

    return res.status(201).json({
        msg: "User created successfully",
        userid: newuser.id,
        users: users
    });
});
app.post("/signin",(req,res)=>{
    const {username,password} = req.body
    for(let i = 0; i<users.length;i++){
        if(users[i].username == username && users[i].password == password){
           return res.status(200).json({
                msg:"the user is valid",
                users : users
            })
      }
    }
    return res.status(400).json({
        msg:"user is invalid"
    })

})
app.get("/")

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
});

