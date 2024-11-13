import React from "react";

const InputField = ({ onChange, type, placeholder, value,id,name }) => {
  return (
    <>
      <input
        type={type}
        className="mx-2"
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default InputField;
