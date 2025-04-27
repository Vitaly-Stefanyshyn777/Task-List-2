import { Link } from "react-router-dom";
import React from "react";
import RegisterForm from "@/features/auth/components/RegisterForm";

const RegisterPage: React.FC = () => {
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
      <h1>Реєстрація</h1>
      <RegisterForm />
      <p style={{ marginTop: "1rem" }}>
        Вже є акаунт?{" "}
        <Link to="/login" style={{ color: "blue" }}>
          Увійти
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
