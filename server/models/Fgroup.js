const mongoose = require("mongoose");

const FgroupSchema = mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects"
  },
  thumb: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "files"
  },
  detail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "files"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("fgroup", FgroupSchema);
