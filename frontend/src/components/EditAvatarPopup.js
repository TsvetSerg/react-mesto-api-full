import React from "react";
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup (props) {

  const avatarRef = React.useRef(); // используем рефы

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }


return (
  <PopupWithForm
    isOpen = {props.isOpen}
    onClose = {props.onClose}
    title = {'Обновить аватар'}
    buttonText = {'Сохранить'}
    onSubmit = {handleSubmit}
    children = {(
      <>
        <input ref={avatarRef} id="input-avatar" className="popup__input popup__input_link" type="url" name="avatarInpur" required placeholder="Ссылка на аватар" />
        <span id="input-avatar-error"></span>
      </>
    )}
  />
)


}

export default EditAvatarPopup;;
