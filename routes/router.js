import {Router} from "express"
import userRoutes from "./userRoutes.js"
import rolesRoutes from "./rolesRoutes.js"

const router= Router()
router.use("/users", userRoutes)
router.use("/roles", rolesRoutes)



export default router