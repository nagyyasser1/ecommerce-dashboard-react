import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles/Signup.module.css";
import { useSignupMutation } from "../../app/services/auth";

const schema = yup
  .object({
    fname: yup
      .string()
      .required()
      .min(3, "First name must be at least 3 characters"),
    lname: yup
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
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const [signup, { isLoading, isSuccess, isError, error }] =
    useSignupMutation();

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {
      const user = await signup(data).unwrap();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.signup}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h1> Sign Up </h1>
          <p>Fill out the form to create a new account.</p>
          {isError && (
            <span className={styles.passwordError}>{error?.data?.message}</span>
          )}
          {isSuccess && (
            <span className={styles.successText}>Logged in Successfully!</span>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formControl}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" {...register("fname", { required: true })} />
            <p className={styles.passwordError}>{errors.fname?.message}</p>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" {...register("lname", { required: true })} />
            <p className={styles.passwordError}>{errors.lname?.message}</p>
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
