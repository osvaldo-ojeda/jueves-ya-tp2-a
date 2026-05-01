class UserService {
  users = [
    {
      id: 1,
      nombre: "osvaldo",
    },
    {
      id: 2,
      nombre: "juan",
    },
    {
      id: 3,
      nombre: "pedro",
    },
  ];

  getAllUsers = async () => {
    return this.users;
  };

  createUser = async (nombre) => {
    if (nombre.length <= 3) throw new Error("nombre es corto");
    const data = {
      id: this.users.length + 1,
      nombre,
    };
    this.users.push(data);
    return "User created";
  };
}

export default UserService;
