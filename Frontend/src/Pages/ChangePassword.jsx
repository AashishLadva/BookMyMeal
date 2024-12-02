import React, { useState } from "react";
import Styles from "../Css/ChangePassword.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordInput from "../Components/PasswordInput";
import Button from "../Components/Button";
import { toastStyle } from "../Constants/general";
import { useContext } from "react";
import { contextProvider } from "../Utils/ValidationsAndItemsProvider";
import axios from "axios";
import cookies from 'js-cookie';
import Spinner from "../Components/Spinner";

const ChangePassword = () => {
  const { validateChangePassword, isAuthenticate } =
    useContext(contextProvider);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const {id} = JSON.parse(cookies.get("UserCookie"));
  const [loading, setLoading] = useState(false);

  const InputData = [
    {
      label: "Old Password",
      id: "oldPassword",
      value: oldPassword,
      showIcon: false,
      placeholder: "Old Password",
      onChange: (e) => setOldPassword(e.target.value),
    },
    {
      label: "New Password",
      id: "newPassword",
      value: password,
      showIcon: false,
      placeholder: "New Password",
      onChange: (e) => setPassword(e.target.value),
    },
    {
      label: "Confirm Password",
      id: "confirmPassword",
      value: confirmPassword,
      showIcon: true,
      placeholder: "Confirm Password",
      onChange: (e) => setConfirmPassword(e.target.value),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      validateChangePassword(oldPassword, password, confirmPassword) &&
      isAuthenticate()
    ) {
      const data = {employeeId:id,currentPassword:oldPassword,newPassword:password};
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:8080/employees/changePassword",
          data
        );
        if(response.status===200){
          toast.success(response.data,toastStyle);
        }
      } catch (error) {
        if (error.response) {
          toast.error(
            (error.response?.data || error.message),
            toastStyle
          );
        } else {
          toast.error(error.message, toastStyle);
        }
      } finally {
        setLoading(false);
      }
    }
  };

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
            <Button
              type="submit"
              className="btn w-100 btn-secondary"
              buttonName="Submit"
            ></Button>
          </div>
        </form>
      </div>
      <ToastContainer />
      {loading && <Spinner />}
    </>
  );
};

export default ChangePassword;
