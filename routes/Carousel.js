const express = require('express');
const db = require('../dbContext/databaseContext');
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query = `SELECT * FROM "Carousel"`;
    const result = await db.query(query);
    if(result) {
      return res.json(result.rows);
    }
  }catch(e) {
    return res.status(500).send(e);
  }

  return res.status(404).send("Empty Carousel");
})


module.exports = router;