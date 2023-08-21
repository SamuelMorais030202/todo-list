import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";
import { requestAddUser } from "../../services/request";

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
      <section className="newProfile">
        <Input name="fullName"
          handleChange={ handleChange }
          value={ formState.fullName }
        />
        <Input name="email" handleChange={ handleChange } value={ formState.email } />
        <Input name="phone" handleChange={ handleChange } value={ formState.phone } />
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
        <button type="button" onClick={ handleSubmit }>Register</button>
      </section>
      {
        erroRequest && (
          <p>{ erroRequest }</p>
        )
      }
    </div>
  )
}