const Banner = require("../models/BannerModel");
const ContactModel = require('../models/ContactModel');
const CoursePost = require("../models/CoursePostNew");
const Faq = require("../models/FAQModel");
const Features = require("../models/FeaturesBarModel");
const IndustryCard = require("../models/IndustryCardsModel");
const PartnerBrands = require("../models/PartnerBrandsModel");
const Whyferrytech = require("../models/WhyFerrytechModel");
const Product = require("../models/ProductModel");
const mongoose = require("mongoose");
const IntroModel = require("../models/IntroCompModel");
const ProductLineModel = require("../models/ProductLineModel");
const bannerCotnroller = async (req, res) => {
  try {
    const data = await Banner.find({});
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
const banneractiveCotnroller = async (req, res) => {
  try {
    const data = await Banner.findOne({ isActive: true });
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
const bannergetbyidCotnroller = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Banner.findById({ _id: id });
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
const bannerpostCotnroller = async (req, res) => {
  const { isActive, smtext, bigtext, imgurl } = req.body;

  try {
    const newBanner = new Banner({
      isActive,
      smtext,
      bigtext,
      imgurl,
    });
    const savedBanner = await newBanner.save();
    res.status(201).json({ data: savedBanner });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

const bannerDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the banner by ID and delete it
    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Error deleting banner:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const bannerEditController = async (req, res) => {
  const { id } = req.params;
  const { isActive, smtext, bigtext, imgurl } = req.body;

  try {
    // Find the banner by ID and update its fields
    const updatedBanner = await Banner.findByIdAndUpdate(
      id,
      { isActive, smtext, bigtext, imgurl },
      { new: true } // Return the updated document
    );

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ data: updatedBanner });
  } catch (err) {
    console.error("Error updating banner:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const intropostCotnroller = async (req, res) => {
  const { isActive, heading, para1, para2 } = req.body;

  try {
    const newBanner = new IntroModel({
      isActive,
      heading,
      para1,
      para2,
    });
    const savedBanner = await newBanner.save();
    res.status(201).json({ data: savedBanner });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
const introeditCotnroller = async (req, res) => {
  const { id } = req.params; // Get id from URL parameters
  const { isActive, heading, para1, para2 } = req.body; // Get updated data from the request body

  try {
    const updatedBanner = await IntroModel.findByIdAndUpdate(
      id,
      { isActive, heading, para1, para2 },
      { new: true, runValidators: true } // Return the updated document and validate fields
    );

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ data: updatedBanner });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

const introgetCotnroller = async (req, res) => {
  try {
    const data = await IntroModel.find({});
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
const introgetById = async (req, res) => {
  const { id } = req.params;
  try {
    const partnerBrands = await IntroModel.findById({ _id: id });
    res.status(200).json(partnerBrands);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve partner brands" });
  }
};
const introdeleteById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the banner by ID and delete it
    const deleted = await IntroModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Error deleting banner:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const productlinepostCotnroller = async (req, res) => {
  const { isActive, productname, details, img } = req.body;

  try {
    const newBanner = new ProductLineModel({
      isActive,
      productname,
      details,
      img,
    });
    const savedBanner = await newBanner.save();
    res.status(201).json({ data: savedBanner });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
const productlineGetAllCotnroller = async (req, res) => {
  try {
    // Retrieve all course posts from the database
    const productline = await ProductLineModel.find();

    // Send the retrieved courses as a response
    res.status(200).send({ success: true, data: productline });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(400).send({ success: false, msg: error.message });
  }
};
const productlineDeleteByIdCotnroller = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the banner by ID and delete it
    const deleted = await ProductLineModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Error deleting banner:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const productlinegetById = async (req, res) => {
  const { id } = req.params;
  try {
    const partnerBrands = await ProductLineModel.findById({ _id: id });
    res.status(200).json(partnerBrands);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve partner brands" });
  }
};
const productlineeditCotnroller = async (req, res) => {
  const { id } = req.params; // Get id from URL parameters
  const { isActive, productname, details, img  } = req.body; // Get updated data from the request body

  try {
    const updatedBanner = await ProductLineModel.findByIdAndUpdate(
      id,
      { isActive, productname, details, img  },
      { new: true, runValidators: true } // Return the updated document and validate fields
    );

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ data: updatedBanner });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
const industryGetCotnroller = async (req, res) => {
  try {
    const data = await IndustryCard.find({});
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
const getPartnerBrands = async (req, res) => {
  try {
    const partnerBrands = await PartnerBrands.find();
    res.status(200).json(partnerBrands);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve partner brands" });
  }
};
const getPartnerBrandsById = async (req, res) => {
  const { id } = req.params;
  try {
    const partnerBrands = await PartnerBrands.findById({ _id: id });
    res.status(200).json(partnerBrands);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve partner brands" });
  }
};
const partnerBrandsEdit = async (req, res) => {
  const { id } = req.params;
  const { isActive, img } = req.body;

  try {
    // Find the banner by ID and update its fields
    const updatedBanner = await PartnerBrands.findByIdAndUpdate(
      id,
      { isActive, img },
      { new: true } // Return the updated document
    );

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ data: updatedBanner });
  } catch (err) {
    console.error("Error updating banner:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const createPartnerBrand = async (req, res) => {
  try {
    const { img, isActive } = req.body;

    // Create a new partner brand document
    const newPartnerBrand = new PartnerBrands({
      img,
      isActive: isActive ?? true, // default to true if not provided
    });

    const savedBrand = await newPartnerBrand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(500).json({ error: "Failed to create partner brand" });
  }
};

const partnerBrandDelete = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the banner by ID and delete it
    const deleted = await PartnerBrands.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Error deleting banner:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const whyFerrytechGet = async (req, res) => {
  try {
    const whyFerrytech = await Whyferrytech.find();
    res.status(200).json(whyFerrytech);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve partner brands" });
  }
};
const whyFerrytechPost = async (req, res) => {
  try {
    const {heading, paragraph, img, isActive } = req.body;

    // Create a new partner brand document
    const newWhyferrytech = new Whyferrytech({
      
      heading,
      paragraph,
      img,
      isActive: isActive ?? true, // default to true if not provided
    });

    const savedWhyferrytech = await newWhyferrytech.save();
    res.status(201).json(savedWhyferrytech);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Why ferrytech" });
  }
};
const whyFerrytechDelete = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the banner by ID and delete it
    const deleted = await Whyferrytech.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "whyferrytech not found" });
    }

    res.status(200).json({ message: "why ferrytech deleted successfully" });
  } catch (err) {
    console.error("Error deleting banner:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const whyferrytechgetbyidCotnroller = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Whyferrytech.findById({ _id: id });
    res.status(200).json( data );
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
const whyferrytechEditController = async (req, res) => {
  const { id } = req.params;
  const { isActive,  heading,
    paragraph,
    img } = req.body;

  try {
    // Find the banner by ID and update its fields
    const updated = await Whyferrytech.findByIdAndUpdate(
      id,
      { heading,
        paragraph,
        img,
        isActive },
      { new: true } // Return the updated document
    );

    if (!updated) {
      return res.status(404).json({ message: "whyferrytech not found" });
    }

    res.status(200).json( updated );
  } catch (err) {
    console.error("Error updating whyferrytech:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const createIndustryCard = async (req, res) => {
  try {
    // Destructure fields from request body
    const { isActive, id, heading, imgurl } = req.body;

    // Create a new IndustryCard instance
    const newIndustryCard = new IndustryCard({
      isActive,
      id,
      heading,
      imgurl,
    });

    // Save the new IndustryCard to the database
    const savedIndustryCard = await newIndustryCard.save();

    // Send a success response
    res.status(201).json({
      message: "IndustryCard created successfully",
      data: savedIndustryCard,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "Failed to create IndustryCard",
      error: error.message,
    });
  }
};
const IndustryCardedit = async (req, res) => {
  try {
    // Destructure fields from request body
    const { isActive, heading, imgurl } = req.body;
    const { id } = req.params;

    // Find the IndustryCard by id and update with new data
    const updatedIndustryCard = await IndustryCard.findByIdAndUpdate(
      id,
      { isActive, heading, imgurl },
      { new: true } // Return the updated document
    );

    // Check if the IndustryCard was found and updated
    if (!updatedIndustryCard) {
      return res.status(404).json({
        message: "IndustryCard not found",
      });
    }

    // Send a success response with updated data
    res.status(200).json({
      message: "IndustryCard updated successfully",
      data: updatedIndustryCard,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "Failed to update IndustryCard",
      error: error.message,
    });
  }
};
const IndustryCardByIDget = async (req, res) => {
  try {
    // Extract the id from the request parameters
    const { id } = req.params;

    // Find the IndustryCard by id
    const industryCard = await IndustryCard.findById(id);

    // Check if the IndustryCard was found
    if (!industryCard) {
      return res.status(404).json({
        message: "IndustryCard not found",
      });
    }

    // Send a success response with the found data
    res.status(200).json({
      message: "IndustryCard retrieved successfully",
      data: industryCard,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "Failed to retrieve IndustryCard",
      error: error.message,
    });
  }
};
const industrycarddeletebyid = async (req, res) => {
  try {
    // Extract the id from the request parameters
    const { id } = req.params;

    // Find the IndustryCard by id and delete it
    const deletedIndustryCard = await IndustryCard.findByIdAndDelete(id);

    // Check if the IndustryCard was found and deleted
    if (!deletedIndustryCard) {
      return res.status(404).json({
        message: "IndustryCard not found",
      });
    }

    // Send a success response
    res.status(200).json({
      message: "IndustryCard deleted successfully",
      data: deletedIndustryCard,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "Failed to delete IndustryCard",
      error: error.message,
    });
  }
};

const featuresBargetCotroller = async (req, res) => {
  try {
    const data = await Features.find({});
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
let ser = 1;
const featurepostCotnroller = async (req, res) => {
  const { isActive, mainImg, text } = req.body;

  try {
    // Check if there's existing data
    try {
      const lastRecord = await Features.findOne()
        .sort({ createdAt: -1 })
        .exec();
      console.log("Last record:", lastRecord);
      ser += lastRecord.serial;
    } catch (err) {
      console.error(err);
    }

    const newBanner = new Features({
      serial: ser,
      isActive,
      mainImg,
      text,
    });

    const savedBanner = await newBanner.save();

    res.status(201).json({ data: savedBanner });

    // }
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

const featuresGetAll = async (req, res) => {
  try {
    // Retrieve all course posts from the database
    const courses = await Features.find();

    // Send the retrieved courses as a response
    res.status(200).send({ success: true, data: courses });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(400).send({ success: false, msg: error.message });
  }
};

const featuregetbyidCotnroller = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Features.findById({ _id: id });
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
const featureDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the banner by ID and delete it
    const deletedBanner = await Features.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Error deleting banner:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const featureEditController = async (req, res) => {
  const { id } = req.params;
  const { isActive, mainImg, text } = req.body;

  try {
    // Find the banner by ID and update its fields
    const data = await Features.findById({ _id: id });
    const updatedBanner = await Features.findByIdAndUpdate(id, {
      serial: data.serial,
      isActive,
      mainImg,
      text,
    });

    if (!updatedBanner) {
      return res.status(404).json({ message: "Feature not found" });
    }

    res.status(200).json({ data: updatedBanner });
  } catch (err) {
    console.error("Error updating feature:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const updateFeatureStatusController = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    // Update isActive for the Banner with the provided id
    const updatedBanner = await Features.findByIdAndUpdate(
      id,
      { isActive },
      { new: true } // Return the updated document
    );

    res.status(200).json({ data: updatedBanner });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const reviewsGetController = async (req, res) => {
  try {
    // Retrieve all course posts from the database
    const courses = await CoursePost.find();
    const allReviews = courses.flatMap((course) => course.reviews);

    console.log(allReviews);
    // Send the retrieved courses as a response
    res.status(200).send({ success: true, data: allReviews });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(400).send({ success: false, msg: error.message });
  }
};

const faqpostCotnroller = async (req, res) => {
  const { isActive, heading, details } = req.body;

  try {
    // Check if there's existing data

    const newFAQ = new Faq({
      isActive,
      heading,
      details,
    });

    const savedFAQ = await newFAQ.save();

    res.status(201).json({ data: savedFAQ });

    // }
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
const faqGetAllControler = async (req, res) => {
  try {
    // Retrieve all course posts from the database
    const faqvar = await Faq.find();

    // Send the retrieved courses as a response
    res.status(200).send({ success: true, data: faqvar });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(400).send({ success: false, msg: error.message });
  }
};
const faqDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the banner by ID and delete it
    const deletedFaq = await Faq.findByIdAndDelete(id);

    if (!deletedFaq) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Error deleting banner:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const faqgetbyidCotnroller = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Faq.findById({ _id: id });
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
const faqEditController = async (req, res) => {
  const { id } = req.params;
  const { isActive, heading, details } = req.body;

  try {
    // Find the banner by ID and update its fields

    const updatedBanner = await Faq.findByIdAndUpdate(
      id,
      {
        isActive,
        heading,
        details,
      },
      { new: true }
    );

    if (!updatedBanner) {
      return res.status(404).json({ message: "Feature not found" });
    }

    res.status(200).json({ data: updatedBanner });
  } catch (err) {
    console.error("Error updating feature:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Create a new contact
const contactPostController = async (req, res) => {
  const { location, contactnumber, email } = req.body;

  try {
    // Create a new Contact document
    const newContact = new ContactModel({
      location,
      contactnumber,
      email,
    });

    // Save the contact to the database
    const savedContact = await newContact.save();
    res.status(201).json({ success: true, data: savedContact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};

// Get all contacts
const contactGetAllController = async (req, res) => {
  try {
    // Retrieve all contacts
    const contacts = await ContactModel.find();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get contact by ID
const contactGetByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    // Find contact by ID
    const contact = await ContactModel.findById(id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};

// Update contact by ID
const contactEditController = async (req, res) => {
  const { id } = req.params;
  const { location, contactnumber, email } = req.body;

  try {
    // Find and update contact by ID
    const updatedContact = await ContactModel.findByIdAndUpdate(
      id,
      { location, contactnumber, email },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({ success: true, data: updatedContact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};

// Delete contact by ID
const contactDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete contact by ID
    const deletedContact = await ContactModel.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({ success: true, message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};



const updateFaqStatusController = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    // Update isActive for the Banner with the provided id
    const updatedBanner = await Faq.findByIdAndUpdate(
      id,
      { isActive },
      { new: true } // Return the updated document
    );

    res.status(200).json({ data: updatedBanner });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const productGetCotnroller = async (req, res) => {
  try {
    // Retrieve all course posts from the database
    const productvar = await Product.find();

    // Send the retrieved courses as a response
    res.status(200).send({ success: true, data: productvar });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(400).send({ success: false, msg: error.message });
  }
};
const productPostController = async (req, res) => {
  const { catname, heading, para, card,bannerbg, bannerheading } = req.body;

  // Validation to ensure required fields are present
  if (!catname || !heading || !para || !card || !bannerbg ||!bannerheading || !Array.isArray(card)) {
    return res
      .status(400)
      .json({
        message: "All fields are required and 'card' must be an array.",
      });
  }

  try {
    // Create a new product category with the provided data
    const newProductCategory = new Product({
      catname,
      heading,
      para,
      card,
      bannerbg,
      bannerheading 
    });

    // Save the new product category to the database
    await newProductCategory.save();

    // Send a success response with the saved data
    res.status(201).json({
      message: "Product category added successfully",
      productCategory: newProductCategory,
    });
  } catch (error) {
    console.error("Error adding product category:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const productDeleteController = async (req, res) => {
  const { productid } = req.params; // ID of the product to delete

  try {
    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(productid);

    // Check if the product exists
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return success response
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const productEditController = async (req, res) => {
  const categoryid = req.params.categoryid; // Example: "spiderCrane"
  const newValues = req.body; // New values to update

  try {
    // Find the product document by category and update it with new values
    const objectId = new mongoose.Types.ObjectId(categoryid);

    // Find the product document by category id and update it with new values
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: objectId }, // Search filter to find the document by category id
      { $set: newValues }, // Update data with new values
      { new: true, runValidators: true } // Options: return the updated document and run validation
    );

    // Check if the category exists
    if (!updatedProduct) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Respond with the updated category
    res.status(200).json({
      message: "Category updated successfully",
      updatedCategory: updatedProduct, // Return the full updated document
    });
  } catch (err) {
    // Handle errors (validation errors, server errors, etc.)
    res.status(500).json({ message: err.message || "Server error" });
  }
};
const productEditByIdController = async (req, res) => {
  const { id } = req.params; // Extract the ID from URL parameters
  const updateData = req.body; // Data to update from the request body

  try {
    // Find the product by ID and update it with the new data
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the update follows schema validation rules
    });

    // Handle case when product is not found
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with the updated product
    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    // Handle errors, such as invalid ID or database issues
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }

};

module.exports = {
  bannerCotnroller,
  bannerpostCotnroller,
  bannerDeleteController,
  bannerEditController,
  bannergetbyidCotnroller,
  banneractiveCotnroller,
  introgetCotnroller,
  intropostCotnroller,
  introeditCotnroller,
  introdeleteById,
  introgetById,
  productGetCotnroller,
  productEditByIdController,
  productPostController,
  productEditController,
  productDeleteController,
  industryGetCotnroller,
  industrycarddeletebyid,
  IndustryCardedit,
  IndustryCardByIDget,
  productlinepostCotnroller,
  productlineGetAllCotnroller,
  productlineDeleteByIdCotnroller,
productlinegetById,
productlineeditCotnroller,
whyFerrytechDelete,
whyferrytechgetbyidCotnroller,
whyferrytechEditController,
  getPartnerBrandsById,
  createIndustryCard,
  createPartnerBrand,
  getPartnerBrands,
  partnerBrandsEdit,
  partnerBrandDelete,
  whyFerrytechGet,
  whyFerrytechPost,
  featuresBargetCotroller,
  featurepostCotnroller,
  featuregetbyidCotnroller,
  featureDeleteController,
  featureEditController,
  updateFeatureStatusController,
  reviewsGetController,
  featuresGetAll,
  faqpostCotnroller,
  faqGetAllControler,
  faqDeleteController,
  faqgetbyidCotnroller,
  faqEditController,
  updateFaqStatusController,
  contactPostController,
  contactGetAllController,
  contactGetByIdController,
  contactEditController,
  contactDeleteController,
};
