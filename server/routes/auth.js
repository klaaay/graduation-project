const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ data: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "服务器错误" });
  }
});

router.post(
  "/",
  [
    check("email", "请输入合法的邮箱").isEmail(),
    check("password", "请输入密码").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "该用户不存在" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "用户密码错误" });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      const { name } = user;

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            data: {
              token,
              name
            },
            msg: "登录成功"
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "服务器错误" });
    }
  }
);

module.exports = router;
