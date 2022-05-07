const express = require("express");
const productRoutes = express.Router();
const fs = require("fs");

const productDataPath = "./data/products.json";

// UTILITY FUNCTIONS
const saveProductData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(productDataPath, stringifyData);
};

const getProducts = () => {
  const jsonData = fs.readFileSync(productDataPath);
  return JSON.parse(jsonData);
};

productRoutes.get("/products", (req, res) => {
  const products = getProducts();
  res.send(JSON.stringify(products));
});

productRoutes.post("/products/add", (req, res) => {
  let existProducts = getProducts();

  if (req.body.hasOwnProperty("id")) {
    let values = {
      id: parseInt(req.body.id),
      name: req.body.id,
      status: "New",
    };
    existProducts.push(values)

    saveProductData(existProducts);
    res.send(existProducts[existProducts.length - 1]);
  }
});

productRoutes.get("/products/:id", (req, res) => {
  let existProducts = getProducts();

  fs.readFile(
    productDataPath,
    "utf8",
    (err, data) => {
      const productId = parseInt(req.params["id"]);

      existProducts.forEach((product, index) => {
        if (product.id === productId) {
          let selectedProduct = product;

          res.send(selectedProduct)
        }
      })
    },
    true
  );
});

productRoutes.put("/products/:id", (req, res) => {
  let existProducts = getProducts();

  fs.readFile(
    productDataPath,
    "utf8",
    (err, data) => {
      const productId = parseInt(req.params["id"]);

      if (
        req.body.hasOwnProperty("name") &&
        !req.body.hasOwnProperty("status")
      ) {
        existProducts.forEach((product, index) => {
          if (product.id === productId) {
            let updatedValues = {
              ...existProducts[index],
              name: req.body.name,
            };

            existProducts[index] = updatedValues;

            saveProductData(existProducts);
            res.send(existProducts[index]);
          }
        })
      } else if (
        req.body.hasOwnProperty("status") &&
        !req.body.hasOwnProperty("name")
      ) {
        existProducts.forEach((product, index) => {
          if (product.id === productId) {
            let updatedValues = {
              ...existProducts[index],
              status: req.body.status,
            };

            existProducts[index] = updatedValues;

            saveProductData(existProducts);
            res.send(existProducts[index]);
          }
        })
      } else {
        existProducts.forEach((product, index) => {
          if (product.id === productId) {
            existProducts[index] = req.body

            saveProductData(existProducts);
            res.send(existProducts[index]);
          }
        })
      }
    },
    true
  );
});

module.exports = productRoutes;
