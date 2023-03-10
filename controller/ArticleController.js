const { Article, Category, User } = require("../models");
const fs = require("fs");

module.exports = {
  index: async (req, res) => {
    try {
      const articles = await Article.findAll({
        attributes: {
          exclude: ["updatedAt"],
        },
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["updatedAt"],
            },
          },
          {
            model: User,
            attributes: ["username", "fullname", "email"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      res.json(articles);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  show: async (req, res) => {
    const { title } = req.params;
    try {
      const article = await Article.findOne({
        where: {
          title: title,
        },
        attributes: {
          exclude: ["updatedAt"],
        },
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["updatedAt"],
            },
          },
          {
            model: User,
            attributes: ["username", "fullname", "email"],
          },
        ],
      });
      res.json(article);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  store: async (req, res) => {
    try {
      const article = await Article.create({
        title: req.body.title,
        cover: `/uploads/${req.files.cover[0].filename}`,
        infografis: `/uploads/${req.files.infografis[0].filename}`,
        content: req.body.content,
        categoryId: req.body.categoryId,
        userId: req.body.userId,
        desc: req.body.desc,
      });
      res.status(201).json(article);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const articleFound = await Article.findOne({
        where: {
          id: id,
        },
      });
      // res.json(id)
      const coverPath = `public${articleFound.cover}`;
      const infografisPath = `public${articleFound.infografis}`;

      if (fs.existsSync(coverPath)) {
        fs.unlinkSync(coverPath);
      }
      if (fs.existsSync(infografisPath)) {
        fs.unlinkSync(infografisPath);
      }

      const article = await Article.update(
        {
          title: req.body.title,
          cover: `/uploads/${req.files.cover[0].filename}`,
          infografis: `/uploads/${req.files.infografis[0].filename}`,
          content: req.body.content,
          categoryId: req.body.categoryId,
          userId: req.body.userId,
          desc: req.body.desc,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(201).json(article);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const articleFound = await Article.findOne({
        where: {
          id: id,
        },
      });
      const coverPath = `public${articleFound.cover}`;
      const infografisPath = `public${articleFound.infografis}`;

      if (fs.existsSync(coverPath)) {
        fs.unlinkSync(coverPath);
      }
      if (fs.existsSync(infografisPath)) {
        fs.unlinkSync(infografisPath);
      }

      const article = await Article.destroy({
        where: {
          id: id,
        },
      });
      res.status(201).json({ message: "Article deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  filterByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const articles = await Article.findAll({
        attributes: {
          exclude: ["updatedAt"],
        },
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["updatedAt"],
            },
            where: {
              name: category,
            },
          },
          {
            model: User,
            attributes: ["username", "fullname", "email"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      res.json(articles);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
