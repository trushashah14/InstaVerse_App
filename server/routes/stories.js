// Import the Router object from Express to create modular routes
const router = require("express").Router();

// Destructure required functions from the stories controller file
const {
  getStories, // Function to get all stories
  createStory, // Function to create a new story
  updateStory, // Function to update an existing story
  deleteStory, // Function to delete a story
  likeStory, // Function to handle liking a story
} = require("../controllers/stories.js");

// Import the authentication middleware function
const authentication = require("../middlewares/authentication.js");

// Define routes for stories:

// GET request to "/" - Fetch all stories (uses getStories function)
router.get("/", getStories);

// POST request to "/" - Create a new story (uses createStory function after authentication)
router.post("/", authentication, createStory);

// PATCH request to "/:id" - Update a story (uses updateStory function after authentication)
router.patch("/:id", authentication, updateStory);

// DELETE request to "/:id" - Delete a story (uses deleteStory function after authentication)
router.delete("/:id", authentication, deleteStory);

// PATCH request to "/:id/likeStory" - Like a story (uses likeStory function after authentication)
router.patch("/:id/likeStory", authentication, likeStory);

// Export the router object to be used in other parts of the application
module.exports = router;
