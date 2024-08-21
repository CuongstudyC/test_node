const cart = require("../dbContext/dataCart");

const express = require("express");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cart.findCartById(id);
    if (data) {
      return res.json(data);
    }
  } catch (e) {
    return res.status(500).send(e);
  }
  return res.status(404).send("Not found id cart");
});

router.post("/", async (req, res) => {
  try {
    const data = await cart.create(req.body);
    if (data) {
      return res.json(data);
    }
  } catch (e) {
    return res.status(500).send(e);
  }

  return res.status(417).send("something wrong");
});

router.put("/", async (req, res) => {
  try {
    const data = await cart.update(req.body);
    if (data) {
      return res.json(data);
    }
  } catch (e) {
    return res.status(500).send(e);
  }
  return res.status(417).send("User or Product Not Exist");
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await cart.deletebyId(id);
    if (data) {
      return res.json(data);
    }
  } catch (e) {
    return res.status(500).send(e);
  }
  return res.status(404).send(`Not Found that id: ${id}`);
});

router.get("/findProductByCart/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const data = await cart.findProductByCart(id);
    if(data) {
      return res.json(data);
    }
  }catch(e) {
    return res.status(500).send(e);
  }
  return res.status(404).send("Not Found");
})

router.delete("/:userId/:productId", async (req, res) => {
  try {
    const {userId, productId} = req.params;
    const data = await cart.deleteOneCart(userId,productId);
    if(data) {
      return res.json(data);
    }
  }catch(e) {
    return res.status(500).send(e);
  }
  return res.status(404).send("Not Found");
})

router.get("/totalPrice/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const data = await cart.TotalQuantity(id);
    if(data) {
      return res.json(data);
    }
  }catch(e) {
    return res.status(500).send(e);
  }
  return res.status(404).send("Not Found");
})

router.get("/detailCart/:userId/:productId", async (req, res) => {
  try {
    const {userId, productId} = req.params;
    const data = await cart.findDetailCart(userId,productId);
    if(data) {
      return res.json(data);
    }
  }catch(e) {
    return res.status(500).send(e);
  }
  return res.status(404).send("Not Found");
})

module.exports = router;
