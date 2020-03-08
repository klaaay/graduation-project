const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Project = require("../models/Project");
const User = require("../models/User");
const File = require("../models/File");
const Fgroup = require("../models/Fgroup");
const rimraf = require("rimraf");

// @route       POST api/proejcts
// @desc        Get all users proejcts
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const proejcts = await Project.find({ user: req.user.id }).sort({
      date: -1
    });

    res.json({ data: proejcts });
  } catch (err) {
    res.status(500).send({ msg: "服务器错误" });
  }
});

// @route       POST api/proejcts
// @desc        Add new proejct
// @access      Private
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
        .isEmpty(),
      check("type", "请选择项目所属的类别").isIn([
        "0文学",
        "1社会",
        "2编程",
        "3生物",
        "4其他"
      ])
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

// @route       PUT api/proejcts/:id
// @desc        Update proejct
// @access      Private
router.put("/:id", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { name, description, type } = req.body;
  const projectFields = {};
  if (name) projectFields.name = name;
  if (description) projectFields.description = description;
  if (type) projectFields.type = type;

  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "当前项目不存在" });
    // Make sure user owns contact
    if (project.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "用户验证失败" });
    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectFields },
      { new: true }
    );
    res.json({ data: project, msg: "更新项目成功" });
  } catch (err) {
    res.status(500).send("服务器错误");
  }
});

// @route       PUT api/projects/:id
// @desc        Delete project
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "没有找到该项目" });
    // Make sure user owns project
    if (project.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "用户验证失败" });

    const projectId = req.params.id;
    const fileGroupList = await Fgroup.find({ project: projectId });
    console.log(fileGroupList);

    // rimraf(project.localPath, function(err) {
    //   // 删除当前目录下的 aaa
    //   if (err) console.log(err);
    // });
    // await Project.findByIdAndRemove(projectId);
    res.json({ msg: "项目删除成功" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "服务器错误" });
  }
});

module.exports = router;
