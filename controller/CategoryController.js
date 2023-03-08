const { Category } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const categories = await Category.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  show: async (req, res) => {
    try {
      const category = await Category.findOne({
        where: {
          id: req.params.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  store: async (req, res) => {
    try {
      const category = await Category.create(req.body);
      res.json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const categoryFound = await Category.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!categoryFound) {
        return res.status(404).json({ message: "Category not found" });
      }
      const category = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.json({ message: "Category updated" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  destroy: async (req, res) => {
    try {
      const categoryFound = await Category.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!categoryFound) {
        return res.status(404).json({ message: "Category not found" });
      }
      const category = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.json({ message: "Category deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
