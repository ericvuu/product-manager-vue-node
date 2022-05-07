const express = require("express");
const imageRoutes = express.Router();
const fs = require("fs");

const imageDataPath = "./data/images.json";

// UTILITY FUNCTIONS
const saveImageData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(imageDataPath, stringifyData);
};

const getImages = () => {
  const jsonData = fs.readFileSync(imageDataPath);
  return JSON.parse(jsonData);
};

imageRoutes.get("/images", (req, res) => {
  const images = getImages();
  res.send(JSON.stringify(images));
});

imageRoutes.post("/images/add", (req, res) => {
  let existImages = getImages();

  console.log(req.body)

  if (req.body.hasOwnProperty("title")) {
    let productIds;

    if (req.body.hasOwnProperty("productIDs")) {
      if (req.body.productIDs !== "") {
        productIDs = Array.from(req.body.productIDs.split(/[ ,]+/), Number);
      } else {
        productIDs = [];
      }
    }

    let values = {
      id: req.body.id,
      title: req.body.title,
      url: req.body.url ? req.body.url : "",
      productIDs: productIDs,
    };

    existImages.push(values);
    saveImageData(existImages);

    res.send(existImages);
  }
});

imageRoutes.put("/images/:id", (req, res) => {
  let existImages = getImages();

  fs.readFile(
    imageDataPath,
    "utf8",
    (err, data) => {
      const imageId = parseInt(req.params["id"]);

      let productIDs = Array.from(req.body.productIDs.split(/[ ,]+/), Number);

      existImages.forEach((image, index) => {
        if (image.id === imageId) {
          let updatedValues = {
            ...existImages[index],
            title: req.body.title,
            url: req.body.url,
            productIDs: productIDs,
          };
          existImages[index] = updatedValues;
          saveImageData(existImages);
          res.send(existImages[index]);
        }
      });
    },
    true
  );
});

module.exports = imageRoutes;
