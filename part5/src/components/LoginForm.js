import { useState } from "react";
import loginService from "../services/login";
import PropTypes from "prop-types";

const LoginForm = ({ onLogin, showErrorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    showErrorMessage: PropTypes.func.isRequired,
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      onLogin(user); // Invoke the callback function with the user object
    } catch (err) {
      showErrorMessage(`Login error: ${err.response.data.error}`);
      console.log("err=>", err);
    }
  };

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={loginHandler}>
        <div>
          username
          <input
            autoComplete="none"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            style={{ margin: "5px 0" }}
          />
        </div>
        <div>
          password
          <input
            autoComplete="none"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            style={{ margin: "5px 0" }}
          />
        </div>
        <button type="submit" style={{ margin: "10px 0" }}>
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
