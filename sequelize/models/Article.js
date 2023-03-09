module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "Article",
    {
      article_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
    },
    {
      tableName: "Articles",
      underscored: true,
    }
  );

  Article.associate = function (models) {
    Article.belongsTo(models.User, { foreignKey: "user_id", as: "author" });
  };

  return Article;
};
