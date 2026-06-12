class UserController {
  constructor(service) {
    this.userService = service;
  }

  getAllUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).send({ success: true, message: users });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getuserById = async(req, res) => {
    try {
      const {id}= req.params
      const user= await this.userService.getUserById(id)
      res.status(200).send({ success: true, message: user});
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  createUser = async (req, res) => {
    try {
      const { name, email, password, roleId } = req.body;
      if (!name) throw new Error("nombre is required");
      const user = await this.userService.createUser({name, email, password, roleId});
      res.status(200).send({ success: true, message: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  updateUser = (req, res) => {
    try {
      res.status(200).send({ success: true, message: "updateUser" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  deleteUser = (req, res) => {
    try {
      res.status(200).send({ success: true, message: "delete user" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
  login=async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.login({ email, password});
      res.cookie("payload", user.token)
      res.status(200).send({ success: true, message: user.id });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
  me=async (req, res) => {
    try {
      const {payload} = req.cookies
      const user = await this.userService.me(payload);
      res.status(200).send({ success: true, message: user});
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default UserController;
