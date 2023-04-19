import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
      <BrowserRouter>
          <Navbar />
          <Routes>
              <Route exact path="/" element={<Navigate replace to="auth/login" />} />
              <Route exact path="auth">
                  <Route path="login" element={<LoginPage />} />
                  <Route path="signup" element={<SignupPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}