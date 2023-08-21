import { ChangeEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface IInputPassword {
  name: string;
  value: string;
  showPassword: boolean;

  setShowPassword: (params : boolean) => void;
  handleChange: (event : ChangeEvent<HTMLInputElement>) => void;
}

export const InputPassword = ({ name, value, handleChange, showPassword, setShowPassword }
  : IInputPassword) => {

  return (
    <label htmlFor={ name }>
    <input
      type={showPassword ? "text" : "password"}
      id={ name }
      name={ name }
      placeholder={ name }
      value={ value}
      onChange={ handleChange }
    />
    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </label>
  )
}