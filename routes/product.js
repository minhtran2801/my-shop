const express = require("express");
const router = express.Router();
const {
  createProduct,
  readProduct,
  updateProduct,
  deleteProduct,
  productById,
} = require("../controllers/product");
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post(
  "/product/create/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
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

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
