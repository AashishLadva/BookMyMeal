import Styles from "../Css/Login.module.css";
import { LuUserCheck } from "react-icons/lu";
import photo from "../assets/logo.svg";
import photo2 from "../assets/logo-sm.svg";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiHide, BiShow } from "react-icons/bi";
import {  useLocation, useNavigate } from "react-router-dom";
import { SuccessToast, toastStyle } from "../Constants/general";
import { useContext } from "react";
import { contextProvider } from "../Utils/ValidationsAndItemsProvider";
import cookies from 'js-cookie';
import axios from 'axios';
import Spinner from "../Components/Spinner";


const Login = () => {
  const {validateUserEmail,validatePassword} = useContext(contextProvider);
  const [showPassword,setShawPassword] =useState(false);
  const navigate = useNavigate('');
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const visible = () => {
    setShawPassword((prev)=>!prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateUserEmail(userEmail) && validatePassword(password)) {
      const data={email:userEmail,password:password};
      setLoading(true);
      try{
        const response  = await axios.post( "http://localhost:8080/employees/login",data);
        if(response.status === 200){
        cookies.set("UserCookie", JSON.stringify({id:response.data.id,userName:response.data.name}) );
        toast.success("Login successful!", SuccessToast);
        setTimeout(()=>{
          navigate("/");
        },1500);
      }else{
        toast.error(response.message, toastStyle);
      }}
      catch(error){
        if (error.status === 400) {
          const errorMessage =
            error.response?.data || "Something went wrong! Please try again.";
          toast.error(errorMessage, toastStyle);
        } else if(error.status === 401){
          const errorMessage =
            error.response?.data || "Please check Email end password";
          toast.error(errorMessage, toastStyle);
        }
        else{
          toast.error(error.message,toastStyle)
        }
      }finally{
        setLoading(false);
      } 
    }
  };
  const location = useLocation();
  useEffect(() => {
    document.body.style.overflow = "auto";
  }, [location]);

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
                <label htmlFor="Useremail">
                  User Email{" "}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <div className={Styles.in}>
                  <LuUserCheck />
                  <InputField
                    type="email"
                    placeholder="Enter email"
                    value={userEmail}
                    id="Useremail"
                    name="Useremail"
                    className='mx-2'
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
                    className='mx-2'
                    onChange={(e)=>setPassword(e.target.value)}
                  ></InputField>
                  <div className={Styles.sh} id="see" onClick={visible}>
                    {showPassword?<BiHide />:<BiShow />}
                  </div>
                </div>
              </div>
              <Button type="submit" className={`${Styles["login-btn"]} mb-4`} buttonName="Login" />
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      {loading && <Spinner />}
      
    </>
  );
};

export default Login;
