import React from "react";

const InputField = ({ onChange, type, checked, placeholder,className, value,id,name,disabled  }) => {
  return (
    <>
      <input
        type={type}
        className={className}
        id={id}
        placeholder={placeholder}
        name={name}
        checked={checked}
        value={value}
        disabled ={disabled}
        onChange={onChange}
      />
    </>
  );
};

export default InputField;
