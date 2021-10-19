const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({ error: "Product does not exist" });
    }

    req.product = product;
    next();
  });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image cannot be uploaded" });
    }

    // Check requirements for all fields
    const {
      name,
      description,
      warning,
      ingredients,
      directions,
      price,
      category,
      quantity,
      shipping,
    } = fields;
    if (
      !name ||
      !description ||
      !ingredients ||
      !directions ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let product = new Product(fields);

    // Split ingredients to store in an array
    if (fields.ingredients) {
      console.log(fields.ingredients);
      product.ingredients = fields.ingredients.split(",");
    }

    // Check if there is a photo and its type
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res
          .status(400)
          .json({ error: "Image should be less than 1mb in size" });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    // Save product to db
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json(result);
    });
  });
};

// NOt sending photo with product to send product to front end faster
// Photo will be handled by another middleware
exports.readProduct = (req, res) => {
  req.product.photo = undefined;
  res.json(req.product);
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image cannot be uploaded" });
    }

    // Check requirements for all fields
    const {
      name,
      description,
      warning,
      ingredients,
      directions,
      price,
      category,
      quantity,
      shipping,
    } = fields;
    if (
      !name ||
      !description ||
      !ingredients ||
      !directions ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Split ingredients to store in an array
    if (fields.ingredients) {
      console.log(fields.ingredients);
      fields.ingredients = fields.ingredients.split(",");
    }

    let product = req.product;
    product = _.extend(product, fields);

    // Check if there is a photo and its type
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res
          .status(400)
          .json({ error: "Image should be less than 1mb in size" });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    // Save product to db
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json(result);
    });
  });
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ message: `${deletedProduct.name} deleted successfully.` });
  });
};
