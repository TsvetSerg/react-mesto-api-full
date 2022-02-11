const routerCard = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const method = require('../method/validatorUrl');
const {
  postCards,
  getCards,
  deleteCards,
  likedCards,
  dislikeCards,
} = require('../controllers/cards');

routerCard.get('/', getCards);

routerCard.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required().custom(method),
  }),
}), postCards);

routerCard.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
}), deleteCards);

routerCard.put('/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
}), likedCards);

routerCard.delete('/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
}), dislikeCards);

module.exports = routerCard;
