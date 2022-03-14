"use strict";

const Sequelize = require(`sequelize`);

class Category {
  constructor(sequelize) {
    this._ArticleCategory = sequelize.models.ArticleCategory;
    this._Category = sequelize.models.Category;
  }

  async findAll() {
    return await this._Category.findAll({
      attributes: [
        `id`,
        `name`,
        [
          Sequelize.literal(
              `(SELECT COUNT(*) FROM articles_categories WHERE "categoryId" = "Category"."id")`
          ),
          `count`,
        ],
      ],

      order: [[Sequelize.col(`count`), `DESC`]],
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
