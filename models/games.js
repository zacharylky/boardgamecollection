const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = Schema({
  name: { type: String, required: true },
  description: String,
  img: String,
  playersMin: { type: Number, min: 1 },
  playersMax: { type: Number, max: 20 },
  weight: { type: Number, min: 1, max: 5 },
  rating: { type: Number, min: 1, max: 5 },
  tags: { type: Schema.Types.ObjectId, ref: "Tag" }
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
