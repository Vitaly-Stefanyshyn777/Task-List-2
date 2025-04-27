import React from "react";
import { useAppDispatch } from "@/app/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "../api";
import { setUser, setLoading, setError } from "../authSlice";

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async ({
    email,
    password,
    confirmPassword,
  }) => {
    if (password !== confirmPassword) {
      dispatch(setError("Паролі не співпадають."));
      return;
    }
    dispatch(setLoading(true));
    try {
      const user = await registerUser(email, password);
      dispatch(setUser({ email: user.email ?? "", uid: user.uid }));
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Помилка реєстрації";
      dispatch(setError(msg));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email обов'язковий" })}
        />
        {errors.email && (
          <span style={{ color: "red" }}>{errors.email.message}</span>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Пароль"
          {...register("password", { required: "Пароль обов'язковий" })}
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password.message}</span>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Підтвердіть пароль"
          {...register("confirmPassword", { required: "Підтвердьте пароль" })}
        />
        {errors.confirmPassword && (
          <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
        )}
      </div>
      <button type="submit" disabled={isSubmitting}>
        Зареєструватись
      </button>
    </form>
  );
};

export default RegisterForm;
