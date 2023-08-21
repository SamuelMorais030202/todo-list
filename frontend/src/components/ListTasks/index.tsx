import { FaTrash } from "react-icons/fa";
import { ITask } from "../../interfaces/ITask";
import { IListTasks } from "../../interfaces/IListTasks";
import { requestData, requestDelete, uptadeTask } from "../../services/request";

import './index.css';

export const ListTasks = ({ tasks, setTasks } : IListTasks) => {

  const deleteTask = async (id : ITask['id']) => {
    await requestDelete(String(id));
    const request = await requestData('/task');
    setTasks(request);
  }

  const changeTask = async (task : ITask) => {
    task.completed = !task.completed;
    await uptadeTask('/task', task);
    const request = await requestData('/task');
    setTasks(request);
  }

  return (
    <div className="list-tasks">
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>date</th>
            <th>completed</th>
            <th>/</th>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map((task : ITask) => (
              <tr key={ task.id }>
                <td>{ task.description }</td>
                <td>{ String(task.data) }</td>
                <td>
                  {
                    <input
                      type="checkbox"
                      checked={ task.completed }
                      onChange={ () => changeTask(task) }
                    />
                  }
                </td>
                <td>
                  <button
                    onClick={ () => deleteTask(task.id) }
                    className="btn-delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}