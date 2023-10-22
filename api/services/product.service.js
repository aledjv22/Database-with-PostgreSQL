const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductsService {
  async create(data) {
    const newProduct = await models.Product.create(data);

    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }    

  const { limit, offset, price } = query;

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    if (price) {
      options.where.price = price;
    }

    const product = await models.Product.findAll(options);

    return product;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);

    if(!product)
      throw boom.notFound('Product not found');

    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);

    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();

    return { id };
  }

}

module.exports = ProductsService;