import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";


function AddPlacePopup({ isOpen, onClose, onAddPlace, renderLoading }) {
  const cardNameRef = useRef(null)
  const cardLinkRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value
    })
    event.target.reset();
  }

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"mesto"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      renderLoading={renderLoading}
      buttonText={"Сохранить"}
    >
      <input
        className="popup__name popup__name_input_title"
        type="text"
        name="name"
        id="error-title"
        minLength={2}
        maxLength={30}
        placeholder="Название"
        defaultValue=""
        required ref={cardNameRef}
      />
      <span
        className="error-text error-title-error">
      </span>
      <input
        className="popup__name popup__name_input_link"
        type="url"
        name="link"
        id="error-link"
        placeholder="Ссылка на картинку"
        defaultValue=""
        required ref={cardLinkRef} />
      <span
        className="error-text error-link-error">
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup