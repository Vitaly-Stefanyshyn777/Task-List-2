import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/features/auth/authSlice";
import { STORAGE_KEYS } from "@/constants/storageKeys";

const PrivateRoute: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    const email = localStorage.getItem(STORAGE_KEYS.email);
    const uid = localStorage.getItem(STORAGE_KEYS.uid);
    if (email && uid) {
      dispatch(setUser({ email, uid }));
      return null;
    }
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
