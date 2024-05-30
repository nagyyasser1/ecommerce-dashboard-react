import React from "react";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../app/services/auth";
import styles from "./styles/Forgot.module.css";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().email("Invalid email format").required(),
  })
  .required();

interface ForgotFormData {
  email: string;
}

const Forgot: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const onSubmit: SubmitHandler<ForgotFormData> = async (data) => {
    try {
      await forgotPassword(data).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={styles.forgot}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2>Forgot password?</h2>
          <p>
            Enter the email address associated with your account and we will
            send a link to reset your password.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {isSuccess && (
            <p className={styles.success_message}>
              We have send email successfully.
            </p>
          )}
          <div className={styles.formControl}>
            <label htmlFor="email">Email:</label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              name="email"
            />
            <p className={styles.passwordError}>{errors.email?.message}</p>
          </div>
          <div className={styles.formAction}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Reset Password"}
            </button>
          </div>
        </form>
        <div className={styles.formFooter}>
          <div className={styles.formFooter_Link}>
            <p>
              Remember your password? <Link to={"/auth/signin"}>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forgot;
