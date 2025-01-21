const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const userService = require("../services/user.service");

// get all users
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search?.trim();
    const adminFilter = req.query.admin === "1";
    const sortBy = req.query.sort_by;
    const sortOrder = req.query.sort_order;
    const fields = req.query.fields?.split(",");
    const banned =
      req.query.banned === "1" ? true : req.query.banned === "0" ? false : null;
    const hasBought =
      req.query.has_bought === "1"
        ? true
        : req.query.has_bought === "0"
        ? false
        : null;

    if (page < 1) {
      return res.status(400).json({
        code: 400,
        error: "Bad Request",
        message: "Page number must be greater than 0",
      });
    }

    const result = await userService.getAllUsers({
      page,
      adminFilter,
      search,
      sortBy,
      sortOrder,
      fields,
      banned,
      hasBought,
    });

    res.json(result);
  } catch (error) {
    logger.error(`Failed to fetch users: ${error.message}`);
    res.status(500).json({
      code: 500,
      error: "Internal Server Error",
      message: "Failed to fetch users",
    });
  }
});

// get user by id route
router.get("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const fields = req.query.fields?.split(",");

    if (isNaN(userId)) {
      return res.status(400).json({
        code: 400,
        error: "Bad Request",
        message: "User ID must be a number",
      });
    }

    const user = await userService.getUserById(userId, fields);

    if (!user) {
      return res.status(404).json({
        code: 404,
        error: "Not Found",
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    logger.error(`Failed to fetch user ${req.params.id}: ${error.message}`);
    res.status(500).json({
      code: 500,
      error: "Internal Server Error",
      message: "Failed to fetch user",
    });
  }
});

module.exports = router;
