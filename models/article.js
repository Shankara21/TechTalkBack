module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", { timestamp: false });
  const Category = sequelize.define("Category", { timestamp: false });
  const Article = sequelize.define(
    "Article",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING,
      },
      infografis: {
        type: DataTypes.STRING,
      },
      cover: {
        type: DataTypes.STRING,
      },
      desc: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "articles",
    }
  );
  Article.belongsTo(User, { foreignKey: "userId" });
  Article.belongsTo(Category, { foreignKey: "categoryId" });
  return Article;
};
