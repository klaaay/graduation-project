const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Project = require("../models/Project");
const File = require("../models/File");
const Fgroup = require("../models/Fgroup");
const rimraf = require("rimraf");

router.get("/", auth, async (req, res) => {
  try {
    const proejcts = await Project.find({ user: req.user.id })
      .populate("cover")
      .sort({
        date: -1
      });

    res.json({ data: proejcts });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "服务器错误" });
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("name", "请输入项目名")
        .not()
        .isEmpty(),
      check("description", "请输入项目描述")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, type } = req.body;

    const relativePath = `/data/${type}/${name}`;

    const localPath = path.resolve(__dirname, "../", "./data", type, name);

    try {
      const newProject = new Project({
        name,
        description,
        type,
        relativePath,
        localPath,
        user: req.user.id
      });

      if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath);
        fs.mkdirSync(path.resolve(localPath, "img"));
        fs.mkdirSync(path.resolve(localPath, "pdf"));
        fs.mkdirSync(path.resolve(localPath, "video"));
        fs.writeFile(
          `${localPath}/description.txt`,
          description,
          "utf8",
          function(error) {
            if (error) {
              res.status(500).send({ msg: "保存描述文件错误" });
            }
          }
        );
      }
      const project = await newProject.save();
      res.json({ data: project, msg: "创建项目成功" });
    } catch (err) {
      res.status(500).send({ msg: "服务器错误" });
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  const getTypePath = localPath => {
    return localPath
      .split(path.sep)
      .slice(0, -1)
      .join(path.sep);
  };
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "当前项目不存在" });
    const { name, description, type } = req.body;
    const projectFields = {};
    if (name) {
      projectFields.name = name;
      // console.log(getTypePath(project.localPath));
      // fs.renameSync(
      //   project.localPath,
      //   `${getTypePath(project.localPath)}${path.sep}${name}`
      // );
    }
    if (description) {
      projectFields.description = description;
      fs.writeFileSync(
        `${project.localPath}/description.txt`,
        description,
        "utf8"
      );
    }
    if (type) projectFields.type = type;
    if (project.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "用户验证失败" });

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectFields },
      { new: true }
    );
    res.json({ data: project, msg: "更新项目成功" });
  } catch (err) {
    console.log(err);

    res.status(500).send({ msg: "服务器错误" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("cover");
    if (!project) return res.status(404).json({ msg: "没有找到该项目" });
    if (project.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "用户验证失败" });
    const projectId = req.params.id;
    const fileGroupList = await Fgroup.find({ project: projectId });
    const fileIdList = fileGroupList.reduce((result, current) => {
      result.push(current.thumb);
      result.push(current.detail);
      return result;
    }, []);
    rimraf(project.cover.localPath, function(err) {
      if (err) {
        console.log(err);
        res.status(500).send({ msg: "服务器错误" });
      }
    });
    rimraf(project.localPath, function(err) {
      if (err) {
        console.log(err);
        res.status(500).send({ msg: "服务器错误" });
      }
    });
    await Project.findByIdAndRemove(projectId);
    await File.findByIdAndRemove(project.cover._id);
    await Fgroup.deleteMany({
      project: projectId
    });
    await File.remove({ _id: { $in: fileIdList } });
    res.json({ msg: "项目删除成功" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "服务器错误" });
  }
});

module.exports = router;
