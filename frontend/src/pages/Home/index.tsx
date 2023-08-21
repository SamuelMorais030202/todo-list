import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestData, setToken, } from "../../services/request";
import { AddTask } from "../../components/AddTask";
import { ListTasks } from "../../components/ListTasks";

import './index.css';

export const Home = () : JSX.Element => {
  const [tasks, setTasks] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token') || '';

      if (!token) {
        navigate('/login');
      } else {
        setToken(token);

        try {
          await requestData('/login/autehticated');
          setAuthenticated(true);
          const request = await requestData('/task');
          setTasks(request);
        } catch (err) {
          navigate('/login');
          return;
        }
      }
    })();
  }, [navigate]);

  if (!authenticated) return <div>Loading...</div>

  return (
    <div className="home-page">
      <header>
        <h1>Todo-list</h1>
      </header>
      <AddTask setTasks={ setTasks } />
      <ListTasks tasks={ tasks } setTasks={ setTasks } />
    </div>
  )
}