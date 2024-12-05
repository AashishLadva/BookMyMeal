import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { contextProvider } from "./Utils/ValidationsAndItemsProvider";

const ProtectRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(null);
  const { isAuthenticate } = useContext(contextProvider);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token && isAuthenticate()) {
      setIsTokenValid(true);
    } else {
      setIsTokenValid(false);
      navigate("/login");
    }
  }, [navigate]);

  if (isTokenValid) {
    return children;
  }
};

export default ProtectRoutes;
