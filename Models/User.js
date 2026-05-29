import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [3, 50],
        is: /^[a-z]+$/i,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
  },
  {
    sequelize: sequelize,
    modelName: "User",
  },
);

export default User;
