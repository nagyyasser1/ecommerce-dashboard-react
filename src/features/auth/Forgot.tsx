import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import styles from "./styles/Forgot.module.css";

interface ForgotForm {
  email: string;
}

const Forgot: React.FC = () => {
  const [formData, setFormData] = useState<ForgotForm>({
    email: "",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userData = await login(formData).unwrap();
      // dispatch(setCredentials({ ...userData, user }))
    } catch (error) {
      console.error("Error:", error);
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
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formControl}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formAction}>
            <button type="submit">Reset Password</button>
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
