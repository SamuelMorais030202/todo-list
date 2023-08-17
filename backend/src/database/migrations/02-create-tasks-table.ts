import { DataTypes, Model, QueryInterface } from "sequelize";
import ITask from "../../interfaces/Tasks/Task";

export default {
  up(queryInterface : QueryInterface) {
    return queryInterface.createTable<Model<ITask>>('tasks', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      data: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },
  down(queryInterface : QueryInterface) {
    return queryInterface.dropTable('tasks');
  },
}