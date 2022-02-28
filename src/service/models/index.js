"use strict";

const {Model} = require(`sequelize`);
const Aliase = require(`./aliase`);

const deineArticle = require(`./article`);
const deineCategory = require(`./category`);
const deineComment = require(`./comment`);
const deinePhoto = require(`./photo`);
const deineUser = require(`./user`);
const defineToken = require(`./token`);
const defuneRole = require(`./roles`);

const ForeignKey = {
  ARTICLE: `articleId`,
  CATEGORY: `categoryId`,
  PHOTO: `photoId`,
  COMMENT: `commentId`,
  USER: `userId`,
  ROLE: `roleId`,
};

module.exports = (sequelize) => {
  const Article = deineArticle(sequelize);
  const Category = deineCategory(sequelize);
  const Comment = deineComment(sequelize);
  const Photo = deinePhoto(sequelize);
  const User = deineUser(sequelize);
  const Token = defineToken(sequelize);
  const Role = defuneRole(sequelize);

  class ArticleCategory extends Model {}
  ArticleCategory.init({}, {sequelize, timestamps: false, tableName: Aliase.ARTICLES_CATEGORIES});

  class UserRole extends Model {}
  UserRole.init({}, {sequelize, timestamps: false, tableName: Aliase.USERS_ROLES});

  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: ForeignKey.ARTICLE, onDelete: `cascade`});
  Comment.belongsTo(Article, {foreignKey: ForeignKey.ARTICLE});

  Article.belongsToMany(Category, {through: ArticleCategory, as: Aliase.CATEGORIES, foreignKey: ForeignKey.ARTICLE});
  Category.belongsToMany(Article, {through: ArticleCategory, as: Aliase.ARTICLES, foreignKey: ForeignKey.CATEGORY});
  Article.hasMany(ArticleCategory, {as: Aliase.ARTICLES_CATEGORIES, foreignKey: ForeignKey.ARTICLE});
  ArticleCategory.belongsTo(Article, {foreignKey: ForeignKey.ARTICLE});
  Category.hasMany(ArticleCategory, {as: Aliase.ARTICLES_CATEGORIES, foreignKey: ForeignKey.CATEGORY});
  ArticleCategory.belongsTo(Category, {foreignKey: ForeignKey.CATEGORY});

  Article.hasOne(Photo, {as: Aliase.PHOTO, foreignKey: ForeignKey.ARTICLE});
  Photo.belongsTo(Article, {foreignKey: ForeignKey.ARTICLE});

  User.hasMany(Article, {as: Article.ARTICLES, foreignKey: ForeignKey.USER});
  Article.belongsTo(User, {foreignKey: ForeignKey.USER});

  User.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: ForeignKey.USER});
  Comment.belongsTo(User, {foreignKey: ForeignKey.USER});

  User.hasOne(Token, {as: Aliase.TOKEN, foreignKey: ForeignKey.USER});
  Token.belongsTo(User, {foreignKey: ForeignKey.USER});

  User.belongsToMany(Role, {through: UserRole, as: Aliase.ROLES, foreignKey: ForeignKey.USER});
  Role.belongsToMany(User, {through: UserRole, as: Aliase.USERS, foreignKey: ForeignKey.ROLE});
  User.hasMany(UserRole, {as: Aliase.USERS_ROLES, foreignKey: ForeignKey.USER});
  UserRole.belongsTo(User, {foreignKey: ForeignKey.USER});
  Role.hasMany(UserRole, {as: Aliase.USERS_ROLES, foreignKey: ForeignKey.ROLE});
  UserRole.belongsTo(Role, {foreignKey: ForeignKey.ROLE});

  return {
    Article,
    Category,
    Comment,
    Photo,
    User,
    ArticleCategory,
    Role,
    UserRole,
  };
};
