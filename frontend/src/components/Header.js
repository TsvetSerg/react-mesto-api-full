import React from "react";
import logoImage from '../images/logo1.svg'
import { withRouter, useLocation, useHistory, Link } from 'react-router-dom';


function Header(props) {      // Переписал код под функциональный компонент для useLocation
  const history = useHistory();
  const { pathname } = useLocation();
  const linkText = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const linkPath = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

  function handleSubmit(e) {
    e.preventDefault()
    if (props.loggedIn) {      // Добавяем логику что бы не рендерить кадый раз разные кнопки
      props.handelTokenRemove();
    } else {
      history.push('/sign-up');
    }
  }



    return (
      <header className="header">
      <img className="header__logo" src={logoImage} alt="Лого" />
      { props.loggedIn ? (
      <div className="header_layer">
        <p className="header__information">{props.loggedIn ? props.email : ''}</p>
        <button className="header__botton" onClick={handleSubmit}>Выйти</button>
      </div> ) : (<Link to={linkPath} className="header__link">{linkText}</Link>)
}
    </header>
    )

}


export default withRouter(Header);
