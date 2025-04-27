import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "../authSlice";
import { STORAGE_KEYS } from "@/constants/storageKeys";

const AuthLoader: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const email = localStorage.getItem(STORAGE_KEYS.email);
    const uid = localStorage.getItem(STORAGE_KEYS.uid);

    if (email && uid) {
      dispatch(setUser({ email, uid }));
    }
  }, [dispatch]);

  return null;
};

export default AuthLoader;
