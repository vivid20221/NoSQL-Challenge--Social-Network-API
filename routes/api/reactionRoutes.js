const router = require('express').Router();
const {
  getReaction,
  getSingleReaction,
  createReaction,
  updateReaction,
  deleteReaction,
} = require('../../controllers/reactionController.js');


router.route('/').get(getReaction).post(createReaction);


router
  .route('/:reactionId')
  .get(getSingleReaction)
  .put(updateReaction)
  .delete(deleteReaction);

module.exports = router;
