import React from "react";
import closeBtn from '../images/close-btn.svg'
import ok from '../images/ok.svg'
import err from '../images/err.svg'

class InfoTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`popup ${this.props.isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        <img className="popup__image-confirmation" src={this.props.errorMassage ? ok : err} alt={this.props.errorMassage ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'} />
        <h2 className="popup__title_сonfirmation">{this.props.errorMassage ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>

        <button type="button" className="popup__close-button" onClick={this.props.onClose} >
          <img className="popup__image" src={closeBtn} alt="Закрыть" />
        </button>
      </div>
    </div>
    )
  }

}

export default InfoTooltip;

