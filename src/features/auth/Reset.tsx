import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import styles from "./styles/Reset.module.css";

interface ResetForm {
  password: string;
  confirmPassword: string;
}

const Reset: React.FC = () => {
  const [formData, setFormData] = useState<ResetForm>({
    password: "",
    confirmPassword: "",
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
    <section className={styles.reset}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2>Reset Password</h2>
          <p>Please enter your new password.</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formControl}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formAction}>
            <button type="submit">Reset</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Reset;
