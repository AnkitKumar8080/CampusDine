import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "unauthorized request no token provided");
  }

  try {
    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );

    if (!decodedToken) {
      throw new ApiError(401, error?.message || "Invalid access token ");
    }

    const user = await UserModel.getUserById(decodedToken?.userId);
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    throw new ApiError(401, error?.message || "Invalid access token s");
  }
});
