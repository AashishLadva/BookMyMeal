import React from "react";
import { createContext } from "react";
import { toastStyle } from "../Constants/general";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const contextProvider = createContext({
  validateUserEmail: () => {},
  validatePassword:()=>{},
  validateChangePassword:()=>{}
});
 const validateUserEmail =(userEmail)=> {
  const userEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!userEmail) {
      toast.error("👤 Useremail is required!", toastStyle);
      return false;
    } else if (!userEmailPattern.test(userEmail)) {
      toast.error(
        "👤 Please enter a valid email address.",
        toastStyle
      );
      return false;
    }
    return true
}
const validatePassword = (password)=>{
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
  if (!password) {
    toast.error("🔒 Password is required!", toastStyle);
    return false;
  } else if (!passwordPattern.test(password)) {
    toast.error(
      "🔒 Password must be 8-16 characters, include uppercase, lowercase, and a number",
      toastStyle
    );
    return false;
  }
  return true;
}

const validateChangePassword = (oldPassword,password,confirmPassword)=>{
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
  if(!oldPassword){
    toast.error("🔒 old Password is required", toastStyle);
    return false;
  }
  else if (!password) {
    toast.error("🔒 New Password is required", toastStyle);
    return false;
  }else if(password == oldPassword){
    toast.error("🔒 your new password cannot be the same as your old password", toastStyle);
    return false;
  } 
  else if (!confirmPassword) {
    toast.error("🔒Confirm Password is required", toastStyle);
    return false;
  } else if (password !== confirmPassword) {
    toast.error(
      "🔒 Please fill same Password and Confirm Password",
      toastStyle
    );
    return false;
  } else if (!passwordPattern.test(password)) {
    toast.error(
      "🔒 Password must be 8-16 characters, include uppercase, lowercase, and a number",
      toastStyle
    );
    return false;
  }
  return true;
}


const ValidationProvider  = ({children}) => {
  return (
    <contextProvider.Provider value={{ validateUserEmail,validatePassword,validateChangePassword }}>
      {children}
    </contextProvider.Provider>
  );
};

export default ValidationProvider;