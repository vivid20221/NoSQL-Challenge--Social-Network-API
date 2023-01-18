const router = require('express').Router();
const {
  getUsers,
  getSingleUsers,
  createUsers,
  deleteUsers,
  addFreinds,
  removeFreinds,
} = require('../../controllers/usersController');


router.route('/').get(getUsers).post(createUsers);


router.route('/:usersId').get(getSingleUsers).delete(deleteUsers);


router.route('/:usersId/assignments').post(addFreinds);


router.route('/:usersId/frineds/:friendsId').delete(removeFreinds);

module.exports = router;
