const express = require("express");
const router = express.Router();
const config = require("config");
const fs = require("fs");

const DOMAIN = config.get("DOMAIN");
const SERVER_PORT = config.get("SERVER_PORT");
const INIT_URL = config.get("INIT_URL");

var navbarInfo = [];
var projectsData = {};

var projectsDataLength = fs.readdirSync("./data").length;

for (let i = 0; i < projectsDataLength; i++) {
  projectsData["classify" + i] = [];
}

var classifys = fs.readdirSync("./data");

var navbarInfo = classifys.sort().map((item, index) => {
  return {
    text: item.slice(1),
    index: parseFloat(item.slice(0, 1)),
    icon: `${DOMAIN}:${SERVER_PORT}/${INIT_URL}/${item}/${item.slice(1)}.png`
  };
});

classifys.sort().forEach(async (classify, index_classify) => {
  fs.readdirSync(`./data/${classify}`)
    .filter(project => project.slice(-4) !== ".png")
    .map((project, index_project) => {
      var description = fs.readFileSync(
        `./data/${classify}/${project}/description.txt`
      );
      var birthtime = fs.statSync(
        `./data/${classify}/${project}/description.txt`
      ).birthtimeMs;
      // console.log(time.birthtimeMs)
      var file_items = fs.readdirSync(`./data/${classify}/${project}`);
      var pic = [];
      var video = [];
      var pdf = [];
      if (file_items.includes("img")) {
        pic = fs
          .readdirSync(`./data/${classify}/${project}/img`)
          .filter(
            img_item =>
              img_item.split(".")[0] !== "cover" && img_item !== "thumbs"
          )
          .map(img_item => ({
            original: `${DOMAIN}:${SERVER_PORT}/${INIT_URL}/${classify}/${project}/img/${img_item}`,
            thumbnail: `${DOMAIN}:${SERVER_PORT}/${INIT_URL}/${classify}/${project}/img/thumbs/${img_item}`,
            originalClass: "imgGallery",
            originalTitle: img_item.split(".")[0],
            thumbnailTitle: img_item.split(".")[0]
          }));
      }
      if (file_items.includes("video")) {
        video = fs
          .readdirSync(`./data/${classify}/${project}/video`)
          .filter(video_item => video_item.split(".")[1] === "jpg")
          .map(video_item => ({
            video: `${DOMAIN}:${SERVER_PORT}/${INIT_URL}/${classify}/${project}/video/${
              video_item.split(".")[0]
            }.mp4`,
            thumb: `${DOMAIN}:${SERVER_PORT}/${INIT_URL}/${classify}/${project}/video/${
              video_item.split(".")[0]
            }.jpg`,
            alt: video_item.split(".")[0]
          }));
      }
      if (file_items.includes("pdf")) {
        pdf = fs
          .readdirSync(`./data/${classify}/${project}/pdf`)
          .filter(pdf_item => pdf_item.split(".")[1] === "jpg")
          .map(pdf_item => ({
            pdf: `${DOMAIN}:${SERVER_PORT}/${INIT_URL}/${classify}/${project}/pdf/${
              pdf_item.split(".")[0]
            }.pdf`,
            thumb: `${DOMAIN}:${SERVER_PORT}/${INIT_URL}/${classify}/${project}/pdf/${
              pdf_item.split(".")[0]
            }.jpg`,
            alt: pdf_item.split(".")[0]
          }));
      }
      var project_item = {
        info: {
          title: `${project}`,
          birthtime: birthtime,
          classify: index_classify,
          description: description.toString(),
          pic: `${DOMAIN}:${SERVER_PORT}/${INIT_URL}/${classify}/${project}/img/cover.jpg`,
          page: Math.floor(index_project / 8) + 1,
          classify: parseFloat(classify.slice(0, 1))
        },
        pic,
        video,
        pdf
      };
      projectsData["classify" + classify.slice(0, 1)].push(project_item);
    });
});

router.get("/nav", (req, res, next) => {
  res.json({
    navbarInfo
  });
});

router.get("/", (req, res) => {
  res.json({
    navbarInfo,
    ...projectsData
  });
});

module.exports = router;
