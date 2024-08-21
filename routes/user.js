const express = require("express");
const router = express.Router();
const dataUser = require("../dbContext/dataUser");
const jwt = require("jsonwebtoken");
const { key } = require("../Config/config");

router.get("/me", async (req, res) => {
  try {
    const token = req.auth;
    if (token) {
      const { id } = token;
      const data = await dataUser.findOne(id);
      if (data) {
        return res.json(data);
      }
    }
  } catch (e) {
    return res.status(404).send(e);
  }
  return res.status(404).send("NOT FOUND OR TOKEN EXPIRES");
});

router.get("/", async (req, res) => {
  try {
    const token = req.auth;
    if (!token) {
      return res.status(404).send("NOT FOUND THAT USER");
    }
    const { id } = token;
    const findOne = await dataUser.findOne(id);
    const { isAdmin } = findOne;
    if (!isAdmin) {
      return res.status(403).send("NOT YOUR ROLE");
    }

    const data = await dataUser.findAll();
    if (data) {
      return res.json(data);
    }
  } catch (e) {
    return res.status(400).send(e);
  }
  return res.status(404).send("NOT FOUND THAT USER");
});

router.get("/:id", async (req, res) => {
  try {
    const token = req.auth;
    if (!token) {
      return res.status(404).send("Cant find token");
    }

    const findUser = await dataUser.findOne(token.id);
    const { isAdmin } = findUser;
    if (!isAdmin) {
      return res.status(403).send("NOT YOUR ROLE");
    }

    const { id } = req.params;
    const data = await dataUser.findOne(id);
    if (data) {
      return res.json(data);
    }
  } catch (e) {
    return res.status(400).send(e);
  }
  return res.status(404).send("NOT FOUND THAT USER");
});

router.post("/create", async (req, res) => {
  try {
    const data = await dataUser.create(req.body);
    return res.json(data);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

router.patch("/", async (req, res) => {
  try {
    const token = req.auth;
    if (!token) {
      return res.status(404).send("Cant find token");
    }

    const { id } = token;
    const findUser = await dataUser.findOne(id);
    const { isAdmin } = findUser;
    if (!isAdmin) {
      return res.status(403).send("NOT YOUR ROLE");
    }

    const data = await dataUser.update(req.body);
    return res.json(data);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const token = req.auth;
    if (!token) {
      return res.status(404).send("Cant find token");
    }

    const { id } = token;
    if (id === Number(req.params.id)) {
      return res.status(500).send("Cant delete yourself");
    }

    const findUser = await dataUser.findOne(id);
    const { isAdmin } = findUser;
    if (!isAdmin) {
      return res.status(403).send("NOT YOUR ROLE");
    }
    const findAnotherUser = await dataUser.findOne(req.params.id);
    if (!findAnotherUser) {
      return res.status(404).send("USER NOT EXIST");
    }

    const data = await dataUser.delete(req.params.id);
    return res.json(data);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await dataUser.login(email, password);
    if (data) {
      const token = jwt.sign({ id: data.id }, key, {algorithm: "HS256",expiresIn: "1h"});
      data.token = token;
      return res.json(data);
    }
  } catch (e) {
    return res.status(400).send(e);
  }
  return res.status(404).send("NOT FOUND THAT USER");
});

module.exports = router;
