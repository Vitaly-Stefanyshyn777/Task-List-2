import React, { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { registerUser } from "../api";
import { setUser, setLoading, setError } from "../authSlice";

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch(setError("Паролі не співпадають."));
      return;
    }

    try {
      dispatch(setLoading(true));
      const user = await registerUser(email, password);
      dispatch(setUser({ email: user.email!, uid: user.uid }));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Підтвердіть пароль"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Зареєструватись</button>
    </form>
  );
};

export default RegisterForm;
