const express = require("express");
const router = express.Router();
const Fgroup = require("../models/Fgroup");
const File = require("../models/File");
const rimraf = require("rimraf");
const auth = require("../middleware/auth");

router.get("/:id", auth, async (req, res) => {
  const projectId = req.params.id;
  try {
    const fGroupList = await Fgroup.find({ project: projectId })
      .populate("thumb")
      .populate("detail");
    res.json({ data: fGroupList, msg: "获取项目信息成功" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "服务器错误" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const fGroupId = req.params.id;
  try {
    const fGroup = await Fgroup.findById(fGroupId)
      .populate("thumb")
      .populate("detail");
    if (!fGroup) return res.status(404).json({ msg: "该媒体文件不存在" });
    const fileIdList = [fGroup.thumb._id, fGroup.detail._id];
    rimraf(fGroup.thumb.localPath, function(err) {
      if (err) {
        console.log(err);
        res.status(500).send({ msg: "服务器错误" });
      }
    });
    rimraf(fGroup.detail.localPath, function(err) {
      if (err) {
        console.log(err);
        res.status(500).send({ msg: "服务器错误" });
      }
    });
    await Fgroup.findByIdAndRemove(fGroupId);
    await File.remove({ _id: { $in: fileIdList } });

    res.json({ msg: "删除媒体文件成功" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "服务器错误" });
  }
});

module.exports = router;
