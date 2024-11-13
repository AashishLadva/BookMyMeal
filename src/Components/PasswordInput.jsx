import React, { useState } from "react";
import { useRef } from "react";
import { BiShow } from "react-icons/bi";

const PasswordInput = ({ label, id, placeholder, value, onChange, showIcon }) => {
    const passwordRef = useRef(null);
    const hanleSawPass = () => {
      if (passwordRef.current.type === "password") {
        passwordRef.current.type = "text";
      } else {
        passwordRef.current.type = "password";
      }
    };
  return (
    <>
      <div className="row mb-3">
        <label htmlFor={id} className="col-sm-3 col-form-label">
          {label}:
        </label>
        <div className="col-sm-9">
          <div className="input-group">
            <input
              type="password"
              className="form-control"
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              ref={passwordRef}
            />
            {showIcon && (
              <div
                className="input-group-text"
                onClick={hanleSawPass}
              >
                <BiShow />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
