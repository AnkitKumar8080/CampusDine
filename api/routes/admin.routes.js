import {
  createCategory,
  createProduct,
  deleteProduct,
  deleteUser,
  updateProduct,
} from "../controllers/admin.controller.js";
import { updateOrderStatus } from "../controllers/order.controller.js";
import { getAllUsers } from "../controllers/user.controllers.js";
import { verifyAdmin } from "../middlewares/admin.authMiddleware.js";
import { verifyJwt } from "../middlewares/jwt.authMiddleware.js";
import { productValidator } from "../validators/product.validators.js";
import { validate } from "../validators/validate.js";
import { Router } from "express";

const router = Router();

// secured admin routes

// get all users
router.route("/get-all-users").get(verifyJwt, verifyAdmin, getAllUsers);

// delete
// router.route("/user/:userId").delete(verifyJwt, verifyAdmin, deleteUser);
router.route("/user/:userId").delete(deleteUser);

// product routes
router
  .route("/create-category")
  .post(validate, verifyJwt, verifyAdmin, createCategory);
router
  .route("/create-product")
  .post(productValidator(), validate, verifyJwt, verifyAdmin, createProduct);
router
  .route("/update-product/:productId")
  .patch(validate, verifyJwt, verifyAdmin, updateProduct);
router
  .route("/delete-product/:productId")
  .delete(verifyJwt, verifyAdmin, deleteProduct);
router
  .route("/update-order-status")
  // .patch(validate, verifyJwt, verifyAdmin, updateOrderStatus);
  .patch(updateOrderStatus);
export default router;
