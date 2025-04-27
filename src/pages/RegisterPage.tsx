// import React from "react";
// import RegisterForm from "@/features/auth/components/RegisterForm";

// const RegisterPage: React.FC = () => {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Реєстрація</h1>
//       <RegisterForm />
//     </div>
//   );
// };

// export default RegisterPage;
import React, { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { registerUser } from "@/features/auth/api";
import { setUser, setLoading, setError } from "@/features/auth/authSlice";

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch(setError("Паролі не співпадають."));
      return;
    }

    try {
      dispatch(setLoading(true));
      const user = await registerUser(email, password);
      dispatch(setUser({ email: user.email!, uid: user.uid }));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Помилка реєстрації";
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Реєстрація</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Підтвердіть пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition"
          >
            Зареєструватися
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Вже маєте акаунт?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Увійти
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
