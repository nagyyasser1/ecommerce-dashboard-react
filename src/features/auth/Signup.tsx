import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles/Signup.module.css";
import { useSignupMutation } from "./authApiSlice";

const schema = yup
  .object({
    firstName: yup
      .string()
      .required()
      .min(3, "First name must be at least 3 characters"),
    lastName: yup
      .string()
      .required()
      .min(3, "Last name must be at least 3 characters"),
    email: yup.string().email("Invalid email format").required(),
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

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [signup, { isLoading, error }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    try {
      signup(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  return (
    <section className={styles.signup}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h1> Sign Up </h1>
          <p>Fill out the form to create a new account.</p>
          {error && <p className={styles.passwordError}>{error}</p>}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formControl}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" {...register("firstName", { required: true })} />
            <p className={styles.passwordError}>{errors.firstName?.message}</p>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" {...register("lastName", { required: true })} />
            <p className={styles.passwordError}>{errors.lastName?.message}</p>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email", { required: true })} />
            <p className={styles.passwordError}>{errors.email?.message}</p>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="password">Password</label>
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

          <div className={styles.formControl}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
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
            <MdOutlineVisibilityOff
              className={styles.togglePassword}
              onClick={handleToggleConfirmPassword}
            />
            <p className={styles.passwordError}>
              {errors.confirmPassword?.message}
            </p>
          </div>
          <div className={styles.formAction}>
            <button type="submit">
              {isLoading ? "loading..." : "Sign Up"}
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
              Already have an account? <Link to={"/auth/signin"}>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
