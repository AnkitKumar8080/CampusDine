import { body } from "express-validator";

export const placeOrderValidator = (req, res, next) => {
  return [
    // Validate pickUpTime
    body("pickUpTime")
      .notEmpty()
      .withMessage("Pick up time must not be empty")
      .isString()
      .withMessage("Pick up time must be a string"),

    // Validate cartItems
    body("cartItems")
      .isArray()
      .withMessage("Cart items must be an array")
      .notEmpty()
      .withMessage("Cart items must not be empty"),

    body("cartItems.*.productId")
      .isString()
      .notEmpty()
      .withMessage("Product ID is required"),

    body("cartItems.*.quantity")
      .isNumeric()
      .withMessage("Quantity must be a number")
      .notEmpty()
      .withMessage("Quantity must not be empty"),
  ];
};
