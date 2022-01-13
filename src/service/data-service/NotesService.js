"use strict";

const Aliase = require(`../models/aliase`);
const Sequelize = require(`sequelize`);

class NotesService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Category = sequelize.models.Category;
    this._Comment = sequelize.models.Comment;
    this._User = sequelize.models.User;
    this._Photo = sequelize.models.Photo;
    this._ArticleCategory = sequelize.models.ArticleCategory;
    this._searchField = `title`;

    this._defaultFindAllOptions = {
      categories: true,
      fromCategoryId: null,
      photo: true,
      comments: false,
      commentsNumber: false,
      mostCommented: true,
      limit: null,
      offset: null,
      needCount: false,
      withPagination: true,
      where: null,
    };
  }

  async findAll(
      {
        categories = true,
        fromCategoryId = null,
        photo = true,
        comments = false,
        commentsNumber = true,
        mostCommented = false,
        limit = 0,
        offset = 1,
        needCount = false,
        withPagination = true,
        where = null,
      } = this._defaultFindAllOptions
  ) {
    const needIncludeCommentsNumber =
      (commentsNumber || mostCommented) && !comments;

    const include = [];

    if (categories) {
      include.push({
        model: this._Category,
        as: Aliase.CATEGORIES,
        attributes: [`id`, `name`],
      });
    }

    if (fromCategoryId) {
      include.push({
        required: true,
        model: this._ArticleCategory,
        as: Aliase.ARTICLES_CATEGORIES,
        where: {categoryId: fromCategoryId},
        attributes: [],
      });
    }

    if (comments) {
      include.push({
        model: this._Comment,
        as: Aliase.COMMENTS,
        include: [
          {
            model: this._User,
            as: Aliase.USER,
            attributes: [`firstName`, `lastName`, `avatar`],
          },
        ],
      });
    }

    if (photo) {
      include.push(Aliase.PHOTO);
    }

    const order = [];

    if (mostCommented) {
      order.push([Sequelize.col(`commentsNumber`), `DESC`]);
    } else {
      order.push([`createdAt`, `DESC`]);
    }

    const queryOptions = {
      order,
      include,
      distinct: true,

      ...(withPagination && {
        offset,
        limit,
      }),

      ...(where && {where}),

      ...(needIncludeCommentsNumber && {
        attributes: {
          include: [
            [
              Sequelize.literal(
                  `(SELECT COUNT(*) FROM comments WHERE "articleId" = "Article"."id")`
              ),
              `commentsNumber`,
            ],
          ],
        },
      }),
    };

    const promises = [this._Article.findAll(queryOptions)];

    if (needCount) {
      promises.push(this._Article.count());
    }

    const res = await Promise.all(promises);

    const final = needCount ? {count: res[1], rows: res[0]} : res[0];
    return final;
  }

  async findOne(id, {comments = false} = {comments: false}) {
    const res = await this.findAll({
      categories: true,
      commentsNumber: false,
      comments,
      withPagination: false,
      where: {id},
    });
    return res[0];
  }

  async findUserArticles(userId) {
    return this.findAll({
      categories: false,
      commentsNumber: false,
      photo: false,
      withPagination: false,
      where: {userId},
    });
  }

  async create(article) {
    // TODO: userId must be recieved from client
    const validArticle = {...article, userId: 1};
    const createdArtcle = await this._Article.create(validArticle);
    await Promise.all([
      createdArtcle.addCategories(validArticle.categories),
      ...(validArticle.photo
        ? [createdArtcle.createPhoto(validArticle.photo)]
        : []),
    ]);
    return createdArtcle.get();
  }

  async update(id, item) {
    await Promise.all([
      this._Article.update(item, {
        where: {
          id,
        },
      }),

      this._Photo.update(item.photo, {
        where: {
          articleId: id,
        },
      }),

      this._updateArticleCategories(id, item.categories),
    ]);
  }

  async drop(id) {
    await this._Article.destroy({
      where: {
        id,
      },
    });
  }

  async _updateArticleCategories(articleId, newCategories) {
    const currentCategories = await this._ArticleCategory.findAll({
      attributes: [`categoryId`],
      where: {
        articleId,
      },
      raw: true,
    });
    const currentCategoriesIds = currentCategories.map((e) => e.categoryId);
    const allCategories = new Set([...currentCategoriesIds, ...newCategories]);

    const sortedCategories = {
      deleted: [],
      added: [],
    };

    allCategories.forEach((categoryId) => {
      const isInOldCategories = currentCategoriesIds.includes(categoryId);
      const isInNewCategories = newCategories.includes(categoryId);

      if (!isInOldCategories && isInNewCategories) {
        sortedCategories.added.push(categoryId);
      }
      if (isInOldCategories && !isInNewCategories) {
        sortedCategories.deleted.push(categoryId);
      }
    });

    const isCategoriesAdded = !!sortedCategories.added.length;
    const isCategoriesDeleted = !!sortedCategories.deleted.length;

    if (!isCategoriesAdded && !isCategoriesDeleted) {
      return;
    }

    const promises = [];

    if (isCategoriesAdded) {
      promises.push(
          this._ArticleCategory.bulkCreate(
              sortedCategories.added.map((categoryId) => ({
                articleId,
                categoryId,
              }))
          )
      );
    }

    if (isCategoriesDeleted) {
      promises.push(
          this._ArticleCategory.destroy({
            where: {
              articleId,
              categoryId: {
                [Sequelize.Op.in]: sortedCategories.deleted,
              },
            },
          })
      );
    }

    await Promise.all(promises);
  }
}

module.exports = NotesService;
