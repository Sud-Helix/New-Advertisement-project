const Category = require("../models/categoryModel");

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find({});
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      // if user has role = 1 ---> admin
      // only admin can create delete update

      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: "this category already exist" });

      const newCategory = new Category({ name });

      await newCategory.save();

      res.json({ msg: "Created a Category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      return res.json({ msg: "Deleted a Category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: "Updated a Category " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryController;
