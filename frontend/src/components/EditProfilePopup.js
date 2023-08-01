import React, { useState, useEffect, useContext } from "react"
import PopupWithForm from "./PopupWithForm.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"


function EditProfilePopup({ isOpen, onClose, renderLoading, ...props }) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const currentUser = useContext(CurrentUserContext)

    useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser, isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description
        })
    }

    return (
        <PopupWithForm
            title={"Редактировать профиль"}
            name={"profile"}
            buttonText={"Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            renderLoading={renderLoading}

        >
            <input
                className="popup__name popup__name_input_value"
                id="error-value"
                type="name"
                name="name"
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
            />
            <span
                className="error-text error-value-error">
            </span>
            <input
                className="popup__name popup__name_input_about"
                id="error-about"
                type="text"
                name="about"
                placeholder="Вид деятельности"
                required
                minLength="2"
                maxLength="200"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
            />
            <span
                className="error-text error-about-error">
            </span>

        </PopupWithForm>
    );
};

export default EditProfilePopup;