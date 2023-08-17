import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional, 
  DataTypes, Model } from "sequelize";
import db from '.';
import SequelizeUser from "./SequelizeUser";

class SequelizeTasks extends Model<InferAttributes<SequelizeTasks>,
InferCreationAttributes<SequelizeTasks>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare description: string;
  declare data: Date;
  declare completed: boolean;
}

SequelizeTasks.init({
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
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
  tableName: 'tasks'
});

SequelizeTasks.belongsTo(SequelizeUser, { foreignKey: 'userId', as: 'user' });
SequelizeUser.hasMany(SequelizeTasks, { foreignKey: 'userId', as: 'task' });

export default SequelizeTasks;