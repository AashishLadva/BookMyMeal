import { createContext, useEffect } from "react";
import { toastStyle } from "../Constants/general";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import { TbAlignBoxCenterMiddleFilled } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiWarningCircleFill } from "react-icons/pi";
import { MdPrivacyTip } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import cookies from "js-cookie";
import { LicenseInfo } from "@mui/x-license-pro";

export const contextProvider = createContext({
  validateUserEmail: () => {},
  validatePassword: () => {},
  validateChangePassword: () => {},
  navItems: [],
  isBookingDinner: () => {},
  isBookingLunch: () => {},
  isAuthenticate: () => {},
});

const validateUserEmail = (userEmail) => {
  const userEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!userEmail) {
    toast.error("👤 Useremail is required!", toastStyle);
    return false;
  } else if (!userEmailPattern.test(userEmail)) {
    toast.error("👤 Please enter a valid email address.", toastStyle);
    return false;
  }
  return true;
};
const validatePassword = (password) => {
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
};

const validateChangePassword = (oldPassword, password, confirmPassword) => {
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
  if (!oldPassword) {
    toast.error("🔒 old Password is required", toastStyle);
    return false;
  } else if (!password) {
    toast.error("🔒 New Password is required", toastStyle);
    return false;
  } else if (password == oldPassword) {
    toast.error(
      "🔒 your new password cannot be the same as your old password",
      toastStyle
    );
    return false;
  } else if (!confirmPassword) {
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
};

const navItems = [
  { label: "Home", icon: <FaHome />, route: "" },
  {
    label: "Change Password",
    icon: <RiLockPasswordFill />,
    route: "changePassword",
  },
  { label: "About", icon: <PiWarningCircleFill />, route: "about" },
  {
    label: "Terms And Conditions",
    icon: <TbAlignBoxCenterMiddleFilled />,
    route: "termsAndCondition",
  },
  { label: "Privacy Policy", icon: <MdPrivacyTip />, route: "privacyPolicy" },
];

const isBookingDinner = () => {
  const now = dayjs();
  const cutoffTime = dayjs().hour(15).minute(0);
  return now.isBefore(cutoffTime);
};

const isBookingLunch = () => {
  const now = dayjs();
  const cutoffTime = dayjs().hour(22).minute(0);
  return now.isBefore(cutoffTime);
};

const isAuthenticate = () => {
  const token = sessionStorage.getItem("authToken");
  if (!token) {
    toast.error("No token found. Please log in again.", toastStyle);
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.round(Date.now() / 1000);
    
    if (decodedToken.exp > currentTime) {
      return true;
    } else {
      toast.error("Session expired. Please log in again.", toastStyle);
      cookies.remove("UserCookie");
      sessionStorage.removeItem("authToken");
      return false;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    toast.error("Invalid token. Please log in again.", toastStyle);
    cookies.remove("UserCookie");
    sessionStorage.removeItem("authToken");
    return false;
  }
};
const ValidationsAndItemsProvider = ({ children }) => {
  LicenseInfo.setLicenseKey(
    "e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y"
  );
  return (
    <contextProvider.Provider
      value={{
        validateUserEmail,
        validatePassword,
        validateChangePassword,
        
        navItems,
        isBookingDinner,
        isBookingLunch,
        isAuthenticate,
      }}
    >
      {children}
    </contextProvider.Provider>
  );
};

export default ValidationsAndItemsProvider;
