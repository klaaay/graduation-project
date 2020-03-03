const express = require("express");
const router = express.Router();
const path = require("path");
const { check, validationResult } = require("express-validator");

const File = require("../models/File");
const Fgroup = require("../models/Fgroup");

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post("/:id", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  const projectId = req.params.id;

  const { name, size, mimetype } = file;

  thumbFile = new File({
    name,
    size,
    type: mimetype
  });

  detailFile = new File({
    name,
    size,
    type: mimetype
  });

  thumbFile.path = `${path.resolve(__dirname, "../")}/img/${file.name}`;
  detailFile.path = `${path.resolve(__dirname, "../")}/img/${file.name}`;

  const newThumbFile = await thumbFile.save();
  const newDetailFile = await detailFile.save();

  console.log("newThumbFile", newThumbFile.id);
  console.log("newDetailFile", newDetailFile.id);

  fgrpud = new Fgroup({
    project: projectId,
    thumb: newThumbFile.id,
    detail: newDetailFile.id
  });

  await fgrpud.save();

  file.mv(`${path.resolve(__dirname, "../")}/img/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

module.exports = router;
