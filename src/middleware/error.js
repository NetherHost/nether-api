const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    code: 500,
    error: "Internal Server Error",
    message: "Something went wrong on our end.",
  });
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    code: 404,
    error: "Not Found",
    message: "The requested resource was not found.",
  });
};

module.exports = { errorHandler, notFoundHandler };
