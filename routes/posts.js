const router = require('express').Router();
const User = require('../models/userModel.js');
const Post = require('../models/postModel.js');
const { sendNotificationEmail } = require('../emailNotifications')

const requireAuth = require('../middleware/requireAuth.js')

//require auth for all workout routes
router.use(requireAuth)

//CREATE POST
router.post("/", requireAuth, async (req, res) => {
  const { title, content, category } = req.body;
  const newPost = new Post({
    title,
    content,
    category
  });
  // const newPost = new Post(req.body);

    try {
      // const savedPost = await newPost.save();
      switch (category){
        case 'food':
          const newFoodPost=new FoodPost(newPost);
      newFoodPost.save();
         break;
         default:
         newPost.save();
      }
      

      res.status(200).json({ newFoodPost, sendNotificationEmail });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  //UPDATE POST
  router.put("/:id", requireAuth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE POST
  router.delete("/:id", requireAuth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          await post.delete();
          res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET POST
  router.get("/:id", requireAuth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL POSTS
  router.get("/", requireAuth, async (req, res) => {
    const username = req.query.user;
    const colName = req.query.col;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (colName) {
        posts = await Post.find({
          collections: {
            $in: [colName],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
