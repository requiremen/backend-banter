import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'
const router = express.Router();
router.post('/register',(req,res)=>{
    const {username,password} = req.body
    const hashedpassword = bcrypt.hashSync(password,8)
    //save the new user and the hashpassword to db
    try{
    const insertuser = db.prepare(`INSERT INTO users (username,password) VALUES(?, ?)`)
    const result = insertuser.run(username,hashedpassword)
    // now we have a user i want to add the first todo for them
    const defaulttodo = `hello i am the fist todo meri jaan`
    const inserttodo = db.prepare(`INSERT INTO todos (user_id,task) VALUES(?, ?)`)
    // ok so have a refrence of user id of todos int the user table id
    //so we typed result.lastInsertRowid
    inserttodo.run(result.lastInsertRowid,defaulttodo)
    //creating the tokn for the user just created there id which can be fecthed from result
    const token = jwt.sign({id:result.lastInsertRowid},process.env.JWT_SECRET,{expiresIn:'24h'})
    //now assigning the value to responce with json as having its token
    res.json({token})
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)

    }

})
router.post('login',(req,res)=>{

})
export default router
