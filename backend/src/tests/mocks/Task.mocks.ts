import ITask from "../../interfaces/Tasks/Task"
import { NewEntity } from "../../interfaces/User/UserModel";

const listTaskUserId = [
  {
    id: 1,
    userId: 1,
    completed: false,
    data: '2023-09-25',
    description: 'Criar um currículo frontend'
  },
  {
    id: 2,
    userId: 1,
    completed: false,
    data: '2023-09-26',
    description: 'Criar um currículo backed'
  },
  {
    id: 3,
    userId: 1,
    completed: false,
    data: '2023-09-26',
    description: 'Me candidatar para 3 vagas frontend'
  },
];

const tasksCompleted = [
  {
    id: 1,
    userId: 1,
    completed: true,
    data: '2023-09-25',
    description: 'Criar um currículo frontend'
  },
  {
    id: 2,
    userId: 1,
    completed: true,
    data: '2023-09-26',
    description: 'Criar um currículo backed'
  },
  {
    id: 3,
    userId: 1,
    completed: true,
    data: '2023-09-26',
    description: 'Me candidatar para 3 vagas frontend'
  },
]

const newTask = {
  id: 4,
  completed: false,
  data: '2023-09-25',
  description: 'Me candidatar para uma vaga backend',
  userId: 1,
}

const login = {
  email: 'moraissamuel009@gmail.com',
  password: 'S@muel123'
}

export {
  listTaskUserId,
  newTask,
  login,
  tasksCompleted,
}