const mysql = require("mysql2/promise");
const logger = require("../utils/logger");

class UserService {
  constructor() {
    this.pageSize = 250;
    this.pool = mysql.createPool({
      uri: process.env.MYSQL_URI,
      connectionLimit: 10,
    });
  }

  async getAllUsers(options = {}) {
    try {
      const {
        page = 1,
        adminFilter = false,
        search = "",
        sortBy = "id",
        sortOrder = "asc",
        fields = ["*"],
        banned = null,
        hasBought = null,
      } = options;

      const offset = (page - 1) * this.pageSize;
      const validSortFields = [
        "id",
        "username",
        "email",
        "created_at",
        "updated_at",
      ];
      const actualSortBy = validSortFields.includes(sortBy) ? sortBy : "id";
      const actualSortOrder = ["asc", "desc"].includes(sortOrder.toLowerCase())
        ? sortOrder
        : "asc";

      // Build WHERE clause
      const whereConditions = [];
      const params = [];

      if (adminFilter) {
        whereConditions.push("admin = true");
      }

      if (search) {
        whereConditions.push(
          "(username LIKE ? OR email LIKE ? OR discord_username LIKE ?)"
        );
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }

      if (banned !== null) {
        whereConditions.push("banned = ?");
        params.push(banned);
      }

      if (hasBought !== null) {
        whereConditions.push("has_bought_before = ?");
        params.push(hasBought);
      }

      const whereClause = whereConditions.length
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

      const countQuery = `SELECT COUNT(*) as total FROM users ${whereClause}`;
      const [countResult] = await this.pool.execute(countQuery, params);
      const totalUsers = countResult[0].total;

      const selectedFields = fields.includes("*")
        ? "id, username, email, email_verified_at, admin, banned, ban_id, pterodactyl_user_id, has_bought_before, created_at, updated_at, discord_id, discord_username"
        : fields.join(", ");

      const query = `
        SELECT ${selectedFields} 
        FROM users 
        ${whereClause} 
        ORDER BY ${actualSortBy} ${actualSortOrder}
        LIMIT ? OFFSET ?
      `;

      const [rows] = await this.pool.execute(query, [
        ...params,
        this.pageSize,
        offset,
      ]);

      const totalPages = Math.ceil(totalUsers / this.pageSize);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return {
        data: rows,
        pagination: {
          total: totalUsers,
          per_page: this.pageSize,
          current_page: page,
          total_pages: totalPages,
          has_next_page: hasNextPage,
          has_prev_page: hasPrevPage,
          next_page: hasNextPage ? page + 1 : null,
          prev_page: hasPrevPage ? page - 1 : null,
        },
        filters: {
          search: search || null,
          admin_filter: adminFilter,
          banned: banned,
          has_bought: hasBought,
          sort_by: actualSortBy,
          sort_order: actualSortOrder,
          fields: fields,
        },
      };
    } catch (error) {
      logger.error(`Failed to fetch users: ${error.message}`);
      throw error;
    }
  }

  async getUserById(id, fields = ["*"]) {
    try {
      const selectedFields = fields.includes("*")
        ? "id, username, email, email_verified_at, admin, banned, ban_id, pterodactyl_user_id, has_bought_before, created_at, updated_at, discord_id, discord_username"
        : fields.join(", ");

      const [rows] = await this.pool.execute(
        `SELECT ${selectedFields} FROM users WHERE id = ?`,
        [id]
      );

      return rows.length === 0 ? null : rows[0];
    } catch (error) {
      logger.error(`Failed to fetch user ${id}: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new UserService();
