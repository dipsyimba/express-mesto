require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const corsWhiteList = ['http://mesto.world.nomoredomains.monster', 'https://mesto.world.nomoredomains.monster', 'http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true);
    }
  },
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();
app.set('trust proxy', 1);
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(requestLogger);
app.use(cors(corsOptions));
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (statusCode) {
    res
      .status(statusCode)
      .send({
        message: statusCode === 500 ? 'На сервере произошла ошибка!' : message,
      });
  }
  next();
});
app.listen(PORT);
