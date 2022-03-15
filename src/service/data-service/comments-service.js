"use strict";

const Aliase = require(`../models/aliase`);

class CommentsService {
  constructor(sequelize) {
    this._Comment = sequelize.models.Comment;
    this._Article = sequelize.models.Article;
    this._User = sequelize.models.User;
  }

  async create(comment, articleId, userId) {
    const validComment = {...comment, userId, articleId};
    const createdComment = await this._Comment.create(validComment);
    return await this._Comment.findOne({
      include: [
        {
          model: this._User,
          as: Aliase.USER,
          attributes: [`id`, `firstName`, `lastName`, `avatar`],
        },
      ],
      attributes: [`id`, `text`, `articleId`],
      where: {id: createdComment.id}
    });
  }

  async drop(id) {
    return await this._Comment.destroy({
      where: {
        id,
      },
    });
  }

  async findOne(id) {
    return await this._Comment.findOne({where: {id}});
  }

  async findLatestComments({limit = 5} = {limit: 5}) {
    return await this._Comment.findAll({
      include: [
        {
          model: this._User,
          as: Aliase.USER,
          attributes: [`id`, `firstName`, `lastName`, `avatar`],
        },
      ],
      attributes: [`id`, `text`, `articleId`],
      limit,
      order: [[`createdAt`, `DESC`]],
    });
  }

  async findMyComments(userId) {
    const [user, comments] = await Promise.all([
      this._User.findByPk(userId, {
        attributes: [`id`, `firstName`, `lastName`, `avatar`],
      }),

      this._Comment.findAll({
        include: [
          {
            model: this._Article,
            as: Aliase.ARTICLE,
            attributes: [`id`, `title`],
          },
        ],
        attributes: [`id`, `createdAt`, `text`],
        order: [[`createdAt`, `DESC`]],
        where: {
          userId,
        },
      }),
    ]);

    return comments.map((comment) => ({...comment.get(), user}));
  }

  async findAll() {
    return await this._Comment.findAll({
      include: [
        {
          model: this._Article,
          as: Aliase.ARTICLE,
          attributes: [`id`, `title`],
        },
        {
          model: this._User,
          as: Aliase.USER,
          attributes: [`id`, `firstName`, `lastName`, `avatar`],
        }
      ],
      attributes: [`id`, `createdAt`, `text`],
      order: [[`createdAt`, `DESC`]],
    });
  }
}

module.exports = CommentsService;
