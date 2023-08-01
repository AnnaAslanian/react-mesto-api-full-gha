import React, { useState } from "react";

function Login({ onLogin, renderLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    onLogin(email, password);
  }


  return (
    <div
      className="register"
    >
      <h2
        className="register__title"
      >
        Вход
      </h2>
      <form
        className="register__form"
        onSubmit={handleSubmit}
      >
        <input
          id="register-email"
          required=""
          className="register__input"
          type="email"
          placeholder="Email"
          value={email}
          name="email"
          onChange={handleEmail}
        />
        <input
          id="register-password"
          required=""
          className="register__input"
          type="password"
          placeholder="Пароль"
          value={password}
          name="password"
          onChange={handlePassword}
        />
        <button
          type="submit"
          className="register__btn"
        >{renderLoading}
        </button>
      </form>
    </div>
  )
}


export default Login;