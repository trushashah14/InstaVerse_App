const jwt = require("jsonwebtoken");

// Middleware for authenticating users using JSON Web Tokens
const authentication = async (req, res, next) => {
  try {
    // Check if the Authorization header is present in the request
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" }); // If not, return a 401 status with an error message
    }

    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      // Verify the token and decode its data
      let decodedData = jwt.verify(token, "1234");

      // Set the userId property on the request object with the decoded user ID
      req.userId = decodedData?.id;
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error); // Log any errors that occur for debugging purposes
  }
};

module.exports = authentication; // Export the authentication middleware
