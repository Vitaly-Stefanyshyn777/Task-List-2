import React, { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { loginUser } from "../api";
import { setUser, setLoading, setError } from "../authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const user = await loginUser(email, password);
      dispatch(setUser({ email: user.email ?? "", uid: user.uid }));
      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Помилка входу";
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Введіть email"
        required
        style={inputStyle}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Введіть пароль"
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        Увійти
      </button>
    </form>
  );
};

export default LoginForm;
