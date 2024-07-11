import { body } from "express-validator";

export const productValidator = () => {
  return [
    body("productName").isString().notEmpty(),
    body("image").isString(),
    body("rating").isFloat(),
    body("description").isString(),
    body("vegetarian").isBoolean(),
    body("price").isInt(),
    body("categoryId")
      .isString()
      .notEmpty()
      .withMessage("category should be a string"),
  ];
};
