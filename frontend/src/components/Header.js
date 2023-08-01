import logo from "../images/Vector.svg"
import React from "react";
import { Routes, Route, Link } from 'react-router-dom';

function Header({ userEmail, onSignOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Routes>
        <Route path="/" element={
          <div className="header__menu">
            <a className="header__email">{userEmail}</a>
            <Link className="header__exit" to="/sign-in" onClick={onSignOut}>Выйти</Link>
          </div>
        } />
        <Route path="/sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>}></Route>
        <Route path="/sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>}></Route>
      </Routes>
    </header>
  )
}

export default Header