const db = require('../dbContext/databaseContext');


class Cart {
  findCartById = async (id) => {
    const query = `SELECT * FROM "cart" WHERE "userId" = '${id}'`;
    const result = await db.query(query);
    return result.rows;
  }

  findDetailCart = async (userId, productId) => {
    const query = `SELECT * FROM "cart" WHERE "userId" = '${userId}' AND "productId" = ${productId}`;
    const result = await db.query(query);
    return result.rows[0];
  }
  
  create = async (body) => {
    const {userId, productId} = body;
    const query = `INSERT INTO "cart" ("userId","productId","quantity") VALUES ('${userId}','${productId}','1') RETURNING *`;
    const result = await db.query(query);
    return result.rows[0];
  }

  update = async (body) => {
    const {userId, productId, quantity} = body;
    const query = `UPDATE "cart" SET "quantity" = '${quantity}' WHERE "userId" = '${userId}' AND "productId" = '${productId}' RETURNING *`;
    const result = await db.query(query);
    return result.rows[0];
  }
  deletebyId = async (id) => {
    const query = `DELETE FROM "cart" WHERE "userId" = ${id} RETURNING *`;
    const result = await db.query(query);
    return result.rows;
  }

  findProductByCart = async (id) => {
    const query = `SELECT p.*, c."quantity" FROM
                  "product" p JOIN "cart" c ON p."id" = c."productId"
                  WHERE c."userId" = '${id}'`;
    const result = await db.query(query);
    return result.rows; 
  } 

  deleteOneCart = async (userId, productId) => {
    const query = `DELETE FROM "cart" WHERE "userId" = '${userId}' AND "productId" = '${productId}' RETURNING *`;
    const result = await db.query(query);
    return result.rows[0];
  }

  TotalQuantity = async (userId) => {
    const query = `SELECT SUM("quantity") FROM "cart" WHERE "userId" = '${userId}'`;
    const result = await db.query(query);
    return result.rows[0];
  }
}

module.exports = new Cart();