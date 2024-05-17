// Import the mongoose library for interacting with MongoDB
const mongoose = require("mongoose");

// Define the schema for a story document in the database
const storySchema = mongoose.Schema({
  // Caption property of the story (required)
  caption: { type: String, required: true },

  // Username of the story owner (required)
  username: { type: String, required: true },

  // User ID of the story owner (required)
  userId: { type: String, required: true },

  // Image URL for the story (required)
  image: { type: String, required: true },

  // Optional tags associated with the story (stored as a string)
  tags: String,

  // Array to store user IDs who liked the story (defaults to empty array)
  likes: { type: [String], default: [] },

  // Date the story was posted (defaults to current date and time)
  postDate: { type: Date, default: new Date() },
});

// Export the model named "Story" based on the defined schema
module.exports = mongoose.model("Story", storySchema);
