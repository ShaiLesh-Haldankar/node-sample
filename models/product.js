const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  miniSpecs: {
    type: [String],
  },
  brandName: {
    type: String,
    required: true,
  },
  productImages: {
    type: [String],
  },
  // addedOn: {
  //   type: Date,
  // },
});


const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
exports.productSchema = productSchema;

