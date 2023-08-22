import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";
import { requestAddUser } from "../../services/request";

import './index.css';

export const NewProfile = () : JSX.Element => {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [erroRequest, setErrorRequest] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (formState.password !== formState.confirmPassword) {
      return alert('A confirmação de senha está inválida');
    }

    try {
      await requestAddUser(formState);
      alert('Usuário criado com sucesso');
      navigate('/login');
    } catch (err : any) {
      setErrorRequest(err.response.data.message);
    }
  }

  const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="new-profile-page">
      <h1>Create your account</h1>
      <section className="form newProfile">
        <Input
          name="fullName"
          handleChange={ handleChange }
          value={ formState.fullName }
          type="text"
        />
        <Input
          name="email"
          handleChange={ handleChange }
          value={ formState.email }
          type="text"
        />
        <label htmlFor="phone" className="label-form">
          <input
            type="tel"
            id="phone"
            placeholder="(00) 0000-0000"
            name="phone"
            value={ formState.phone }
            onChange={ handleChange }
            className="input"
          />
        </label>
        <InputPassword
          name="password"
          handleChange={ handleChange }
          value={ formState.password }
          showPassword={ showPassword }
          setShowPassword={ setShowPassword }
        />
        <InputPassword
          name="confirmPassword"
          handleChange={ handleChange }
          value={ formState.confirmPassword }
          showPassword={ showConfirmPassword }
          setShowPassword={ setShowConfirmPassword }
        />
        <button
          type="button"
          onClick={ handleSubmit }
          className="button btn-new-profile"
        >
          Register
        </button>
      </section>
  
      {
        erroRequest && (
          <p className="error-request">{ erroRequest }</p>
        )
      }
  
    </div>
  )
}