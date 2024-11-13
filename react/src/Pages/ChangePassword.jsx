import React, { useState } from "react";
import Styles from "../Css/ChangePassword.module.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordInput from "../Components/PasswordInput";
import Button from "../Components/Button";
import { SuccessToast } from "../Constants/SuccessToast";
import { useContext } from "react";
import { contextProvider } from "../Utils/ValidationProvider";

const ChangePassword = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [oldPassword, setOldPassword] = useState("");
  const {validateChangePassword} = useContext(contextProvider);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateChangePassword(oldPassword,password,confirmPassword)) {
      toast.success("submitted successful!", SuccessToast);
    }
  };
 
  const InputData = [
    {
      label: "old password",
      id: "oldPassword",
      value: oldPassword ,
      showIcon: false,
      placeholder:"Old Password",
      onChange: (e) => setOldPassword(e.target.value) ,
    },
    {
      label: "New Password",
      id: "newPassword",
      value:password ,
      showIcon: false,
      placeholder:"new Password",
      onChange: (e) => setPassword(e.target.value),
    },
    {
      label: "Confirm Password",
      id: "confirmPassword",
      value:  confirmPassword ,
      showIcon: true,
      placeholder:"Confirm Password",
      onChange: (e) => setConfirmPassword(e.target.value),
    },
  ];

  return (
    <>
      <div className={`${Styles["cal-main"]} container`}>
        <h2 className="my-3 text-center">Change Password</h2>
        <form onSubmit={handleSubmit}>
          {InputData.map((item, i) => (
            <PasswordInput
              key={i}
              label={item.label}
              id={item.id}
              value={item.value}
              onChange={item.onChange}
              showIcon={item.showIcon}
              placeholder={item.placeholder}
            />
          ))}
          <div className="col-auto">
            <Button type="submit" className="btn w-100 btn-secondary" buttonName="submit"></Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ChangePassword;
