import { DataTypes, Model, QueryInterface } from "sequelize";
import IUser from "../../interfaces/User/User";

export default {
  up(queryInterface : QueryInterface) {
    return queryInterface.createTable<Model<IUser>>('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'full_name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  },
  down(queryInterface : QueryInterface) {
    return queryInterface.dropTable('users');
  }
}