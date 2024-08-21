const { faker } = require("@faker-js/faker");
const db = require('../../dbContext/databaseContext');
const carousel = Array(20).fill(null).map(() => ({
  title: faker.lorem.words({ min: 2, max: 4 }),
  description: faker.word.words({ count: { min: 10, max: 15 } }),
  img: faker.image.url({ width: 1441, height: 600 }),
  buttonContent: faker.lorem.words({ min: 1, max: 1 })
}))

const fetchData = async () => {
  try {
    const query = `INSERT INTO "Carousel" ("title", "description", "img", "buttonContent")
                    VALUES ${carousel.map(item => `('${item.title}','${item.description}', '${item.img}', '${item.buttonContent}')`).join(",")}`;
    await db.query(query);
  }catch(e) {
    console.log(e);
    
  }
}

fetchData();