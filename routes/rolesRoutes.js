import { Router } from "express"

const rolesRoutes= Router()

rolesRoutes.get("/", (req, res)=>{
res.status(200).send("get all roles /")
})

rolesRoutes.get("/:id", (req, res)=>{
res.status(200).send("get roles by id /")
})

rolesRoutes.post("/", (req, res)=>{
res.status(200).send("post roles /")
})

rolesRoutes.put("/:id", (req, res)=>{
res.status(200).send("put roles by id /")
})

rolesRoutes.delete("/:id", (req, res)=>{
res.status(200).send("delete roles by id /")
})


export default rolesRoutes