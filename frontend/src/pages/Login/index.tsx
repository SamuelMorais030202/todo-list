import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { requestLogin, setToken } from "../../services/request";

import './index.css';

export const Login = () : JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { token } = await requestLogin('/login', { email, password });
      setToken(token);

      localStorage.setItem('token', token);

      setIsLogged(true);
    } catch (error) {
      setFailedLogin(true);
      setEmail('');
      setPassword('');
    }
  }

  if (isLogged) return <Navigate to="/home" />

  return (
    <div className="page-login">
      <h1>Login</h1>
      <section className="form">
        <label htmlFor="email-login" className="label-form">
          <input
            type="text"
            placeholder="Email"
            id="email-login"
            name="email"
            className="input"
            value={ email }
            onChange={ (event : React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value) }
          />
        </label>
        <label htmlFor="password-input" className="label-form">
          <input
            type={showPassword ? "text" : "password"}
            id="password-input"
            name="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </label>
        <button
          type="button"
          className="button-login"
          onClick={ handleLogin }
        >
          Login
        </button>
      </section>
      {
        failedLogin
        ? <p>Email or password invalid</p>
        : null
      }
      <p onClick={ () => { navigate('/new-profile') }}>Criar conta</p>
    </div>
  )
}