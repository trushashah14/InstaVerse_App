require("dotenv").config({ path: ".env" });

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const storyRoutes = require("./routes/stories.js");
const userRoutes = require("./routes/users.js");

const app = express();

app.use(bodyParser.json({ limit: "32mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }));
app.use(cors());
app.use("/stories", storyRoutes);
app.use("/user", userRoutes);

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));
  } catch (err) {
    console.error("Connection to MongoDB failed", err.message);
  }
};

// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

connectDB();
mongoose.connection.on("open", () =>
  console.log("Connection to database has been established succesfully")
);
mongoose.connection.on("error", (err) => console.log(err));
