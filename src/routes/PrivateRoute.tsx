import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

const PrivateRoute: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
