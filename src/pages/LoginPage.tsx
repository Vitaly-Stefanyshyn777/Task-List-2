import { Link } from "react-router-dom";
import React from "react";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <h1>Увійти</h1>
      <LoginForm />
      <p style={{ marginTop: "1rem" }}>
        Немає акаунту?{" "}
        <Link to="/register" style={{ color: "blue" }}>
          Зареєструватись
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
