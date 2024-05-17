// Load environment variables from a .env file (optional)
require("dotenv").config({ path: ".env" });

// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes from separate files
const storyRoutes = require("./routes/stories.js");
const userRoutes = require("./routes/users.js");

// Create an Express application instance
const app = express();

// Configure body parsers for handling incoming request data
app.use(bodyParser.json({ limit: "32mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }));

// Enable CORS for cross-origin requests (optional)
app.use(cors());

// Mount routes under specific paths
app.use("/stories", storyRoutes);
app.use("/user", userRoutes);

// Retrieve environment variables (assuming they are set in the .env file)
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`Server is running on port : ${PORT}`);
    app.listen(PORT); // Start the server after successful connection
  } catch (err) {
    console.error("Connection to MongoDB failed", err.message);
  }
};

// Deployment configuration for serving a React build (optional)
const path = require("path");
__dirname = path.resolve(); // Resolve the current directory path

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React client build folder in production
  app.use(express.static(path.join(__dirname, "/client/build")));

  // Handle any route by serving the React app's index.html for client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Connect to MongoDB database
connectDB();

// Event listeners for connection status
mongoose.connection.on("open", () =>
  console.log("Connection to database has been established successfully")
);
mongoose.connection.on("error", (err) => console.log(err));

