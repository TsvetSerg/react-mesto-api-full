const Card = require('../models/card');
// const mongoose = require('mongoose');
const NotFoundError = require('../errors/not-found');
const BadRequest = require('../errors/BadRequest');
const DeletError = require('../errors/DeleteCardError');

const postCards = async (req, res, next) => { // Создаем картооочку
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('Переданы некорректные данные при создании карточки.'));
    }
    next(err);
  }
};

const getCards = async (req, res, next) => { // Получаем все картоки с сервера
  try {
    const card = await Card.find({});

    res.status(200).send(card);
  } catch (err) {
    next(err);
  }
};
const deleteCards = (req, res, next) => { // Удаляем карточку
  const { _id } = req.params;
  Card.findById(_id)
    .orFail(() => new Error('NotFound'))
    .then((card) => {
      if (req.user._id.toString() === card.owner.toString()) {
        card.remove()
          .then(() => { // если я все правильно понял, то должно быть вот так
            res.status(200).send({ message: 'Карточка удалена.' });
          })
          .catch(next);
      } else {
        throw new Error('AccessError');
      }
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные.'));
      }
      if (err.message === 'AccessError') {
        next(new DeletError('Вы не можете удалить чужую карточку.'));
      }
      next(err);
    });
};

const likedCards = (req, res, next) => { // Лайк на карточку
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('NotFound'))
    .then((like) => res.status(200).send({ data: like }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Передан несуществующий id карточки.'));
      }
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для постановки/снятии лайка.'));
      }
      next(err);
    });
};

const dislikeCards = (req, res, next) => { // Удаяем лайк
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new Error('NotFound'))
    .then((dislike) => res.status(200).send({ data: dislike }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Передан несуществующий id карточки.'));
      }
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для постановки/снятии лайка.'));
      }
      next(err);
    });
};

module.exports = {
  postCards,
  getCards,
  deleteCards,
  likedCards,
  dislikeCards,
};
