import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "unauthorized request no token provided");
  }
  const decodedToken = await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_KEY
  );

  if (!decodedToken) {
    throw new ApiError(401, "Only admins can access this route");
  }

  console.log(req.user);

  if (req.user.role !== "admin") {
    throw new ApiError(401, "Only admins can access this route");
  }

  next();
});
