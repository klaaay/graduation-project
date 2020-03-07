const express = require("express");
const router = express.Router();
const fs = require("fs");
const File = require("../models/File");
const Fgroup = require("../models/Fgroup");
const auth = require("../middleware/auth");
const images = require("images");
const Project = require("../models/Project");

router.post("/cover", auth, async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const { projectCoverPath } = req.body;
  if (!projectCoverPath) {
    return res.status(500).send({ msg: "项目封面路径获取失败" });
  }
  const file = req.files.file;
  const { name, size, mimetype } = file;
  try {
    await file.mv(`${projectCoverPath}`);
    const newFile = new File({
      name,
      size,
      type: mimetype,
      path: projectCoverPath
    });
    await newFile.save();
    res.json({ fileName: file.name, filePath: projectCoverPath });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ data: error, msg: "服务器错误" });
  }
});

router.post("/pic/:id", async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const originalFile = req.files.file;
  const { name, size, mimetype } = originalFile;
  const projectId = req.params.id;
  const project = await Project.findById(projectId);
  const { _id, path: projectPath } = project;

  try {
    await originalFile.mv(`${projectPath}/img/${name}`);
    if (!fs.existsSync(`${projectPath}/img/thumbs`)) {
      fs.mkdirSync(`${projectPath}/img/thumbs`);
    }
    images(`${projectPath}/img/${name}`)
      .size(65)
      .save(`${projectPath}/img/thumbs/${name}`, {
        quality: 60
      });
    console.log(images(`${projectPath}/img/thumbs/${name}`));
    res.json({
      originalFile: `${projectPath}/img/${name}`,
      thumbnailFile: `${projectPath}/img/thumbs/${name}`
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ data: error, msg: "服务器错误" });
  }
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
