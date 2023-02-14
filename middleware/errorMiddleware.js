export const errorHandler = (error, req, res) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";
  console.log("RUNN!");
  if (env === "development") {
    return res.status(statusCode).json({
      error: errorMessage,
      stack: error.stack,
    });
  }

  res.status(statusCode).json({
    error: errorMessage,
  });
};
