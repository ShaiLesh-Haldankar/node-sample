const mongoose = require("mongoose");
const express = require("express");
const { Product } = require("../models/product");

const router = express.Router();

router.get("/", async (req, res) => {
  let products = await Product.find();
  res.send(products);
});

router.post("/", async function (req, res) {
  try {
    let product = new Product(req.body);
    product = await product.save();
    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
