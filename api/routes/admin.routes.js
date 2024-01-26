import {
  createCategory,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/admin.controller.js";
import { updateOrderStatus } from "../controllers/order.controller.js";
import { verifyAdmin } from "../middlewares/admin.authMiddleware.js";
import { verifyJwt } from "../middlewares/jwt.authMiddleware.js";
import { productValidator } from "../validators/product.validators.js";
import { validate } from "../validators/validate.js";
import { Router } from "express";

const router = Router();

// secured admin routes

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
  .patch(validate, verifyJwt, verifyAdmin, updateOrderStatus);
export default router;
