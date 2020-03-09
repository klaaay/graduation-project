const express = require("express");
const router = express.Router();
const fs = require("fs");
const config = require("config");
const File = require("../models/File");
const Fgroup = require("../models/Fgroup");
const auth = require("../middleware/auth");
const images = require("images");
const Project = require("../models/Project");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
ffmpeg.setFfmpegPath(ffmpegPath);

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
  const { name } = file;
  try {
    await file.mv(`${project.localPath}/img/cover.jpg`);
    const newFile = new File({
      name,
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
  const { name } = originalFile;
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

    const thumbFile = new File({
      name,
      remotePath: `${config.get("DOMAIN")}:${config.get(
        "SERVER_PORT"
      )}${relativePath}/img/thumbs/${name}`,
      localPath: `${localPath}/img/thumbs/${name}`
    });

    const detailFile = new File({
      name,
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
      detail: newDetailFile._id,
      type: "pic"
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

router.post("/video/:id", async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const originalFile = req.files.file;
  const projectId = req.params.id;
  const { name } = originalFile;
  const project = await Project.findById(projectId);

  const { _id, localPath, relativePath } = project;

  try {
    await originalFile.mv(`${localPath}/video/${name}`);

    new ffmpeg(`${localPath}/video/${name}`)
      .screenshots({
        timemarks: ["0.5"],
        count: 1,
        filename: `${name.split(".")[0]}.jpg`,
        folder: `${localPath}/video`,
        size: "500x500"
      })
      .on("end", async function() {
        const thumbFile = new File({
          name,
          remotePath: `${config.get("DOMAIN")}:${config.get(
            "SERVER_PORT"
          )}${relativePath}/video/${name.split(".")[0]}.jpg`,
          localPath: `${localPath}/video/${name.split(".")[0]}.jpg`
        });

        const detailFile = new File({
          name,
          remotePath: `${config.get("DOMAIN")}:${config.get(
            "SERVER_PORT"
          )}${relativePath}/video/${name}`,
          localPath: `${localPath}/video/${name}`
        });

        const newThumbFile = await thumbFile.save();
        const newDetailFile = await detailFile.save();

        const fGroup = new Fgroup({
          project: projectId,
          thumb: newThumbFile._id,
          detail: newDetailFile._id,
          type: "video"
        });

        const newFgroup = await fGroup.save();

        res.json({
          data: newFgroup,
          msg: "视频上传成功"
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ data: error, msg: "服务器错误" });
  }
});

router.post("/pdf/:id", async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const originalFile = req.files.file;
  const { name } = originalFile;
  const projectId = req.params.id;
  const project = await Project.findById(projectId);
  const { _id, localPath, relativePath } = project;

  try {
    await originalFile.mv(`${localPath}/pdf/${name}`);
    const { stdout, stderr } = await exec(
      `magick convert "${localPath}/pdf/${name}[0]" "${localPath}/pdf/${
        name.split(".")[0]
      }.jpg"`
    );

    const thumbFile = new File({
      name,
      remotePath: `${config.get("DOMAIN")}:${config.get(
        "SERVER_PORT"
      )}${relativePath}/pdf/${name.split(".")[0]}.jpg`,
      localPath: `${localPath}/pdf/${name.split(".")[0]}.jpg`
    });

    const detailFile = new File({
      name,
      remotePath: `${config.get("DOMAIN")}:${config.get(
        "SERVER_PORT"
      )}${relativePath}/pdf/${name}`,
      localPath: `${localPath}/pdf/${name}`
    });

    const newThumbFile = await thumbFile.save();
    const newDetailFile = await detailFile.save();

    const fGroup = new Fgroup({
      project: projectId,
      thumb: newThumbFile._id,
      detail: newDetailFile._id,
      type: "pdf"
    });

    const newFgroup = await fGroup.save();

    res.json({
      data: newFgroup,
      msg: "演示文稿上传成功"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ data: error, msg: "服务器错误" });
  }
});

module.exports = router;
