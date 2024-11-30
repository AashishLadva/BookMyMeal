import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import InputField from "./InputField";


const PasswordInput = ({ label, id, placeholder, value, onChange, showIcon }) => {
    const [showPassword,setShawPassword] = useState(false);

    const hanleSawPass = () => {
      setShawPassword((prev)=>!prev);
    };
  return (
    <>
      <div className="row mb-3">
        <label htmlFor={id} className="col-sm-3 col-form-label">
          {label}:
        </label>
        <div className="col-sm-9">
          <div className="input-group">
            <InputField
              type={showPassword?"text":"password"}
              className="form-control"
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
            {showIcon && (
              <div
                className="input-group-text"
                onClick={hanleSawPass}
              >
                {showPassword?<BiHide />:<BiShow />}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
