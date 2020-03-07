const express = require("express");
const router = express.Router();
const fs = require("fs");
const config = require("config");
const File = require("../models/File");
const Fgroup = require("../models/Fgroup");
const auth = require("../middleware/auth");
const images = require("images");
const Project = require("../models/Project");

router.post("/cover", auth, async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const { projectId } = req.body;
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(500).send({ msg: "该项目不存在" });
  }
  const file = req.files.file;
  const { name, size, mimetype } = file;
  try {
    await file.mv(`${project.localPath}/img/cover.jpg`);
    const newFile = new File({
      name,
      type: mimetype,
      localPath: `${project.localPath}/img/cover.jpg`,
      remotePath: `${config.get("DOMAIN")}:${config.get("SERVER_PORT")}${
        project.relativePath
      }/img/cover.jpg`
    });
    const coverFile = await newFile.save();
    await Project.findByIdAndUpdate(
      projectId,
      {
        $set: {
          cover: coverFile._id
        }
      },
      { new: true }
    );
    res.json({ data: coverFile, msg: "上传封面成功" });
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
  const { name, mimetype } = originalFile;
  const projectId = req.params.id;
  const project = await Project.findById(projectId);
  const { _id, localPath, relativePath } = project;

  try {
    await originalFile.mv(`${localPath}/img/${name}`);
    if (!fs.existsSync(`${localPath}/img/thumbs`)) {
      fs.mkdirSync(`${localPath}/img/thumbs`);
    }
    images(`${localPath}/img/${name}`)
      .size(65)
      .save(`${localPath}/img/thumbs/${name}`, {
        quality: 60
      });
    console.log(images(`${localPath}/img/thumbs/${name}`));

    const thumbFile = new File({
      name,
      type: mimetype,
      remotePath: `${config.get("DOMAIN")}:${config.get(
        "SERVER_PORT"
      )}${relativePath}/img/thumbs/${name}`,
      localPath: `${localPath}/img/thumbs/${name}`
    });

    const detailFile = new File({
      name,
      type: mimetype,
      remotePath: `${config.get("DOMAIN")}:${config.get(
        "SERVER_PORT"
      )}${relativePath}/img/${name}`,
      localPath: `${localPath}/img/${name}`
    });

    const newThumbFile = await thumbFile.save();
    const newDetailFile = await detailFile.save();

    const fGroup = new Fgroup({
      project: projectId,
      thumb: newThumbFile._id,
      detail: newDetailFile._id
    });

    const newFgroup = await fGroup.save();

    res.json({
      data: newFgroup,
      msg: "图片上传成功"
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
