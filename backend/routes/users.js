const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regExp = require('../method/regexp');
const {
  getUser,
  getUserId,
  updateProfile,
  updateAvatar,
  getProfile,
} = require('../controllers/users');

routerUser.get('/', getUser);

routerUser.get('/me', getProfile);

routerUser.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
}), getUserId);

routerUser.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

routerUser.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regExp),
  }),
}), updateAvatar);

module.exports = routerUser;
