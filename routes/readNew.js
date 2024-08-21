const express = require('express');

const router = express.Router();
const db = require('../dbContext/databaseContext');

router.get('/',async (req, res) => {
  try {
    const query = `SELECT * FROM "readNew"`;
    const result = await db.query(query);
    if(result) {
      return res.json(result.rows);
    }
  }catch(e) {
    return res.status(500).send(e);
  }
  return res.status(404).send("Empty ReadNew");
})


module.exports = router;