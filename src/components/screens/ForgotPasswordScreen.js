import { useState } from "react";
import axios from "axios";
import styles from "./ForgotPasswordScreen.module.css";
import Background from "../UI/Background";
import Model from "../UI/Model";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Background>
      <div className={styles["forgotpassword-screen"]}>
        <form
          onSubmit={forgotPasswordHandler}
          className={styles["forgotpassword-screen__form"]}
        >
          <h3 className={styles["forgotpassword-screen__title"]}>
            Forgot Password
          </h3>
          {error && <Model className="error-message">{error}</Model>}
          {success && <span className="success-message">{success}</span>}
          <div className="form-group">
            <p className={styles["forgotpassword-screen__subtext"]}>
              Please enter the email address you register your account with. We
              will send you reset password confirmation to this email.
            </p>
            <h4 htmlFor="email">Email</h4>
            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send Email
          </button>
        </form>
      </div>
    </Background>
  );
};

export default ForgotPasswordScreen;
