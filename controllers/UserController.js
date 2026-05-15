class UserController {
  constructor(service) {
    this.userService = service;
  }

  getAllUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();
      console.log(`🚀 ~ UserController ~ users:`, users)
      res.status(200).send({ success: true, message: users });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getuserById = (req, res) => {
    try {
      res.status(200).send({ success: true, message: "get user by id" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  createUser = async (req, res) => {
    try {
      const { name, email } = req.body;
      if (!name) throw new Error("nombre is required");
      const user = await this.userService.createUser({name, email});
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
}

export default UserController;
