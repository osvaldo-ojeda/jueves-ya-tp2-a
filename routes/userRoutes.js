import {Router} from "express"
import userController from "../containers/userContainer.js"
import autenticar from "../midlewares/autenticar.js"

const userRoutes= Router()

userRoutes.get("/", userController.getAllUsers)
userRoutes.get("/:id", userController.getuserById)
userRoutes.use(autenticar)
userRoutes.post("/", userController.createUser)
userRoutes.put("/:id",userController.updateUser)
userRoutes.delete("/:id", userController.deleteUser)


export default userRoutes