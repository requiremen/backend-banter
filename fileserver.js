/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */

const fs = require("fs")
function readdirectory(folder){
    return new Promise((function(resolve,reject){
        fs.readdir(folder,(err,files)=>{
            if(err){
                reject(err)
            }else{
                resolve(files)
            }
        })
    }))
}
function readfiles(folder,filename){
    return new Promise((function(resolve,reject){
        fs.readFile(`${folder}/${filename}`,"utf-8",(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    }))
}
// async function main(){
//     try{
//         const files = await readdirectory("./files")
//         if(files.includes("a.txt")){
//             const text = await readfiles("./files","a.txt");
//             var arr = []
//             arr.push(text)
//             console.log(arr)
//         }else{
//             console.log("file not found")
//         }

//     }catch(err){
//         console.log(err.message)

//     }
// }
const express = require("express");
const port = 3000
const app = express()
app.get("/files/:filename",async (req,res)=>{
    const filename = req.params.filename
    try{
        const files = await readdirectory("./files")
        if(files.includes("a.txt")){
            const reading = await readfiles("./files","a.txt")
            res.status(200).json({
                reading:reading
            })
            
        }else{
            res.status(404).json({
                msg:"bharri matra mai hui bakchodi"
            })
        }

    }catch(err){
        res.status(400).json({
            msg:"unable to read"
        })

    }
})
app.listen(port,()=>{
    console.log(`app is listning on ${port}`)
})
