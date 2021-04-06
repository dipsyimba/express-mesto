const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '606c311f47eef223741bad79',
  };
  next();
});
app.use(router);
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);
