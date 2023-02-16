const router = require('express').Router();
const Collection = require("../models/collectionModel.js")

router.post("/", async (req, res) => {
    const newCollection = new Collection(req.body);
    try {
      const savedCollection = await newCollection.save();
      res.status(200).json(savedCollection);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get("/", async (req, res) => {
      try {
        const collections = await Collection.find();
        res.status(200).json(collections);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
  module.exports = router;