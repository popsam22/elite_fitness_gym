import React, { useState } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, login } = useLogin();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div>
      <form className="login" onSubmit={submitHandler}>
        <h2>Login</h2>
        <label>Email</label>
        <input type="email" onChange={emailChangeHandler} value={email} />
        <label>Password</label>
        <input
          type="password"
          onChange={passwordChangeHandler}
          value={password}
        />
        {error && <div className="error">{error}</div>}
        <button disabled={isLoading}>Login</button>
      </form>
    </div>
  );
};

export default Login;