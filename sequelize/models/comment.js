module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },

      article_id: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
    },
    {
      tableName: "Comments",
      underscored: true,
    }
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: "user_id", as: "userid" });
    Comment.belongsTo(models.Article, {
      foreignKey: "article_id",
      as: "article",
    });
  };

  return Comment;
};
