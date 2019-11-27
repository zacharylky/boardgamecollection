require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
const db = mongoose.connection;

// Port
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/boardgames";

//Database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Error / success
db.on("error", err => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

// open the connection to mongo
db.on("open", () => {});

//Controllers
const gamesController = require("./controllers/collection.js");

//Middleware
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.json());

//Body Parser
app.use(express.urlencoded({ extended: false }));

app.use("/games", gamesController);

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// Server listening
app.listen(PORT, () => console.log("Listening on port:", PORT));
