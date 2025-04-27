import React from "react";
import RegisterForm from "@/features/auth/components/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Реєстрація</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
