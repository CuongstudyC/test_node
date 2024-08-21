const express = require("express");

const router = express.Router();

const dbProduct = require("../dbContext/dataProduct");

router.get("/search", async (req, res) => {
  try {
    const { name, sortBy, page, limit, isStatus, categoryId ,reverse } = req.query;
    const data = await dbProduct.AllFunction
    (
      {sort: sortBy, filterByTitle: name, page: page, limit: limit, isStatus: isStatus,categoryId: categoryId ,reverse: reverse}
    );

    return res.json(data);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await dbProduct.findAll();
    return res.json(data);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await dbProduct.findOneById(id);
    if (data) {
      return res.json(data);
    }
  } catch (e) {
    return res.status(500).send(e);
  }
  return res.status(404).send("Not Found That id product");
});

module.exports = router;
