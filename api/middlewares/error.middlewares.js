import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  // check if the error is an instance of a ApiError class which extends native Error class
  if (!error instanceof ApiError) {
    // if the error is not an instance of ApiError class then we make it an instance of ApiError

    const statusCode = error.statusCode || 500; // if statuscode exists use it else assign 500

    // set a appropriate error message
    const message = error.message || "Something went wrong";

    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  // now it is confirmed that the error instance will be instance of ApiError class
  const response = {
    ...error,
    message: error.message,

    // if development environment, than give a detailed error stack for debugging purposes
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  // send the response back to the client
  return res.status(error.statusCode || 500).json(response);
};

export { errorHandler };
