const express = require("express");
const router = express.Router();
const fs = require("fs");

const productRoutes = require("./product.js");
const imageRoutes = require("./image.js");

router.use(productRoutes);
router.use(imageRoutes);

module.exports = router;
