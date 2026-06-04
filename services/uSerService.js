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
  login = async ({ email, password }) => {
    const user = await this.user.findOne({
      where: { email },
      attributes: ["id", "name", "email", "password", "roleId"],
    });
    if (!user) throw new Error("user not found");
    const validatePassword = await this.user.validatePassword(password, user.password);
    console.log(`🚀 ~ UserService ~ validatePassword:`, validatePassword)
    if (!validatePassword) throw new Error("invalid password");
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
    };
  };
}

export default UserService;
