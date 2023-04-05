const mongoose = require("mongoose");

const model = {};

model.mongoose = mongoose;
const { User } = require("./user");
const { Product } = require("./product");
model.user = User;
model.product = Product;
module.exports = model;
