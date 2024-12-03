const Navbar = require('../../models/NavbarModel')
const navbarGetCotnroller = async (req, res) => {
    try {
      const data = await Navbar.find({})
      res.status(200).json({ data: data });
    } catch (err) {
      res.status(500).json({ message: err.message || "Server error" });
    }
  };

  const navbarPostCotnroller = async (req, res) => {
    try {
      const { menuId, menuName, url, sequence, parentMenuId, status, isActive, childNavbarVm } = req.body;
      
      // Create a new menu document with the provided data
      const newMenu = new Navbar({
        menuId,
        menuName,
        url,
        sequence,
        parentMenuId,
        status,
        isActive,
        // Ensure that the childNavbarVm is an array of child objects
        childNavbarVm: childNavbarVm.map(child => ({
          menuId: child.menuId,
          menuName: child.menuName,
          url: child.url,
          sequence: child.sequence,
          parentMenuId: child.parentMenuId,
          status: child.status,
          isActive: child.isActive
        }))
      });
  
      // Save the new menu to the database
      const savedMenu = await newMenu.save();
  
      // Respond with success and the saved menu item
      res.status(201).json({ message: 'Navbar Menu created successfully', data: savedMenu });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create menu', error: error.message });
    }
  };
  


  const navbarEditController = async (req, res) => {
    try {
      const { id } = req.params; // Assuming the menu ID is passed as a URL parameter
      const { menuId, menuName, url, sequence, parentMenuId, status, isActive,childNavbarVm } = req.body;
  
      // Find the existing menu item by ID and update it with the new data
      const updatedMenu = await Navbar.findByIdAndUpdate(
        id,
        {
          menuId,
          menuName,
          url,
          sequence,
          parentMenuId,
          status,
          isActive,
          childNavbarVm:childNavbarVm || []
        },
        { new: true, runValidators: true } // Return the updated document and run schema validators
      );
  
      // If the menu item was not found
      if (!updatedMenu) {
        return res.status(404).json({ message: 'Menu not found' });
      }
  
      // Respond with success and the updated menu item
      res.status(200).json({ message: 'Navbar Menu updated successfully', data: updatedMenu });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update menu', error: error.message });
    }
  };

  const navbarDeleteController = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the banner by ID and delete it
      const deleted = await Navbar.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ message: "Banner not found" });
      }
  
      res.status(200).json({ message: "Navbar deleted successfully" });
    } catch (err) {
      console.error("Error deleting banner:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  

  module.exports={
    navbarGetCotnroller,
    navbarPostCotnroller,
    navbarEditController,
    navbarDeleteController
  }