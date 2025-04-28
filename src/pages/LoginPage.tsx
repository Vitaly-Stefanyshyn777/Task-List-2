import React from "react";
import LoginForm from "@/features/auth/components/LoginForm";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <LoginForm />
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Немає акаунта? <Link to="/register">Зареєструватися</Link>
      </p>
    </div>
  );
};

export default LoginPage;
