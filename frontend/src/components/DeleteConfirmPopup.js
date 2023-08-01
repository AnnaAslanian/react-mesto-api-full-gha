import React from 'react';
import PopupWithForm from "./PopupWithForm"

function DeleteConfirmPopup({ isOpen, onClose, onCardDelete, renderLoading, card }) {
    function handleDeleteCardClick(event) {
        event.preventDefault();
        onCardDelete(card);
    }

    return (
        <PopupWithForm
            title={"Вы уверены"}
            name={"delete"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleDeleteCardClick}
            renderLoading={renderLoading}
        ></PopupWithForm>
    )
}

export default DeleteConfirmPopup;