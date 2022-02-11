// import logo from '../logo.svg';
import '../index.css';
import Header from './Header'
import Main from './Main'
import Footer from './Footer';
import React from "react";
import ImagePopup from './ImagePopup'
import apiClass from './utils/Api'
import CurrentUserContext from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

function App() {


  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentCard, setCurrentCard] = React.useState([]);

  React.useEffect(() => {
    Promise.all([apiClass.getInfoUser(), apiClass.getInitialCards()])
      .then(([info, cards]) => {
        setCurrentUser(info)
        setCurrentCard(cards)
      })
      .catch((err) => {
        console.log(err);
      })
    }, [])



  function handleCardLike(card) {                 // Функуция поосстановки лайков
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      apiClass.putLikeCard(card._id)
    .then((newCard) => {
      setCurrentCard((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
    } else {
      apiClass.deleteLikeCard(card._id)
      .then((newCard) => {
        setCurrentCard((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  function handleCardDelete(card) {             // Функция удаления карточки
    apiClass.deleteCard(card._id)
    .then(() => {
      setCurrentCard((state) => state.filter((c) => c._id !== card._id ))
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateUser(data) {
    apiClass.patchInfoUser(data)
    .then((info) => {
      setCurrentUser(info)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }


  function handleUpdateAvatar(data) {
    Promise.resolve(apiClass.patchNewAvatar(data))
    .then((info) => {
      setCurrentUser(info)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlaceSubmit(data) {
    apiClass.postNewCard(data)
    .then((card) => {
      setCurrentCard([card, ...currentCard])
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function openAddPopup() {
    setIsAddPlacePopupOpen(true)
  }
  function openProfilePopup() {
    setIsEditProfilePopupOpen(true)
  }
  function openAvatarPopup() {
    setIsEditAvatarPopupOpen(true)
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({name: '', link: ''})
  }

  function handleCardClick(item) {
    setSelectedCard(item)
  }


  return (

<CurrentUserContext.Provider value={currentUser}>
  <div className="page">

  <Header />
  <Main
    onAddPlace  = {openAddPopup}
    onEditProfile = {openProfilePopup}
    onEditAvatar = {openAvatarPopup}
    onCardClick = {handleCardClick}
    card = {currentCard}
    onCardLike = {handleCardLike}
    onCardDelete = {handleCardDelete}
  />
  <Footer />

  <EditProfilePopup
    isOpen={isEditProfilePopupOpen}
    onClose={closeAllPopups}
    onUpdateUser = {handleUpdateUser}
  />

  <EditAvatarPopup
    isOpen={isEditAvatarPopupOpen}
    onClose={closeAllPopups}
    onUpdateAvatar = {handleUpdateAvatar}
    />

  <AddPlacePopup
    isOpen = {isAddPlacePopupOpen}
    onClose = {closeAllPopups}
    onUpdateCard = {handleAddPlaceSubmit}
  />

  <ImagePopup
    card = {selectedCard}
    onClose = {closeAllPopups}
  />
  </div>
</CurrentUserContext.Provider>
  );
}

export default App;
