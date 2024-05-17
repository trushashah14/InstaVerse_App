const mongoose = require("mongoose");

const Story = require("../models/storyContent.js"); // Importing the Story model

// Controller to fetch all stories
const getStories = async (req, res) => {
  try {
    const story = await Story.find(); // Fetch all stories from the database
    res.status(200).json(story); // Respond with status 200 and the fetched stories in JSON format
  } catch (error) {
    res.status(404).json({ message: error.message }); // If an error occurs, respond with status 404 and the error message
  }
};

// Controller to create a new story
const createStory = async (req, res) => {
  const body = req.body;
  // Create a new Story instance with the request body, user ID, and current date
  const newStory = new Story({
    ...body,
    userId: req.userId,
    postDate: new Date().toISOString(),
  });

  try {
    await newStory.save(); // Save the new story to the database
    res.status(201).json(newStory); // Respond with status 201 and the saved story in JSON format
  } catch (error) {
    res.status(409).json({ message: error.message }); // If an error occurs, respond with status 409 and the error message
  }
};

// Controller to update an existing story
const updateStory = async (req, res) => {
  const { id: _id } = req.params;
  const story = req.body;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("This id doesn't belong to any story");
  }

  // Find the story by ID and update it with the new data
  const updatedStory = await Story.findByIdAndUpdate(_id, story, { new: true });
  res.json(updatedStory); // Respond with the updated story in JSON format
};

// Controller to delete an existing story
const deleteStory = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("This id doesn't belong to any story");
  }

  await Story.findByIdAndDelete(id); // Find the story by ID and delete it
  res.json({ message: "Story deleted successfully" }); // Respond with a success message
};

// Controller to like or unlike a story
const likeStory = async (req, res) => {
  const { id } = req.params;

  // Check if the user is authenticated
  if (!req.userId) return res.json({ message: "Unauthorized User" });

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("This id doesn't belong to any story");
  }

  const story = await Story.findById(id); // Find the story by ID

  // Check if the user has already liked the story
  const index = story.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    story.likes.push(req.userId); // If not liked, add the user ID to the likes array
  } else {
    story.likes = story.likes.filter((id) => id !== String(req.userId)); // If liked, remove the user ID from the likes array
  }

  // Find the story by ID and update it with the new likes array
  const updatedStory = await Story.findByIdAndUpdate(id, story, { new: true });

  res.json(updatedStory); // Respond with the updated story in JSON format
};

module.exports = {
  getStories,
  createStory,
  updateStory,
  deleteStory,
  likeStory,
}; // Exporting the controllers
