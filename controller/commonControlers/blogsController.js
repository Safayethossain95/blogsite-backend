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
const blogsgetCotnroller = async (req, res) => {
  try {    
    const blogs = await BlogsModel.find();
    
    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found" });
    }
    
    res.status(200).json({ data: blogs });
  } catch (err) {    
    res.status(500).json({ message: err.message || "Server error" });
  }
};
const blogsupdateController =  async (req, res) => {
  const { id } = req.params; 
  const { title, description, category, image } = req.body; 

  try {    
    const updatedBlog = await BlogsModel.findByIdAndUpdate(
      id,
      { title, description, category, image },
      { new: true, runValidators: true } 
    );
    
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    res.status(200).json({ message: "Blog updated successfully", data: updatedBlog });
  } catch (err) {    
    res.status(500).json({ message: err.message || "Server error" });
  }
};

const blogsdeleteController = async (req, res) => {
  const { id } = req.params; 

  try {    
    const deletedBlog = await BlogsModel.findByIdAndDelete(id);
    
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    res.status(200).json({ message: "Blog deleted successfully", data: deletedBlog });
  } catch (err) {    
    res.status(500).json({ message: err.message || "Server error" });
  }
};


module.exports = {blogspostCotnroller,blogsgetCotnroller,blogsupdateController,blogsdeleteController}
