const express = require("express");
const { newOrder, myOrders, getSingleOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder).delete(isAuthenticatedUser, deleteOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);


module.exports = router;