class UserService {
  constructor(user) {
    this.user = user;
  }

  getAllUsers = async () => {
    const users= await this.user.findAll()
    return users;
  };

  createUser = async ({name, email}) => {
    const user = await this.user.create({name, email});
    return user;
  };
}

export default UserService;
