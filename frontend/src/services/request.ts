import axios from "axios";
import { ITask } from "../interfaces/ITask";
import { IRequestAddTask } from "../interfaces/IRequestAddTask";
import { IRequestLogin } from "../interfaces/IRequestLogin";

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || 3001}`,
});

export const setToken = (token : string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
};

export const requestData = async (endpoint : string) : Promise<any[] | any> => {
  const { data } = await api.get(endpoint);
  return data;
}

export const requestLogin = async (endpoint : string, body : IRequestLogin) => {
  const { data } = await api.post(endpoint, body);
  return data;
}

export const requestAddTask = async (body : IRequestAddTask) => {
  const { data } = await api.post('/task', body);
  return data
}

export const requestDelete = async (id : string) => {
  const { data } = await api.delete(`/task/${id}`);
  return data;
}

export const uptadeTask = async (endpoint : string, body : ITask) => {
  const { data } = await api.put(endpoint, body);
  return data;
}