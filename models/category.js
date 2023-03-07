module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("Article", { timestamp: false });
  const Category = sequelize.define(
    "Category",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
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
      tableName: "categories",
    }
  );
  Category.hasMany(Article, { foreignKey: "categoryId" });
  return Category;
};
