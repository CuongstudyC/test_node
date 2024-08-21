const { faker } = require("@faker-js/faker");
const db = require("../../dbContext/databaseContext");
const product = Array(100).fill(null).map(() => ({
    isStatus: Math.random() < 0.5,
    img: [
      faker.image.url({ width: 276, height: 334 }),
      faker.image.url({ width: 276, height: 334 }),
      faker.image.url({ width: 276, height: 334 }),
      faker.image.url({ width: 276, height: 334 }),
    ],
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price({ min: 10, max: 100 })),
    oldPrice: Number(faker.commerce.price({ min: 10, max: 100 })),
  }));
  
const fetchData = async () => {
  const query = `INSERT INTO "product" ("isStatus","img","title","description","price","oldPrice") VALUES 
  ${product.map((item) =>`('${item.isStatus}', ARRAY[${item.img.map(url => `'${url.replace(/'/g, "''")}'`).join(',')}], '${item.title.replace(/'/g, "''")}', '${item.description.replace(/'/g, "''")}', '${item.price}', '${item.oldPrice}')`).join(",")}`;
  await db.query(query);

};

fetchData().catch((e) => console.log(e));
