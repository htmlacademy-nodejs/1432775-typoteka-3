"use strict";

const Sequelize = require(`sequelize`);

class Category {
  constructor(sequelize) {
    this._ArticleCategory = sequelize.models.ArticleCategory;
    this._Category = sequelize.models.Category;
  }

  async findAll({count = false} = {count: false}) {
    return await this._ArticleCategory.findAll({
      ...(count && {
        include: {
          model: this._Category,
          right: true,
          attributes: [],
        },
        raw: true,
        attributes: [
          [
            Sequelize.fn(
                `COUNT`,
                Sequelize.col(`"ArticleCategory"."categoryId"`)
            ),
            `count`,
          ],
          [Sequelize.col(`Category.id`), `id`],
          [Sequelize.col(`Category.name`), `name`],
        ],
        group: [`Category.id`],
        order: [[`count`, `DESC`]]
      }),
    });
  }
}

module.exports = Category;
