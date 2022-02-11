import React from "react";
import PopupWithForm from './PopupWithForm'


function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('');    // переписа под управляемый компонент
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (props.isOpen) {
      setTitle('')
      setLink('')
    }
  },[props.isOpen])

  function handelChangeTitle(e) {
    setTitle(e.target.value)
  }

  function handelChangeLink(e) {
    setLink(e.target.value)
  }


  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateCard({
      name: title,
      link: link,
    });
  }



  return (
    <PopupWithForm
    isOpen = {props.isOpen}
    onClose = {props.onClose}
    onSubmit = {handleSubmit}
    title = {'Новое место'}
    buttonText = {'Создать'}
    children = {(
      <>
        <input value={title || ''} onChange={handelChangeTitle} id="input-title" className="popup__input popup__input_image_name" type="text" name="inputTitle" placeholder="Название" minLength="2" maxLength="30" required />
        <span id="input-title-error"></span>
        <input value={link || ''} onChange={handelChangeLink} id="input-link" className="popup__input popup__input_link" type="url" name="inputImg" required placeholder="Ссылка на картинку" />
        <span id="input-link-error"></span>
      </>
    )}
  />
  )
}


export default AddPlacePopup;
