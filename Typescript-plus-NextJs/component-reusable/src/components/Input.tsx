import React, { ChangeEvent, FC } from "react";

interface InputProps {
  type: "text" | "password" | "number"; // Specify the allowed input types
  value: string | number;
  required?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Input: FC<InputProps> = ({
  type,
  required,
  value,
  placeholder,
  onChange,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type={type}
      required={required}
      value={value}
      placeholder={placeholder}
      onChange={handleInputChange}
    />
  );
};

export default Input;
