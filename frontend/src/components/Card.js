import CurrentUserContext from '../contexts/CurrentUserContext'
import React from "react";

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element__delete' : 'element_dalete_remove'}`
  );

  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `element__like ${isLiked && 'element__like_active'}`

  // `element__like ${isLiked ? 'element__like_active' : 'element__like'}`


  function handleCardClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeletClick() {
    props.onCardDelete(props.card)
  }

  return (
      <article className="element">
        <div className={cardDeleteButtonClassName} onClick={handleDeletClick}></div>
        <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick}/>
        <div className="element__rectangle">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__wrapper">
            <div className={cardLikeButtonClassName} onClick={handleLikeClick}></div>
            <p className="element__liked_num">{props.card.likes.length}</p>
          </div>
        </div>
      </article>
  )
}

export default Card;
