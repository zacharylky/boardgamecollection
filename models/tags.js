const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = Schema({
  name: String
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
