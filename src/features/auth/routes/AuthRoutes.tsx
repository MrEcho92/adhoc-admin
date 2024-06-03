import { Route, Routes } from "react-router-dom";
import LoginPage from "../page/LoginPage";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<div>Sign page</div>} />
    </Routes>
  );
}
