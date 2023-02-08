const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  // addFreinds,
  // removeFreinds,
} = require('../../controllers/user-controller');


router.route('/').get(getAllUsers).post(createUser);


router.route('/:usersId').get(getSingleUser).delete(deleteUser);


// router.route('/:usersId/assignments').post(addFreinds);


// router.route('/:usersId/frineds/:friendsId').delete(removeFreinds);

module.exports = router;
