import React from "react";
import errorImage from "../images/error.svg"
import goodImage from "../images/good.svg"

function InfoTooltip({ isOpen, onClose, success, tooltipText }) {
  return (
    <div
      className={`popup popup_tooltip ${isOpen ? "popup_opened" : ""}`}
    >
      <div
        className="popup__container"
      >
        <img
          className="popup__tooltip-image"
          src={success ? goodImage : errorImage}
        />
        <p
          className="popup__tooltip-text">
          {tooltipText}
        </p>
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        />
      </div>
    </div>
  )
}

export default InfoTooltip