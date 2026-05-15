import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class User extends Model {}

User.init(
  {
    name: DataTypes.STRING(50),
    email:DataTypes.STRING,
  },
  {
     sequelize:sequelize,
     modelName:"User",
  },
);

export default User;
