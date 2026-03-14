// initiating server .js for my new chapter
import express from 'express'
import path ,{dirname} from 'path'
import { fileURLToPath } from 'url';
const app = express();
app.use(express.json());
//get the filepath from the url of the current module
// basically helps us to navigate the folder directory we have in our project
const __filename = fileURLToPath(import.meta.url)
//get the directory from the file path 
//so this is basically doing the stuff of of finding the file 
const __dirname = dirname(__filename)
// now tell our app to serve the public derictory which is static
app.use(express.static(path.join(__dirname,"../public")))

const PORT = process.env.PORT || 3000;
//serving up the html file from the public directory
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))   
})
app.listen(PORT,()=>{
    console.log(`app is started on ${PORT}`)
})
