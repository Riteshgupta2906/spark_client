import styles from "./RegisterScreen.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Background from "../UI/Background";
import Model from "../UI/Model";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
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
      return setError("Password do not match");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/register",
        { username, email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <Background>
      <div className={styles["register-screen"]}>
        <form
          onSubmit={registerHandler}
          className={styles["register-screen__form"]}
        >
          <h3 className={styles["register-screen__title"]}> Register</h3>
          {error && <Model className="error-message">{error}</Model>}
          <div className="form-group">
            <h4 htmlFor="name">Username</h4>
            <input
              type="text"
              required
              id="name"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <h4 htmlFor="email">Email</h4>
            <input
              type="email"
              required
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <h4 htmlFor="password">Password</h4>
            <input
              type="password"
              required
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <h4 htmlFor=" confirm password">Confirm Password</h4>
            <input
              type="password"
              required
              id="confirmpassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <span className={styles["register-screen__subtext"]}>
            Already have an Account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </Background>
  );
};
export default RegisterScreen;
