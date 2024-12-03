import React, { useContext, useEffect, useState } from "react";
import { TbLogout } from "react-icons/tb";
import profile from "../assets/profile.png";
import Styles from "../Css/Navbar.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { contextProvider } from "../Utils/ValidationsAndItemsProvider";
import Button from "./Button";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const closeBtn = useRef(null);
  const { navItems } = useContext(contextProvider);
  const { userName } = JSON.parse(cookies.get("UserCookie"));
  

  const handleOnClose = () => {
    closeBtn.current.click();
  };
  const handleLogoutBtn = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className={`${Styles["nav-main"]} container-xl`}>
        <Link to="/" className="navbar-brand my-3 fs-5">
          <FaHome className={Styles["home-icon"]}/>
          Hi, {userName}
          <br />
          <p className="text-secondary fs-6">Book your favorite meals</p>
        </Link>
        <Button
          type="button"
          buttonName={<span className="navbar-toggler-icon"></span>}
          className="navbar-toggler"
          databstoggle="offcanvas"
          databstarget="#offcanvasDarkNavbar"
        />
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
              Hi, {userName}
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
              {navItems.map((item, i) => (
                <li className="nav-item" key={i}>
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
                <Link className="nav-link" to="login">
                  <TbLogout /> &nbsp; Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
