import UserController from "../controllers/userController.js";
import UserService from "../services/uSerService.js";

const userService= new UserService()
const userController= new UserController(userService)

export default userController