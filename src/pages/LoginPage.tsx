import React from "react";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Увійти</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
