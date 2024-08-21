const { faker } = require("@faker-js/faker");
const db = require('../../dbContext/databaseContext');
const readNew = Array(20).fill(null).map(() => ({
  title: faker.lorem.words( {min: 1, max: 2}),
  content: faker.word.words({count:10}),
  fullContent: faker.word.words({count:100})
}))


const fetchData = async ()=> {
  try  {
    const query = `INSERT INTO "readNew" ("title","content","fullContent") VALUES 
    ${readNew.map(item => `('${item.title}','${item.content}','${item.fullContent}')`).join(",")}`;
    await db.query(query);

  }catch(e) {
    console.log(e);
    
  }
  return null;
} 

fetchData();