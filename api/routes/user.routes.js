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
  uploadOtherImages,
  uploadUserProfile,
} from "../controllers/user.controllers.js";
import { validate } from "../validators/validate.js";
import { verifyJwt } from "../middlewares/jwt.authMiddleware.js";
import { placeOrderValidator } from "../validators/order.validator.js";
import {
  getAllUserOrders,
  placeOrder,
} from "../controllers/order.controller.js";
const router = Router();

// route to upload profile pic
router.route("/upload-profile").post(verifyJwt, uploadUserProfile);
// route to upload product and other images
router.route("/upload-images").post(verifyJwt, uploadOtherImages);

// user routes
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/updateuser").patch(validate, verifyJwt, updateUser);
router.route("/get-products").get(validate, verifyJwt, getProducts);
router.route("/get-categories").get(validate, verifyJwt, getCategories);
router.route("/order").get(validate, verifyJwt, getAllUserOrders);

router
  .route("/order")
  .post(placeOrderValidator(), validate, verifyJwt, placeOrder);
export default router;
