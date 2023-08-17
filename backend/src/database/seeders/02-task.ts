import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('tasks', [
      {
        user_id: 1,
        description: 'Lavar casa',
        data: new Date("2023-09-18"),
        completed: false,
      },
      {
        user_id: 2,
        description: 'Lavar casa',
        data: new Date("2023-09-18"),
        completed: false,
      },
      {
        user_id: 3,
        description: 'Lavar casa',
        data: new Date("2023-09-18"),
        completed: false,
      },
      {
        user_id: 1,
        description: 'Revisar React',
        data: new Date("2023-09-18"),
        completed: false,
      },
    ]);
  },
  down: async (queryInterface : QueryInterface) => {
    await queryInterface.bulkDelete('tasks', {});
  }
}