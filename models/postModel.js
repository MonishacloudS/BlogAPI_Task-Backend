const mongoose = require('mongoose');

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    


}, { timestamps: true });



module.exports = mongoose.model('Post', postSchema);
module.exports = mongoose.model('MusicPost', postSchema);
module.exports = mongoose.model('FoodPost', postSchema);
module.exports = mongoose.model('TravelPost', postSchema);
module.exports = mongoose.model('NaturePost', postSchema);
module.exports = mongoose.model('LifestylePost', postSchema);
