const express = require("express");
const router = express.Router();
const {
  createProduct,
  readProduct,
  updateProduct,
  deleteProduct,
  listProduct,
  listRelatedProducts,
  listCategories,
  searchProducts,
  sendProductPhoto,
  productById,
} = require("../controllers/product");
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { productValidation } = require("../validator");

router.post(
  "/product/create/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  productValidation,
  createProduct
);

router.get("/product/:productId", readProduct);

router.delete(
  "/product/:productId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  deleteProduct
);

router.put(
  "/product/:productId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  updateProduct
);

router.get("/products", listProduct);
router.get("/products/related/:productId", listRelatedProducts);
router.get("/products/categories", listCategories);
router.post("/products/by/search", searchProducts);
router.get("/products/photo/:productId", sendProductPhoto);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
