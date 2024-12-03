const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogsModelSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },

    
  });

  const BlogsModel = mongoose.model('Blogs', blogsModelSchema);

module.exports = BlogsModel;