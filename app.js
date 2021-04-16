require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(router);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (statusCode) {
    res
      .status(statusCode)
      .send({
        message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
      });
  }
  next();
});
app.listen(PORT);
