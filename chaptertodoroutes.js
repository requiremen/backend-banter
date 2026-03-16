import express from 'express'
import db from '../db.js'
const router = express.Router()
//getting the todos
router.get('/',(req,res)=>{
    const gettodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = gettodos.all(req.userID) 
    res.json(todos)

})
// posting the todos
router.post('/',(req,res)=>{
  const {task} = req.body
  const inserttodo = db.prepare(`INSERT INTO todos (user_id,task) VALUES (? ,?)`)
  const result = inserttodo.run(req.userID,task)
  res.json({
    id: result.lastInsertRowid,
    task,
    completed: 0
  })

})
//using dynamic query parameter to update the todos
router.put('/:id',(req,res)=>{
   const {completed} = req.body
   const {id} = req.params
   const updatetodo = db.prepare('UPDATE todos set completed = ? WHERE id = ?')
   updatetodo.run(completed,id)
   res.json({
    msg :"ladle you did meri jaan"
   })

})
//dynamic query parameter to delete
router.delete('/:id',(req,res)=>{

})
export default router
