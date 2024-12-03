const BlogsModel = require("../../models/BlogsModel");

const blogspostCotnroller = async (req, res) => {
  const { title, description, category, image } = req.body;

  try {
    const newBlogs = new BlogsModel({
      title,
      description,
      category,
      image,
    });
    const savedData = await newBlogs.save();
    res.status(201).json({ data: savedData });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

module.exports = {blogspostCotnroller}
