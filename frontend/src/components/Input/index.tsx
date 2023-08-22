import { ChangeEvent } from "react";

export interface IInput {
  name: string;
  value: string;
  type: string;

  handleChange: (event : ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ name, value, handleChange, type } : IInput) => (
  <label htmlFor={ name } className="label-form">
    <input
      type={ type }
      id={ name }
      placeholder={ name }
      name={ name }
      value={ value }
      onChange={ handleChange }
      className="input"
    />
  </label>
)