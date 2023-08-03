import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, handleDeleteCardClick, cards }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main>
      <div className="profile">
        <div className="profile__avatar-area">
          <img src={currentUser.avatar} alt="Аватар" className="profile__logo" />
          <button type="button" className="profile__avatar-edit" aria-label="Редактировать аватар профиля" onClick={onEditAvatar} />
        </div>
        <div className="profile__edit">
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}>
            </button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}>
        </button>
      </div>
      <div className="elements">
        <ul className="elements__list">
        {cards.slice().reverse().map((card) => (
            <li key={card._id}>
              <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} handleDeleteCardClick={handleDeleteCardClick} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
export default Main;