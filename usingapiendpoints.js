//the address of this server is connected to the network
//url - http://localhost:3000
//ip - 127.0.0.1.3000
const express = require("express");
const app = express();
const port = 3000;
const data = ["akshat"]
// midlleware - this acts as the middle man b/w the request send and the receiveing data as an interepretor to accept the data in
//json format
app.use(express.json())
//endpoints - http verbs and path(routes)
//get route is something which bringing something to the user when he or she hits the url 
//ok so these are the endpoint for website

app.get("/",(req,res)=>{
    res.send(`<body>
        <h1> homepage </h1>
        <p id ="data">${JSON.stringify(data)}</p>
        <input id ="inputname">enter name</input>
        <button onclick="adddata()">Add name</button>
        <br><br>
        <button onclick="deletedata()">Delete name</button>
        <br><br>
        <a href ="/dashboard">dashboard</a>
        <script>
        async function adddata()
        {
        const name = document.getElementById("inputname").value
        await fetch("/api/data",
        {
        method : "POST",
        headers :{
        "content-type":"application/json"

        },
        body:JSON.stringify({name:name})

        })
        location.reload()
        }
        async function deletedata()
        {
        await fetch("/api/data",
        {
        method : "DELETE"
        })
        location.reload()
        }
 
        
        </script> 
       </body>`)
})
app.get("/dashboard",(req,res)=>{
    res.send(`<body><h1>dashboard</h1><a href ="/">homepage</a></body>`)
})
//api endpoints not visual
app.get("/api/data",(req,res)=>{
    res.send(data)
})
// now we want to put in the data and save it to the data object
// so here we will be looking about the user when hits enter with the credentials the data get save into the data variable
//in the backend
app.post("/api/data",(req,res)=>{
    const newentry = req.body;
    data.push(newentry.name)
    console.log(newentry)
    res.sendStatus(201)

})
app.delete("/api/data",(req,res)=>{
    data.pop();
    console.log("data is removed from the array of names")
    res.sendStatus(202)
})

// crud - create - post read -get update-put delete-delete
app.listen(3000,function(){
    console.log(`app is lisining on ${port}`)
})
