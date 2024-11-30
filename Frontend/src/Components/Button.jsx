import React from "react";

const Button = ({type,buttonName,className,onClick,databstoggle,databstarget}) => {
  return <button type={type} className={className} onClick={onClick} data-bs-toggle={databstoggle} data-bs-target={databstarget}>{buttonName}</button>;
};

export default Button;
