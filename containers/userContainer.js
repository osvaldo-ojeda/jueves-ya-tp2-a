import UserController from "../controllers/userController.js";
import {User} from "../Models/index.js";
import UserService from "../services/userService.js";

const userService= new UserService(User)
const userController= new UserController(userService)

export default userController