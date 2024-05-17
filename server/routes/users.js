// Import the Router object from Express to create modular routes
const router = require("express").Router();

// Destructure required functions from the users controller file
const {
  login, // Function to handle user login
  signup, // Function to handle user signup
} = require("../controllers/users.js");

// Define routes for user authentication:

// POST request to "/signup" - Register a new user (uses signup function)
router.post("/signup", signup);

// POST request to "/login" - Login an existing user (uses login function)
router.post("/login", login);

// Export the router object to be used in other parts of the application
module.exports = router;
