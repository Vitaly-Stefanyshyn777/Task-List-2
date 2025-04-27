// import React from "react";
// import LoginForm from "@/features/auth/components/LoginForm";

// const LoginPage: React.FC = () => {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Увійти</h1>
//       <LoginForm />
//     </div>
//   );
// };

// export default LoginPage;
import React from "react";
import LoginForm from "@/features/auth/components/LoginForm";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Увійти</h1>
      <LoginForm />
      <p style={{ marginTop: "20px" }}>
        Немає акаунту?{" "}
        <Link
          to="/register"
          style={{ color: "#4CAF50", textDecoration: "underline" }}
        >
          Зареєструватися
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
