import React from "react";
import CurrentUserContext from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm'

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen]);


  function handelChangeName(e) {
    setName(e.target.value)
  }

  function handelChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      title = {'Редактировать профиль'}
      buttonText = {'Сохранить'}
      onSubmit = {handleSubmit}
      children = {(
        <>
          <input id="input-name" className="popup__input popup__input_type_name" type="text" name="name" required placeholder="Имя" minLength="2" maxLength="40"
          value={name || ''} onChange={handelChangeName}/>
          <span id="input-name-error"></span>
          <input id="input-job" className="popup__input popup__input_type_job" type="text" name="about" required placeholder="Работа" minLength="2" maxLength="200"
          value={description || ''} onChange={handelChangeDescription} />
          <span id="input-job-error"></span>
        </>
      )}
    />
  )


}

export default EditProfilePopup;
