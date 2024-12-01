import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import cookies from 'js-cookie'
import { contextProvider } from "../Utils/ValidationsAndItemsProvider";
import { toastStyle } from "../Constants/general";

const ProtectRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(null);
  const {isAuthenticate} = useContext(contextProvider);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      try {
        if (isAuthenticate()) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
          navigate("/login");
        }
      } catch (error) {
        console.error("Invalid token or cookie format", error);
        setIsTokenValid(false);
        navigate("/login");
      }
    } else {
      setIsTokenValid(false);
      navigate("/login");
    }
  }, [navigate]);

  if (isTokenValid === null) {
    return null;
  }

  if (isTokenValid) {
    return children;
  }

  return null;
};

export default ProtectRoutes;



