import React from "react";
import closeBtn from '../images/close-btn.svg'

function PopupWithForm(props) {
  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form onSubmit={props.onSubmit} className="popup__form" name={`popup-${props.name}`} >
          {props.children}
          <button className="popup__button" type="submit" >{props.buttonText}</button>
        </form>
        <button type="button" className="popup__close-button" onClick={props.onClose} >
          <img className="popup__image" src={closeBtn} alt="Закрыть" />
        </button>
      </div>
    </div>
  )
}
export default PopupWithForm;
