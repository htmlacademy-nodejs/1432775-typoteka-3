"use strict";

const Sequelize = require(`sequelize`);

class Category {
  constructor(sequelize) {
    this._ArticleCategory = sequelize.models.ArticleCategory;
    this._Category = sequelize.models.Category;
  }

  async findAll(
      {count = false, where = null} = {count: false, where: null}
  ) {
    const attributes = [`id`, `name`];

    if (count) {
      attributes.push([
        Sequelize.literal(
            `(SELECT COUNT(*) FROM articles_categories WHERE "categoryId" = "Category"."id")`
        ),
        `count`,
      ]);
    }

    return await this._Category.findAll({
      attributes,

      ...(count && {
        order: [[Sequelize.col(`count`), `DESC`]],
      }),

      ...(where && {where}),
    });
  }

  async findOneRelation(categoryId) {
    return await this._ArticleCategory.findOne({where: {categoryId}});
  }

  async create(category) {
    return await this._Category.create(category);
  }

  async update(id, item) {
    return await this._Category.update(item, {
      where: {
        id,
      },
    });
  }

  async drop(id) {
    return await this._Category.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = Category;
