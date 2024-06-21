import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "../../app/services/authService";
import styles from "./styles/Login.module.css";

import { MdOutlineVisibilityOff } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().email("Invalid email format").required(),
    password: yup
      .string()
      .required()
      .min(8, "Password must be at least 8 characters"),
  })
  .required();

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const userData = await login(data).unwrap();
      dispatch(setCredentials(userData));
      localStorage.setItem("user", JSON.stringify(userData.user));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={styles.login}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2>Sign In</h2>
          <p>Log in to your account to continue.</p>
          {isError && (
            <span className={styles.passwordError}>{error?.data?.message}</span>
          )}
          {isSuccess && (
            <span className={styles.successText}>Logged in Successfully!</span>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email", { required: true })} />
            <p className={styles.passwordError}>{errors.email?.message}</p>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                required: "this is required",
                minLength: {
                  value: 8,
                  message: "min lenght is 8",
                },
              })}
            />
            <MdOutlineVisibilityOff
              className={styles.togglePassword}
              onClick={handleTogglePassword}
            />
            <p className={styles.passwordError}>{errors.password?.message}</p>
          </div>

          <div className={styles.from_forgot}>
            <Link to={"/auth/forgot-password"}>Forgot password?</Link>
          </div>

          <div className={styles.formAction}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </form>
        <div className={styles.formFooter}>
          <div className={styles.formFooter_Line}>
            <span className={styles.formFooter_Text}>OR CONTINUE WITH</span>
          </div>
          <div className={styles.formFooter_Methods}>
            <button>Google</button>
            <button disabled>Facebook</button>
            <button disabled>Twitter</button>
          </div>
          <div className={styles.formFooter_Link}>
            <p>
              Don't have an account? <Link to={"/auth/signup"}>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
