import React from "react";

const Button = ({type,buttonName,className,onClick}) => {
  return <button type={type} className={className} onClick={onClick}>{buttonName}</button>;
};

export default Button;
