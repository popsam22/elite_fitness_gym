import React, { useState } from "react";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, signup } = useSignup();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <div>
      <form className="signup" onSubmit={submitHandler}>
        <h2>Sign Up</h2>
        <label>Email</label>
        <input type="email" onChange={emailChangeHandler} value={email} />
        <label>Password</label>
        <input
          type="password"
          onChange={passwordChangeHandler}
          value={password}
        />
        {error && <div className="error">{error}</div>}
        <button disabled={isLoading}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
