import { QueryInterface } from "sequelize";

export default {
  up: async(queryInterface : QueryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        full_name: 'Samuel Morais Garcia',
        phone: '38988449448',
        email: 'moraissamuel009@gmail.com',
        password: 'S@muel123'
      },
      {
        full_name: 'Pedro Henrique Garcia',
        phone: '38988449448',
        email: 'pedrogarcia@gmail.com',
        password: 'pedro123',
      },
      {
        full_name: 'Fernanda Gonçalves da Silva',
        phone: '38988228793',
        email: 'fernandasilva006@gmail.com',
        password: 'fee123',
      }
    ]);
  },
  down: async (queryInterface : QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  }
}