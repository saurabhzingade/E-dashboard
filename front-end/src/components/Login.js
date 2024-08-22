import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = () => {
    console.log(email, password);
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleLogin} className="appButton" type="button">
        Login
      </button>
    </div>
  );
};

export default Login;
