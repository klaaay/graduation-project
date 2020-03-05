const express = require("express");
const router = express.Router();
const File = require("../models/File");
const Fgroup = require("../models/Fgroup");

router.post("/", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/img/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

router.post("/cover", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const { projectCoverPath } = req.body;

  const file = req.files.file;

  file.mv(`${projectCoverPath}`, err => {
    if (err) {
      return res.status(500).send({ data: err, msg: "服务器错误" });
    }

    res.json({ fileName: file.name, filePath: projectCoverPath });
  });
});

router.post("/fgroup/:id", async (req, res) => {
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
