const express = require("express");
const fs = require("fs");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); // req.body will be undefined without this
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes/Routes");
app.use("/", routes);

const port = 8000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
