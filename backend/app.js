const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const regExp = require('./method/regexp');
const routes = require('./routes');
const { postUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handelError = require('./middlewares/handelError');
const { requestLogge, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(requestLogge);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  next();
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExp),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), postUser);

app.use(auth);

app.use(routes);
app.use(express.json());
app.use(errorLogger);
app.use(errors());
app.use(handelError);

app.listen(PORT);
