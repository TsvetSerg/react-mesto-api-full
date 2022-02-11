import React from "react";
import logoImage from '../images/logo1.svg'


function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logoImage} alt="Лого" />
    </header>
  )
}


export default Header;
