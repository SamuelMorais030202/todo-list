import { useState } from "react";
import { requestAddTask, requestData } from "../../services/request";

interface AddTaskProps {
  setTasks: React.Dispatch<React.SetStateAction<never[]>>;
}

export const AddTask = ({ setTasks } : AddTaskProps ) => {
  const [description, setDescription] = useState(''); 
  const [data, setData] = useState('');

  const addTask = async () => {
    if (description.length === 0 || data.length === 0) {
      return alert('Fill in all fields');
    }

    try {
      await requestAddTask({ description, data, completed: false });
      const request = await requestData('/task');
      setTasks(request);
      setData('');
      setDescription('');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="add-task">
      <label htmlFor="description" className="label-form">
        <input
          type="text"
          id="description"
          name="description"
          className="input-add-task"
          placeholder="description"
          value={ description }
          onChange={ (event : React.ChangeEvent<HTMLInputElement>) =>
            setDescription(event.target.value) }
        />
      </label>
      <label htmlFor="data" className="label-form">
        <input
          type="date"
          id="data"
          className="input-add-task"
          name="data"
          value={ data }
          onChange={ (event : React.ChangeEvent<HTMLInputElement>) =>
            setData(event.target.value) }
        />
      </label>
      <button
        type="button"
        className="button-add-task"
        onClick={ addTask }
      >
        To add
      </button>
    </div>
  )
}