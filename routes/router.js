import {Router} from "express"
import userRoutes from "./userRoutes.js"
import rolesRoutes from "./rolesRoutes.js"
import loger from "../midlewares/loger.js"


const router= Router()
router.use("/users", userRoutes)
router.use(loger)
router.use("/roles", rolesRoutes)

export default router