const db = require("../dbContext/databaseContext");

class Product {
  findAll = async () => {
    const query = `SELECT * FROM "product"`;
    const result = await db.query(query);
    return result.rows;
  };

  findOneById = async (id) => {
    const query = `SELECT * FROM "product" WHERE "id" = '${id}'`;
    const result = await db.query(query);
    return result.rows[0];
  };

  AllFunction = async ({ sort, filterByTitle, page, limit =0, isStatus,categoryId ,reverse = false }) => {
    const query = ` SELECT * FROM (
                    SELECT * FROM (
                    SELECT * FROM (
                    SELECT * FROM "product"
                    ${sort ? ` ORDER BY "${sort}" ${reverse ? 'DESC' : 'ASC'}` : 
                      `ORDER BY "id" ${reverse ? 'DESC' : 'ASC'}`
                    }
                    ) AS sorted_products
                    ${isStatus ? ` WHERE "isStatus" = ${isStatus}`: ''}
                    ) AS sort_status_products
                    ${filterByTitle  ? ` WHERE "title" ILIKE '%${filterByTitle}%'`: ''} 
                    ) AS filter_products
                    ${categoryId ? ` WHERE "categoryId" = '${categoryId}'`: ''}
                    ${page ? ` OFFSET ${(page -1) * limit}`: ''} 
                    ${limit && limit !== 0 ? `LIMIT ${limit}` : ''}`;
    const result = await db.query(query);
    return result.rows;
  };
}

module.exports = new Product();
