import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class Role extends Model {}

Role.init(
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z]+$/i,
      },
    },
  },
  {
    sequelize,
    modelName: "Role",
  },
);

export default Role;
