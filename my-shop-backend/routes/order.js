const express = require("express");
const router = express.Router();
const { requireSignIn, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createOrder } = require("../controllers/order");

router.post("/order/create/:userId", requireSignIn, isAuth, createOrder);

router.param("userId", userById);
module.exports = router;
