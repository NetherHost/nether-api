const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      code: 401,
      error: "Unauthorized",
      message: "No API key provided.",
    });
  }

  if (token !== process.env.DEV_API_KEY) {
    return res.status(401).json({
      code: 401,
      error: "Unauthorized",
      message: "An invalid API key was provided.",
    });
  }

  next();
};

module.exports = authenticateToken;
