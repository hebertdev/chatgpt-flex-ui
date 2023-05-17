import { Routes, Route } from "react-router-dom";

//auth helpers
import { getToken } from "@/helpers/auth";

//pages
import Home from "@/pages/Home";

export default function AppRoutes() {
  return <>{getToken() ? <LoginRoutes /> : <LogoutRoutes />}</>;
}

function LoginRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

function LogoutRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
