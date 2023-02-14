import dotenv from "dotenv";
dotenv.config();

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      error: errorMessage,
      stack: error.stack,
    });
  }

  res.status(statusCode).json({
    error: errorMessage,
  });
};
