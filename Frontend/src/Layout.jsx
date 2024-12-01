import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
import { toastStyle } from "./Constants/general";
import { toast } from "react-toastify";

const Layout = () => {
  const location = useLocation();
  useEffect(() => {
    document.body.style.overflow = "auto";
  }, [location]);

  return (
    <>
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default Layout;
