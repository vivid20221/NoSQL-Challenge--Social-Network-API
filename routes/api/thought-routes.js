const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  deleteReaction,
  addReaction,

} = require('../../controllers/thoughts-controller');


router.route('/').get(getAllThoughts).post(createThought);


router
  .route('/:id')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

  router.route("/:thoughtId/reactions/:reactionId").delete
  (deleteReaction)

module.exports = router;
