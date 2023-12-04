import React, { FC, MouseEvent } from "react";

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: string;
}

const Button: FC<ButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
