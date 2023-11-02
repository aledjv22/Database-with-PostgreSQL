const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  async create(data) {
    const newOrder = await models.Order.create(data);

    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);

    return newItem;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [{
        association: 'customer',
        include: ['user']
      }
    ]
    });

    return orders;
  }

  async find() {
    const rta = await models.Order.findAll({
      include: ['customer']
    });

    return rta;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['user']
      },
      'items'
    ]
    });

    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes
    }
  }

  async delete(id) {
    return { id };
  }
}

module.exports = OrderService;
