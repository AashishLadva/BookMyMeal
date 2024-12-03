import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./Pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Home from "./Pages/Home";
import Layout from "./Layout";
import ChangePassword from "./Pages/ChangePassword";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import About from "./Pages/About";
import TermAndCondition from "./Pages/TermAndCondition";
import ValidationsAndItemsProvider from "./Utils/ValidationsAndItemsProvider";
import ProtectRoutes from "./Components/ProtectRoutes";

const App = () => {
  return (
    <ValidationsAndItemsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectRoutes>
                <Layout />
              </ProtectRoutes>
            }
          >
            <Route path="" element={<Home />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="about" element={<About />} />
            <Route path="privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="termsAndCondition" element={<TermAndCondition />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ValidationsAndItemsProvider>
  );
};

export default App;
