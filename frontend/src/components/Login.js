import React, { useState } from "react";
// import { useFormAction } from "react-router-dom";

function Login({ onLogin, renderLoading }) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");


  // function handleEmail(event) {
  //   setEmail(event.target.value);
  // }
  // function handlePassword(event) {
  //   setPassword(event.target.value);
  // }
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   onLogin(email, password);
  // }
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  })

  const handleChangeLogged = (e) => {
    const { name, value } = e.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(formValue)
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
          value={formValue.email}
          name="email"
          onChange={handleChangeLogged}
        />
        <input
          id="register-password"
          required=""
          className="register__input"
          type="password"
          placeholder="Пароль"
          value={formValue.password}
          name="password"
          onChange={handleChangeLogged}
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