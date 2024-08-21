const {faker} = require('@faker-js/faker');
const db = require('../../dbContext/databaseContext');
const instagram = Array(12).fill(null).map(() => ({
  img: faker.image.url({width:276,height:334})
}))

const fetchData = async () => {
  try {
    const query = `INSERT INTO "ImgInstagram" ("img")
                  VALUES ${instagram.map(item => `('${item.img}')`).join(",")}`;
    await db.query(query);
  }catch(e) {
    console.log(e);
  }
}

fetchData();