import React from "react";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <RegisterForm />
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Вже є акаунт? <Link to="/login">Увійти</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
