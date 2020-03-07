const mongoose = require("mongoose");

const ProjectShema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  cover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "files"
  },
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  relativePath: {
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

module.exports = mongoose.model("project", ProjectShema);
