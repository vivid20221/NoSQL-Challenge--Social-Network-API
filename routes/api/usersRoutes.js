const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  // addFreinds,
  // removeFreinds,
} = require('../../controllers/user-controller');


router.route('/').get(getAllUsers).post(createUser);


router.route('/:Id').get(getSingleUser).put(updateUser).delete
(deleteUser);


// router.route('/:usersId/assignments').post(addFreinds);


// router.route('/:usersId/frineds/:friendsId').delete(removeFreinds);

module.exports = router;
