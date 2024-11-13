import Styles from "../Css/Login.module.css";
import { LuUserCheck } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiShow } from "react-icons/bi";
import photo from '../assets/logo.svg'
import photo2 from '../assets/logo-sm.svg'
const Register = () => {
  
  return (
    <>
      <div className={Styles.main}>
        <div className={Styles.left}>
          <div>
            <img src={photo} className={Styles.photo} alt="logo" />
            <img src={photo2} className={Styles.photo2} alt="" />
          </div>
        </div>
        <div className={`${Styles.right}`}>
          <div className={Styles.rightIn}>
            <form>
              <h2>Registration</h2>
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
                  <input type="text" className="mx-2" id="Username" />
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
                  <input type="password" className="mx-2" id="password" />
                  <div className={Styles.sh} ><BiShow /></div>
                  
                </div>
              </div>
              <div className={Styles.password}>
                <label htmlFor="confirmPassword">
                  Confirm Password{" "}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <div className={Styles.in}>
                  <RiLockPasswordLine />
                  <input type="password" className="mx-2" id="confirmPassword" />
                  <div className={Styles.sh} ><BiShow /></div>
                  
                </div>
              </div>
              <button type="submit">Submit</button>
              <div className={Styles.forget}>Forget Password</div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
