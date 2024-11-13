import React, { useEffect } from 'react';
import { TbLogout, TbAlignBoxCenterMiddleFilled } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiWarningCircleFill } from "react-icons/pi";
import { MdPrivacyTip } from "react-icons/md";
import profile from "../assets/profile.png";
import Styles from '../Css/Navbar.module.css';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const closeBtn = useRef(null);
  const handleOnClose = (e)=>{
    if(closeBtn.current){
      closeBtn.current.click();
    }
  }
  const handleLogoutBtn = ()=>{
    cookies.remove("UserCookie");
    navigate('/login')
  }
  const navItems = [
    { label: "Home", icon: <FaHome />, route: "" },
    { label: "Change Password", icon: <RiLockPasswordFill />, route: "changePassword" },
    { label: "About", icon: <PiWarningCircleFill />, route: "about" },
    { label: "Terms And Conditions", icon: <TbAlignBoxCenterMiddleFilled />, route: "termsAndCondition" },
    { label: "Privacy Policy", icon: <MdPrivacyTip />, route: "privacyPolicy" },
  ];

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className={`${Styles["nav-main"]} container-xl`}>
          <Link className="navbar-brand my-3 fs-5">
            Hi, userName
            <br />
            <p className="text-secondary fs-6">Book your favorite meals</p>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-end text-bg-dark"
            style={{ width: "250px" }}
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header gap-3">
              <img src={profile} alt="profile" width="30" height="30" />
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Hi, Username
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                ref={closeBtn}
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {navItems.map((item, index) => (
                  <li className="nav-item" key={index} >
                    <Link
                      className="nav-link"
                      to={item.route}
                      onClick={handleOnClose}
                    >
                      {item.icon} &nbsp; {item.label}
                    </Link>
                  </li>
                ))}
                <hr />
                <li className="nav-item" onClick={handleLogoutBtn}>
                  <Link className="nav-link" to="login" >
                    <TbLogout /> &nbsp; Log Out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
