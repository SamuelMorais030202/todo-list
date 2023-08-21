import { ChangeEvent } from "react";

export interface IInput {
  name: string;
  value: string;

  handleChange: (event : ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ name, value, handleChange } : IInput) => (
  <label htmlFor={ name } className="label-form">
    <input
      type="text"
      id={ name }
      placeholder={ name }
      name={ name }
      value={ value }
      onChange={ handleChange }
      className="input"
    />
  </label>
)