const errorHandler = (err, req, res, next) => {
  console.error("[ERROR]", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
};

export default errorHandler; 