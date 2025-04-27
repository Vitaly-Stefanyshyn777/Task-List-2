import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "../authSlice";

const AuthLoader: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const uid = localStorage.getItem("uid");

    if (email && uid) {
      dispatch(setUser({ email, uid }));
    }
  }, [dispatch]);

  return null;
};

export default AuthLoader;
