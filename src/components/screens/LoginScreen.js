import styles from "./LoginScreen.module.css";
import "../../index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Model from "../UI/Model";
import Background from "../UI/Background";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  return (
    <Background>
      <div className={styles["login-screen"]}>
        <form onSubmit={loginHandler} className={styles["login-screen__form"]}>
          <h2 className={styles["login-screen__title"]}> Login</h2>
          <p>Login here using your username and password</p>
          {error && <Model className="error-message">{error}</Model>}
          <div className="form-group">
            <h4 className={styles["Label"]} htmlFor="email">
              Email
            </h4>
            <input
              type="email"
              required
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              tabIndex={1}
            />
          </div>
          <div className="form-group">
            <h4 className={styles["Label"]} htmlFor="password">
              Password
            </h4>
            <input
              type="password"
              required
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              tabIndex={2}
            />
            <Link
              to="/forgotpassword"
              className={styles["login-screen__forgotpassword"]}
              tabIndex={4}
            >
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="btn btn-primary" tabIndex={3}>
            Login
          </button>
          <span className={styles["login-screen__subtext"]}>
            Don't have an Account? <Link to="/Register">Register</Link>
          </span>
        </form>
      </div>
    </Background>
  );
};
export default LoginScreen;
