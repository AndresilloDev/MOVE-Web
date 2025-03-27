import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) return <Navigate to="/" replace />;
  if (!user.isSuperAdmin) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default ProtectedRoute;