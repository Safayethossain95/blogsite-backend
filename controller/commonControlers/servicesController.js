const ServicesModel = require("../../models/ServicesModel"); // Adjust the path accordingly

// Create a new service entry
const servicesPostController = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newService = new ServicesModel({ title, description});
    const savedService = await newService.save();
    res.status(201).json({ data: savedService });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Retrieve all service entries
const servicesGetController = async (req, res) => {
  try {
    const services = await ServicesModel.find();

    

    res.status(200).json({ data: services });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Update a service entry by ID
const servicesUpdateController = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedService = await ServicesModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res
      .status(200)
      .json({ message: "Service updated successfully", data: updatedService });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Delete a service entry by ID
const servicesDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedService = await ServicesModel.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res
      .status(200)
      .json({ message: "Service deleted successfully", data: deletedService });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

module.exports = {
  servicesPostController,
  servicesGetController,
  servicesUpdateController,
  servicesDeleteController,
};
