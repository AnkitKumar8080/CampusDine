import { Router } from "express";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/user.validators.js";
import {
  getCategories,
  getProducts,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.controllers.js";
import { validate } from "../validators/validate.js";
import { verifyJwt } from "../middlewares/jwt.authMiddleware.js";
import { placeOrderValidator } from "../validators/order.validator.js";
import {
  getAllUserOrders,
  placeOrder,
} from "../controllers/order.controller.js";
const router = Router();

// user routes
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/updateuser").patch(validate, verifyJwt, updateUser);
router.route("/get-products").get(validate, verifyJwt, getProducts);
router.route("/get-categories").get(validate, verifyJwt, getCategories);
router.route("/get-all-orders").get(validate, verifyJwt, getAllUserOrders);

// order routes
router
  .route("/order")
  .post(placeOrderValidator(), validate, verifyJwt, placeOrder);
export default router;
