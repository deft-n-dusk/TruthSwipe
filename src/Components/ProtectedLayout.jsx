
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const user = JSON.parse(localStorage.getItem("user")); 

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
