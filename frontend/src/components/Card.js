import React, { useContext } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = ( card.owner?._id || card.owner ) === currentUser._id
  const isLiked = card.likes.some((i) => ( i._id || i ) === currentUser._id)
  // console.log(isLiked)
  const cardLikeButtonClassName = `element__logo ${isLiked && "element__logo_active"}`

  function handleClick() {
    onCardClick(card)
  }
  function handleLikeClick() {
    onCardLike(card)
  }
  const handleDeleteClick = () => {
    onCardDelete(card._id)
  }

  return (
    <div
      className="element"
    >
      {isOwn && (<button
        className="element__delete"
        type="button"
        aria-label="Удалить"
        onClick={() => handleDeleteClick(card)}>
      </button>)}
      <img
        className="element__img"
        src={card.link}
        alt={card.name}
        onClick={() => handleClick(card)}
      />
      <div
        className="element__group">
        <h2
          className="element__name">
          {card.name}
        </h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            onClick={() => handleLikeClick(card)}>
          </button>
          <div
            className="elements__number-like">
            {card.likes.length}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card

