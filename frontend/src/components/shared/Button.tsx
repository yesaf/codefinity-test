import React, { ButtonHTMLAttributes } from "react";

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button className="bg-blue-400" {...props}>
      {props.children}
    </button>
  );
};
