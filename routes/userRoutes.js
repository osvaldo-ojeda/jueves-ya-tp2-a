import {Router} from "express"

const userRoutes= Router()

userRoutes.get("/", (req, res)=>{
res.status(200).send("get all users /")
})

userRoutes.get("/:id", (req, res)=>{
console.log(`🚀 ~ req.query:`, req.query)
const {id}= req.params
res.status(200).send(`get user by id:${id} `)
})

userRoutes.post("/", (req, res)=>{
console.log(`🚀 ~ req:`, req.body)
res.status(200).send("post user /")
})

userRoutes.put("/:id", (req, res)=>{
const {id}= req.params
res.status(200).send(`put user by id:${id}`)
})

userRoutes.delete("/:id", (req, res)=>{
const {id}= req.params
res.status(200).send(`delete user by id :${id}`)
})


export default userRoutes