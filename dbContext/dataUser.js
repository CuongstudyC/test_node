const db = require("./databaseContext");
const { verifyPassword, hashPassword } = require("../bcryptPassword/hashPass");
const user = {
  findAll: async () => {
    const query = `SELECT * FROM "user" WHERE "isactive" = true`;
    const result = await db.query(query);
    return result.rows;
  },

  findOne: async (id) => {
    const query = `SELECT * FROM "user" WHERE "id" = '${id}' AND "isactive" = true`;
    const result = await db.query(query);
    return result.rows[0];
  },
  create: async (body) => {
    const { name, password, email, avatar } = body;
    const hash = await hashPassword(password);
    const query = `INSERT INTO "user"
     ("name","password","email", ${avatar ? "avatar" : "" } )
      VALUES ('${name}', '${hash}', '${email}',${avatar ? `'${avatar}'` : ''}) RETURNING * `;
    const result = await db.query(query);
    return result.rows[0];
  },
  update: async (body) => {
    const { id, name, email } = body;
    const query = `UPDATE "user" SET 
    "name" = '${name}', 
    "email" = '${email}' 
    WHERE "id" = '${id}' 
    RETURNING *`;
    const result = await db.query(query);
    return result.rows[0];
  },
  delete: async (id) => {
    const query = `UPDATE "user" SET "isactive" = false WHERE "id" = '${id}' RETURNING *`;
    const result = await db.query(query);
    return result.rows[0];
  },
  login: async (email, password) => {
    try {
      const query = `SELECT * FROM "user" WHERE "email" = '${email}' AND "isactive" = true`;
      const result = await db.query(query);
      if (result.rowCount === 0) {
        return null;
      }

      const hashPassword = result.rows[0].password;
      const checkValid = await verifyPassword(password, hashPassword);
      if (!checkValid) {
        return null;
      }
      delete result.rows[0].password;
      return result.rows[0];
    } catch (e) {
      return null;
    }
  },
};

module.exports = user;
