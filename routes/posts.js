const router = require('express').Router();
const User = require('../models/userModel.js');
const Post = require('../models/postModel.js');
const { sendNotificationEmail } = require('../emailNotifications');
const MusicPost = require('../models/postModel.js');
const FoodPost = require('../models/postModel.js');
const TravelPost = require('../models/postModel.js');
const NaturePost = require('../models/postModel.js');
const LifestylePost = require('../models/postModel.js');

require('dotenv').config()


const requireAuth = require('../middleware/requireAuth.js')

const cloudinary = require('cloudinary').v2;




//require auth for all workout routes
router.use(requireAuth)


router.post('/', requireAuth, sendNotificationEmail, (req, res) => {
  const { title, content, category, image_url } = req.body;

  const newPost = new Post({
    title,
    content,
    category,
    image_url
  });


  

  cloudinary.config({
    cloud_name: 'dpmo7fx3t',
    api_key: '439417492472249',
    api_secret: 'KreRVe9rd3puz1bxaMvACoOTnCw'
  });

  cloudinary.uploader.upload(image_url, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
    }
  });

  switch (category) {
    case 'Music':
      const newMusicPost = new MusicPost(newPost);
      newMusicPost.save((err, post) => {
        if (err) {
          console.error(err);
          res.status(400).send('Error saving post');
        } else {
          res.status(201).json(post);
        }
      });
      break;
    case 'Food':
      const newFoodPost = new FoodPost(newPost);
      newFoodPost.save((err, post) => {
        if (err) {
          console.error(err);
          res.status(400).send('Error saving post');
        } else {
          res.status(201).json(post);
        }
      });
      break;
      case 'Travel':
      const newTravelPost = new TravelPost(newPost);
      newTravelPost.save((err, post) => {
        if (err) {
          console.error(err);
          res.status(400).send('Error saving post');
        } else {
          res.status(201).json(post);
        }
      });
      break;
      case 'Nature':
      const newNaturePost = new NaturePost(newPost);
      newNaturePost.save((err, post) => {
        if (err) {
          console.error(err);
          res.status(400).send('Error saving post');
        } else {
          res.status(201).json(post);
        }
      });
      break;
      case 'Lifestyle':
      const newLifePost = new LifestylePost(newPost);
      newLifePost.save((err, post) => {
        if (err) {
          console.error(err);
          res.status(400).send('Error saving post');
        } else {
          res.status(201).json(post);
        }
      });
      break;
    default:
      newPost.save((err, post) => {
        if (err) {
          console.error(err);
          res.status(400).send('Error saving post');
        } else {
          res.status(201).json(post);
        }
      });
      break;
      
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
    res.status(400).json(err);
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
    res.status(400).json(err);
  }
});

//GET POST
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
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
    res.status(400).json(err);
  }
});

module.exports = router;