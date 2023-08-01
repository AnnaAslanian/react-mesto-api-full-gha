import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister, renderLoading }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
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
          minLength="5"
          maxLength="40"
          name="email-register"
          onChange={handleEmail}
          value={email}
        />
        <input
          id="register-password"
          required=""
          className="register__input"
          type="password"
          placeholder="Пароль"
          minLength="5"
          maxLength="40"
          name="password-register"
          onChange={handlePassword}
        value={password}
        />
        <button
          type="submit"
          className="register__btn"
        >{renderLoading}
        </button>
      </form>
      <p
        className="register__question"
      >
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="register__link">Войти</Link></p>
    </div>
  );
}

export default Register