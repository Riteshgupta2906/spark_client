import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./ResetPasswordScreen.module.css";
import Background from "../UI/Background";
import Model from "../UI/Model";
const ResetPasswordScreen = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/auth/resetpassword/${match.params.resetToken}`,
        {
          password,
        },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Background>
      <div className={styles["resetpassword-screen"]}>
        <form
          onSubmit={resetPasswordHandler}
          className={styles["resetpassword-screen__form"]}
        >
          <h3 className={styles["resetpassword-screen__title"]}>
            Forgot Password
          </h3>
          {error && <Model className="error-message">{error} </Model>}

          <div className="form-group">
            <h4 htmlFor="password">New Password</h4>
            <input
              type="password"
              required
              id="password"
              placeholder="Enter new password"
              autoComplete="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <h4 htmlFor="confirmpassword">Confirm New Password</h4>
            <input
              type="password"
              required
              id="confirmpassword"
              placeholder="Confirm new password"
              autoComplete="true"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
          {success && (
            <div>
              <span className="success-message">{success} </span>
              <Link to="/login">
                <button className={styles["success-btn"]}>Login</button>
              </Link>
            </div>
          )}
        </form>
      </div>
    </Background>
  );
};

export default ResetPasswordScreen;
