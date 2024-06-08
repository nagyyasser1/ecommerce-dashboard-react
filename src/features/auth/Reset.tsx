import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../app/services/auth.service";
import styles from "./styles/Reset.module.css";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    token: yup.string().required(),
    password: yup
      .string()
      .required()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

interface RestPasswordFormData {
  token: string;
  password: string;
  confirmPassword: string;
}

const Reset: React.FC = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestPasswordFormData>({
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const onSubmit: SubmitHandler<RestPasswordFormData> = async (data) => {
    try {
      await resetPassword(data).unwrap();
      navigate("/auth/signin");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(error);

  return (
    <section className={styles.reset}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2>Reset Password</h2>
          <p>Please enter your new password.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formControl}>
            <label htmlFor="password">Password</label>
            <input
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
            <p className={styles.error_message}>{errors.password?.message}</p>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                required: "this is required",
                minLength: {
                  value: 8,
                  message: "min lenght is 8",
                },
              })}
            />
            <p className={styles.error_message}>{errors.password?.message}</p>
          </div>
          <div className={styles.formAction}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Reset"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Reset;
