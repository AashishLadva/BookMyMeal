import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Layout from "./Layout";
import ChangePassword from "./Pages/ChangePassword";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import About from "./Pages/About";
import TermAndCondition from "./Pages/TermAndCondition";
import ValidationProvider from "./Utils/ValidationProvider";

function App() {

  return (
    <ValidationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
           <Route path="" element={<Home></Home>}></Route>
            <Route path="/changePassword" element={<ChangePassword></ChangePassword>}></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route path="/privacyPolicy" element={<PrivacyPolicy></PrivacyPolicy>}></Route>
            <Route path="/termsAndCondition" element={<TermAndCondition></TermAndCondition>}></Route>
          </Route>
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Register></Register>}></Route>
        </Routes>
      </BrowserRouter>
    </ValidationProvider>
  );
}

export default App;
