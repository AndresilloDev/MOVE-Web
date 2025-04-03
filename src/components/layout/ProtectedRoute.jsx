import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const location = useLocation();

  if (!user) return <Navigate to="/" replace state={{ from: location }} />;
  if (!user.isAdmin) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default ProtectedRoute;