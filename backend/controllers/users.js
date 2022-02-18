const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found');
const LoginError = require('../errors/loginError');
const BadRequest = require('../errors/BadRequest');
const ConflictError = require('../errors/ConflictError');

const { JWT_SECRET = 'DEFAULT_JWT' } = process.env;

const postUser = (req, res, next) => { // Создаем пользователя
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then(() => res.status(200).send({
      name, about, avatar, email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже существует'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequest('Введены некорректные данные!'));
      }
      next(err);
    });
};

const getUser = async (req, res, next) => { // Получаем всех пользователей
  try {
    const user = await User.find({});

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

const getUserId = (req, res, next) => { // Получаем пользоватея по ID
  const { _id } = req.params;
  User.findById(_id)
    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      }
      if (err.message === 'NotFound') {
        next(new NotFoundError(`Данный id: ${_id} не найден`));
      }
      next(err);
    });
};

const updateProfile = async (req, res, next) => { // Обновление профия
  try {
    const { name, about } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
    }
    next(err);
  }
};

const updateAvatar = async (req, res, next) => { // Обновление аватара
  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('Переданы некорректные данные при обновлении аватара.'));
    }
    next(err);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new LoginError('передан неверный логин или пароль.'));
      }
      next(err);
    });
};

const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные.'));
      }
      if (err.message === 'NotFound') {
        next(new NotFoundError('Данный id не найден'));
      }
      next(err);
    });
};

module.exports = {
  postUser,
  getUser,
  getUserId,
  updateProfile,
  updateAvatar,
  login,
  getProfile,
};
