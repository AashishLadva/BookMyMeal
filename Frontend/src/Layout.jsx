import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
import Footer from "./Components/Footer";

const Layout = () => {
  const location = useLocation();
  useEffect(() => {
    document.body.style.overflow = "auto";
  }, [location]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
