const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const {
  updateUserValidation,
  updateUserAvatarValidation,
} = require('../middlewares/celebrate');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.get('/me', getCurrentUser);
router.patch('/me', updateUserValidation, updateUser);
router.patch('/me/avatar', updateUserAvatarValidation, updateAvatar);

module.exports = router;
