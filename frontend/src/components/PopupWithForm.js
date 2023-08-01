import React from "react";

function PopupWithForm({ title, name, isOpen, onClose, buttonText, onSubmit, ...props }) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div
        className="popup__container"
      >
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}>
        </button>
        <h2
          className="popup__header">
          {title}
        </h2>
        <form
          className="popup__form"
          name={`form-${name}`}
          onSubmit={onSubmit}
        >
          {props.children}
          <button
            className="popup__submit-button"
            type="submit"
            aria-label="Сохранить">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm
