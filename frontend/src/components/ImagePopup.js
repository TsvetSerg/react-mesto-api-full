import React from "react";
import closeBtn from '../images/close-btn.svg'

function ImagePopup(props) {
  return (
    <div className={`popup popup-card ${props.card.link !== '' ? 'popup_opened' : ''}`}>
      <div className="popup__wrapper">
        <button type="button" className="popup__close-card popup__close-button">
          <img className="popup__image" src={closeBtn} alt="Закрыть" onClick={props.onClose}/>
        </button>

        <div className="popup__form-card">
          <img className="popup__modal-image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} />
          <h2 className="popup__modal-title">{props.card ? props.card.name : ''}</h2>
        </div>
      </div>
    </div>
  )
}


export default ImagePopup;
