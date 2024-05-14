const router = require("express").Router();

const {
  getStories,
  createStory,
  updateStory,
  deleteStory,
  likeStory,
} = require("../controllers/stories.js");

const authentication = require("../middlewares/authentication.js");

router.get("/", getStories);
router.post("/", authentication, createStory);
router.patch("/:id", authentication, updateStory);
router.delete("/:id", authentication, deleteStory);
router.patch("/:id/likeStory", authentication, likeStory);

module.exports = router;
