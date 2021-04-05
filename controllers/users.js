const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .orFail(new Error('NotFound'))
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(404).send({ message: 'В базе данных нет пользователей' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (error.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь с таким id не найден' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const data = { ...req.body };
  User.create(data)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = { ...req.body };

  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении пользователя',
        });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = { ...req.body };

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotFound'))
    .then((avatar) => {
      res.send(avatar);
    })
    .catch((error) => {
      if (error.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
