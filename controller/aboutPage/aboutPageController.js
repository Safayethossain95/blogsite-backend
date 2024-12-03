const AboutPageModel = require("../../models/AboutPageModel");
const CertificateImages = require("../../models/CertificateImagesModel");
const FactoryImages = require("../../models/FactoryImagesModel");
const BoardofDirectors = require("../../models/BoardOfDirectorsModel")
const aboutPageGet = async (req, res) => {
  try {
    const aboutPageData = await AboutPageModel.findOne();
    if (!aboutPageData) {
      return res.status(404).json({ message: "About Page data not found." });
    }
    res.status(200).json(aboutPageData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const aboutPagePost = async (req, res) => {
  const { aboutBanner, aboutUsDetails, factorySection, certificateSection } =
    req.body;

  try {
    // Update existing document or create a new one if none exists
    const aboutPageData = await AboutPageModel.findOneAndUpdate(
      {},
      {
        $set: {
          ...(aboutBanner && { aboutBanner }),
          ...(aboutUsDetails && { aboutUsDetails }),
          ...(factorySection && { factorySection }),
          ...(certificateSection && { certificateSection }),
          updatedAt: Date.now(),
        },
      },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({
        message: "About Page data upserted successfully",
        aboutPageData,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const factoryImagesGet = async (req, res) => {
  try {
    const data = await FactoryImages.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve partner brands" });
  }
};

const factoryImagesPost = async (req, res) => {
  try {
    const { img, isActive } = req.body;

    // Create a new partner brand document
    const newPartnerBrand = new FactoryImages({
      img,
      isActive: isActive ?? true, // default to true if not provided
    });

    const savedBrand = await newPartnerBrand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(500).json({ error: "Failed to create partner brand" });
  }
};
const factoryImagesEdit = async (req, res) => {
  const { id } = req.params;
  const { isActive, img } = req.body;

  try {
    // Find the banner by ID and update its fields
    const updatedBanner = await FactoryImages.findByIdAndUpdate(
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

const factoryImagesDelete = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the banner by ID and delete it
    const deleted = await FactoryImages.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Error deleting banner:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  certificate

const certificateImagesGet = async (req, res) => {
  try {
    const data = await CertificateImages.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve partner brands" });
  }
};

const certificateImagesPost = async (req, res) => {
  try {
    const { img, isActive } = req.body;

    // Create a new partner brand document
    const newPartnerBrand = new CertificateImages({
      img,
      isActive: isActive ?? true, // default to true if not provided
    });

    const savedBrand = await newPartnerBrand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(500).json({ error: "Failed to create partner brand" });
  }
};
const certificateImagesEdit = async (req, res) => {
  const { id } = req.params;
  const { isActive, img } = req.body;

  try {
    // Find the banner by ID and update its fields
    const updatedBanner = await CertificateImages.findByIdAndUpdate(
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

const certificateImagesDelete = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the banner by ID and delete it
    const deleted = await CertificateImages.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Error deleting banner:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const boardOfDirectorsPost = async (req, res) => {
  try {
    const { name, title, description, image, isActive } = req.body;
    const newMember = new BoardofDirectors({ name, title, description, image, isActive });
    
    const savedMember = await newMember.save();
    res.status(201).json({ message: 'Board member created successfully', data: savedMember });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create board member', error: error.message });
  }
};
const boardOfDirectorsGet = async (req, res) => {
  try {
    const members = await BoardofDirectors.find();
    res.status(200).json({ data: members });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch board members', error: error.message });
  }
};
const boardOfDirectorsEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, description, image, isActive } = req.body;

    const updatedMember = await BoardofDirectors.findByIdAndUpdate(
      id,
      { name, title, description, image, isActive },
      { new: true, runValidators: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: 'Board member not found' });
    }

    res.status(200).json({ message: 'Board member updated successfully', data: updatedMember });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update board member', error: error.message });
  }
};
const boardOfDirectorsDelete =  async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await BoardofDirectors.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ message: 'Board member not found' });
    }

    res.status(200).json({ message: 'Board member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete board member', error: error.message });
  }
};

module.exports = {
  aboutPageGet,
  aboutPagePost,
  factoryImagesGet,
  factoryImagesPost,
  factoryImagesEdit,
  factoryImagesDelete,
  certificateImagesGet,
  certificateImagesPost,
  certificateImagesEdit,
  certificateImagesDelete,
  boardOfDirectorsPost,
  boardOfDirectorsGet,
  boardOfDirectorsEdit,
  boardOfDirectorsDelete
};
