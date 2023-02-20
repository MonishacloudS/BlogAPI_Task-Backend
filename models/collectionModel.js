const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true });

// const Music = mongoose.model('Music', blogPostSchema);
// const Food = mongoose.model('Food', blogPostSchema);

// const newPost = new BlogPost({
//   title,
//   content,
//   category
// });

// switch (newPost.category) {
//   case 'Music':
//     const newMusicPost=new MusicPost(newPost);
//     newMusicPostPost.save();
//     break;
//   case 'Food':
//     const newFoodPost=new FoodPost(newPost);
//     newFPost.save();
//     break;
//   default:
//     newPost.save();
// }

    




module.exports = mongoose.model('Collection', collectionSchema)