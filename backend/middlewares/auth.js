const jwt = require('jsonwebtoken');
const LoginError = require('../errors/loginError');

const { JWT_SECRET = 'DEFAULT_JWT' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new LoginError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new LoginError('Необходима авторизация');
  }

  req.user = payload;
  next();
};
