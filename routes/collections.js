const router = require('express').Router();
const Collection = require("../models/collectionModel.js")
const Post = require('../models/postModel.js');

router.post("/", async (req, res) => {
    const newCollection = new Collection(req.body);
    try {
      const savedCollection = await newCollection.save();
      res.status(200).json(savedCollection);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // router.get("/", async (req, res) => {
  //     try {
  //       const collections = await Collection.find();
  //       res.status(200).json(collections);
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   });
  

  router.get('/', (req, res) => {
    const { category } = req.query;
  
    if (category) {
      Post.find({ category: category }, (err, posts) => {
        if (err) {
          console.error(err);
          res.status(400).send('Error fetching posts');
        } else {
          res.status(200).json(posts);
        }
      });
    } else {
      Post.find({}, (err, posts) => {
        if (err) {
          console.error(err);
          res.status(400).send('Error fetching posts');
        } else {
          res.status(200).json(posts);
        }
      });
    }
  });


  module.exports = router;