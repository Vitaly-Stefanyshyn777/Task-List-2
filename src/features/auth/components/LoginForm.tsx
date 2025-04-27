// import React, { useState } from "react";
// import { useAppDispatch } from "@/app/hooks";
// import { loginUser } from "../api";
// import { setUser, setLoading, setError } from "../authSlice";
// import { useNavigate } from "react-router-dom";

// const LoginForm: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       dispatch(setLoading(true));
//       const user = await loginUser(email, password);
//       dispatch(setUser({ email: user.email!, uid: user.uid }));
//       navigate("/");
//     } catch (error: any) {
//       dispatch(setError(error.message));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Пароль"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Увійти</button>
//     </form>
//   );
// };

// export default LoginForm;

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
      navigate("/"); // Перекидуємо на головну після логіну
    } catch (error: any) {
      dispatch(setError(error?.message || "Помилка входу"));
    } finally {
      dispatch(setLoading(false));
    }
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
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Введіть пароль"
        required
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "12px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Увійти
      </button>
    </form>
  );
};

export default LoginForm;
