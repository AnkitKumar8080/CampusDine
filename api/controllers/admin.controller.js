import { categoriesModel } from "../models/categories.model.js";
import { ProductModel } from "../models/product.model.js";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { filterObject } from "../utils/helper.js";

const createCategory = asyncHandler(async (req, res) => {
  const { categoryName, categoryDesc } = req.body;

  if (!categoryName && !categoryDesc)
    throw new ApiError(400, "provide a category name and description");

  const categoryRes = await categoriesModel.createCategory(
    categoryName,
    categoryDesc
  );

  if (!categoryRes) {
    throw new ApiError(500, "error creating category");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "category created successfully"));
});

const createProduct = asyncHandler(async (req, res) => {
  const productDetails = req.body;

  const newProduct = await ProductModel.createProduct(productDetails);

  if (!newProduct) {
    throw new ApiError(500, "something went wrong while creating product");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { product: newProduct },
        "product created successfully"
      )
    );
});

const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  let updateFields = req.body;
  // filter the update fields of products that are allowed to udpate
  updateFields = filterObject(updateFields, [
    "productId",
    "productName",
    "image",
    "rating",
    "description",
    "vegetarian",
    "price",
    "category",
  ]);

  const updatedProduct = await ProductModel.updateProducts(
    productId,
    updateFields
  );

  if (!updatedProduct) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { updatedProduct: updatedProduct },
        "product updated successfully"
      )
    );
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const delProdResult = await ProductModel.deleteProductById(productId);
  if (!delProdResult) {
    throw new ApiError(500, "product not found or something went wrong");
  }

  // return success if product was successfully deleted
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully"));
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const deleteUserResult = await UserModel.deleteUserById(userId);
  if (!deleteUserResult)
    throw new ApiError(500, "user not found or something went wrong ");

  // return success if user deleted
  return res
    .status(201)
    .json(new ApiResponse(201, {}, "user deleted successfully"));
});
export {
  createCategory,
  updateProduct,
  deleteProduct,
  deleteUser,
  createProduct,
};
