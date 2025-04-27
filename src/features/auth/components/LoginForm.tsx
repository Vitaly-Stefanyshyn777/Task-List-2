import React from "react";
import { useAppDispatch } from "@/app/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser } from "../api";
import { setUser, setLoading, setError } from "../authSlice";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async ({
    email,
    password,
  }) => {
    dispatch(setLoading(true));
    try {
      const user = await loginUser(email, password);
      dispatch(setUser({ email: user.email ?? "", uid: user.uid }));
      navigate("/");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Помилка входу";
      dispatch(setError(msg));
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
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "230px",
        margin: "0 auto",
      }}
    >
      <div>
        <input
          type="email"
          placeholder="Введіть email"
          {...register("email", { required: "Email обов'язковий" })}
          style={inputStyle}
        />
        {errors.email && (
          <span style={{ color: "red" }}>{errors.email.message}</span>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Введіть пароль"
          {...register("password", { required: "Пароль обов'язковий" })}
          style={inputStyle}
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password.message}</span>
        )}
      </div>
      <button type="submit" style={buttonStyle} disabled={isSubmitting}>
        Увійти
      </button>
    </form>
  );
};

export default LoginForm;
