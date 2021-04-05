const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .orFail(new Error('NotFound'))
    .then((cards) => {
      res.send(cards);
    })
    .catch((error) => {
      if (error.message === 'NotFound') {
        res.status(404).send({ message: 'В базе данных нет карточек' });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndDelete({ _id: id })
    .orFail(new Error('NotFound'))
    .then((removeCard) => {
      res.send(removeCard);
    })
    .catch((err) => {
      if (err.message === 'NotFound' || err.name === 'CastError') {
        res.status(404).send({ message: 'Такой карточки нету!' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createCard = (req, res) => {
  const userId = req.user._id;
  const { name, link } = { ...req.body };
  Card.create({ name, link, owner: userId })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((addLike) => {
      res.send(addLike);
    })
    .catch((error) => {
      if (error.name === 'CastError' || error.message === 'NotFound') {
        res.status(404).send({ message: 'Такой карточки нету!' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(new Error('NotFound'))
    .then((dislike) => {
      res.send(dislike);
    })
    .catch((error) => {
      if (error.name === 'CastError' || error.message === 'NotFound') {
        res.status(404).send({ message: 'Такой карточки нету!' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
