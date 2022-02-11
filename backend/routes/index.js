const router = require('express').Router();
const usersRout = require('./users');
const cardsRout = require('./cards');
const NotFoundError = require('../errors/not-found');

router.use('/users', usersRout);
router.use('/cards', cardsRout);
router.all('*', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

module.exports = router;
