import Styles from "../Css/Login.module.css";
import { LuUserCheck } from "react-icons/lu";
import photo from "../assets/logo.svg";
import photo2 from "../assets/logo-sm.svg";
import {  useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { SuccessToast } from "../Constants/SuccessToast";
import { useContext } from "react";
import { contextProvider } from "../Utils/ValidationProvider";
import cookies from 'js-cookie';


const Login = () => {
const {validateUserEmail,validatePassword} = useContext(contextProvider);
  const [showPassword,setShawPassword] =useState(false);
  const visible = () => {
    setShawPassword((prev)=>!prev);
  };

  const navigate = useNavigate('');
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateUserEmail(userEmail) && validatePassword(password)) {
      toast.success("Login successful!", SuccessToast);
      console.log("Form submitted", { userEmail, password });
      setTimeout(()=>{
        cookies.set("UserCookie", userEmail);
        navigate("/");
      },1500);
    }
  };

  return (
    <>
      <div className={Styles.main}>
        <div className={Styles.left}>
          <div>
            <img src={photo} className={Styles.photo} alt="logo" />
            <img src={photo2} className={Styles.photo2} alt="logo2" />
          </div>
        </div>
        <div className={`${Styles.right}`}>
          <div className={Styles.rightIn}>
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <p>Enter the details below to continue.</p>

              <div className={Styles.userName}>
                <label htmlFor="Username">
                  Username{" "}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <div className={Styles.in}>
                  <LuUserCheck />
                  <InputField
                    type="email"
                    placeholder="Enter Useremail"
                    value={userEmail}
                    id="username"
                    name="Username"
                    onChange={(e) => setUserEmail(e.target.value)}
                  ></InputField>
                </div>
              </div>
              <div className={Styles.password}>
                <label htmlFor="password">
                  Password{" "}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <div className={Styles.in}>
                  <RiLockPasswordLine />
                  <InputField
                    type={showPassword?"text":"password"}
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  ></InputField>
                  <div className={Styles.sh} id="see" onClick={visible}>
                    {showPassword?<BiHide />:<BiShow />}
                  </div>
                </div>
              </div>
              <Button type="submit" className={`${Styles["login-btn"]} mb-4`} buttonName="Login"></Button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
