import React, { useRef } from "react"
import PopupWithForm from "./PopupWithForm"


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, renderLoading }) {
  const avatarRef = useRef(null)

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }
  return (
    <PopupWithForm
      renderLoading={renderLoading}
      title={"Редактировать аватар"}
      name={"user-avatar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Сохранить"}
    >

      <input
        type="url"
        id="avatar"
        name="avatar"
        className="popup__name popup__name_input_link"
        required
        placeholder="Ссылка на картинку"
        ref={avatarRef}
      />
      <span
        className="error-text avatar-error">
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;