module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      like_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },

      article_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      tableName: "Likes",
      underscored: true,
    }
  );

  Like.associate = function (models) {
    Like.belongsTo(models.User, { foreignKey: "user_id", as: "userid" });
    Like.belongsTo(models.Article, { foreignKey: "article_id", as: "article" });
  };
  return Like;
};
