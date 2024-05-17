const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");

// Controller to handle user login
const login = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body

  try {
    const oldUser = await User.findOne({ email }); // Find a user with the given email

    if (!oldUser) {
      return res.status(400).json({ msg: "User does not Exist" }); // If user does not exist, return a 400 status with an error message
    }

    const isPasswordValid = await bcrypt.compare(password, oldUser.password); // Compare the given password with the stored hashed password

    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid Password" }); // If the password is invalid, return a 400 status with an error message
    }

    // Generate a JSON Web Token with a 1-hour expiration
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      "1234",
      { expiresIn: "1h" }
    );

    console.log(token); // Log the token for debugging purposes

    // Respond with a 200 status, the user data, and the token
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" }); // If an error occurs, respond with a 500 status and an error message
  }
};

// Controller to handle user signup
const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body; // Extract username, email, password, and confirmPassword from the request body
  console.log(username, email, password, confirmPassword); // Log the received data for debugging purposes

  try {
    const oldUser = await User.findOne({ email }); // Find a user with the given email

    if (oldUser) {
      return res.status(400).json({ msg: "Email already exists" }); // If email already exists, return a 400 status with an error message
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" }); // If passwords do not match, return a 400 status with an error message
    }

    // Hash the password with a salt round of 12
    const encryptedPassword = await bcrypt.hash(password, 12);

    // Create a new user with the given data and hashed password
    const result = await User.create({
      username,
      email,
      password: encryptedPassword,
    });

    console.log(result); // Log the created user for debugging purposes

    // Generate a JSON Web Token with a 1-hour expiration
    const token = jwt.sign(
      { email: result.email, id: result._id },
      "1234",
      { expiresIn: "1h" }
    );

    // Respond with a 200 status, the created user data, and the token
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" }); // If an error occurs, respond with a 500 status and an error message
  }
};

// Export the login and signup controllers
module.exports = { login, signup };
