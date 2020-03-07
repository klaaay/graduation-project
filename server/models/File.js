const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  remotePath: {
    type: String,
    require: true
  },
  localPath: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("file", FileSchema);
