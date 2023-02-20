const router = require('express').Router();
const User = require('../models/userModel.js');
const Post = require('../models/postModel.js');
const { sendNotificationEmail } = require('../emailNotifications')

const requireAuth = require('../middleware/requireAuth.js')

//require auth for all workout routes
router.use(requireAuth)


router.post('/', (req, res) => {
  const { title, content, category } = req.body;
 
  const newPost = new BlogPost({
    title,
    content,
    category
  });

  switch (category) {
    case 'Music':
      const newMusicPost = new MusicPost(newPost);
      newMusicPost.save((err, post) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error saving post');
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
          res.status(500).send('Error saving post');
        } else {
          res.status(201).json(post);
        }
      });
      break;
    default:
      newPost.save((err, post) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error saving post');
        } else {
          res.status(201).json(post);
        }
      });
      break;
  }
});

module.exports = router;