const TeamsModel = require("../../models/TeamsModel"); 


const teamsPostController = async (req, res) => {
  const { name, title, description, image } = req.body;

  try {
    const newTeam = new TeamsModel({
      name,
      title,
      description,
      image,
    });
    const savedData = await newTeam.save();
    res.status(201).json({ data: savedData });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Retrieve all team entries
const teamsGetController = async (req, res) => {
  try {
    const teams = await TeamsModel.find();
    
   
    
    res.status(200).json({ data: teams });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Update a team entry by ID
const teamsUpdateController = async (req, res) => {
  const { id } = req.params;
  const { name, title, description, image } = req.body;

  try {
    const updatedTeam = await TeamsModel.findByIdAndUpdate(
      id,
      { name, title, description, image },
      { new: true, runValidators: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team updated successfully", data: updatedTeam });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Delete a team entry by ID
const teamsDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeam = await TeamsModel.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team deleted successfully", data: deletedTeam });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

module.exports = {
  teamsPostController,
  teamsGetController,
  teamsUpdateController,
  teamsDeleteController
};
