class UserService {
  constructor(user, role) {
    this.user = user;
    this.role = role;
  }

  getAllUsers = async () => {
    const users = await this.user.findAll({
      attributes: ["id", "name", "email", "roleId"],
      include: [
        {
          model: this.role,
          attributes: ["name"],
        },
      ],
    });
    return users;
  };

  getUserById = async (id) => {
    const user = await this.user.findOne({
      where: { id },
      attributes: ["id", "name", "email", "roleId"],
    });
    return user;
  };

  createUser = async ({ name, email, password, roleId }) => {
    const user = await this.user.create({ name, email, password, roleId });
    return user;
  };
}

export default UserService;
