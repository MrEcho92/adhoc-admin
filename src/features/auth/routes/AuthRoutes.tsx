import { Route, Routes } from "react-router-dom";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<div>login page</div>} />
      <Route path="login" element={<div>login page</div>} />
      <Route path="signup" element={<div>Sign page</div>} />
    </Routes>
  );
}
