// popup ---------------------------------------------------------------
export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');
export const modalPopupImg = document.querySelector('.popup-card');
export const imgBig = document.querySelector('.element__image')
export const popupDelet = document.querySelector('.popup-delet')
export const popupAvatar = document.querySelector('.popup-avatar')
// button ---------------------------------------------------------------
export const editButton = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const closeProfileButton = popupEdit.querySelector('.popup__close-button');
export const closeAddButton = popupAdd.querySelector('.popup__close-button')
export const closeimageButton = modalPopupImg.querySelector('.popup__close-button')
export const formElement = popupEdit.querySelector('.popup__form');
export const nameInput = formElement.querySelector('.popup__input_type_name');
export const jobInput = formElement.querySelector('.popup__input_type_job');
export const cardFormPopup = popupAdd.querySelector('.popup__form');
export const avatarButton = document.querySelector('.profile__button')
export const deletButton = document.querySelector('.element__delete')
// DOM ---------------------------------------------------------------
export const profileName = document.querySelector('.profile__name');
export const profileJobe = document.querySelector('.profile__job');
export const profilImg = document.querySelector('.profile__avatar')
export const list = document.querySelector('.elements')
export const inputCardTitle = cardFormPopup.querySelector('.popup__input_image_name');
export const inputCardImg = cardFormPopup.querySelector('.popup__input_link');
export const initialCards = [
  {
    name: 'Harley-Davidson',
    link: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: 'BMW',
    link: 'https://images.unsplash.com/photo-1531327431456-837da4b1d562?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1964&q=80'
  },
  {
    name: 'KTM',
    link: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Ducati',
    link: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'HD Electraglide',
    link: 'https://images.pexels.com/photos/258092/pexels-photo-258092.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    name: 'Yamaha v-max',
    link: 'https://images.unsplash.com/photo-1569932353500-6ea3302c4116?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=716&q=80'
  }
];
export const settings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
