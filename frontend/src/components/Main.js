import editBtn from '../images/edit-btn.svg'
import addBtn from '../images/add-btn.svg'
import '../index.css';
import React from "react";
import Card from '../components/Card'
import CurrentUserContext from '../contexts/CurrentUserContext'


function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <button className="profile__button" type="button" onClick={props.onEditAvatar} ></button>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
        </div>
        <div className="profile__profile-info">
          <div>
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button type="button" className="profile__edit-button" onClick={props.onEditProfile} >
            <img src={editBtn} alt="Кнопка редоктирования" />
          </button>
        </div>

        <button className="profile__add-button" type="button" onClick={props.onAddPlace} >
          <img className="profile__add-plus" src={addBtn} alt="Кнопка Добавления" />
        </button>
      </section>

      <section className="elements">
      {props.card.map((cards) => (
        <Card
        key = {cards._id}
        name = {cards.name}
        link = {cards.link}
        onCardClick = {props.onCardClick}
        card = {cards}
        onCardLike = {props.onCardLike}
        onCardDelete = {props.onCardDelete}
        likes = {cards.likes.length}
        />
      ))}
      </section>
    </main>
  )
}




export default Main;
