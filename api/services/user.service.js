const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class UsersService {

  constructor(){
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        user: faker.internet.userName(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newUser = {
      id: faker.string.uuid(),
      ...data
    }
    this.users.push(newUser);

    return newUser;
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query);
    
    return data;
  }

  async findOne(id) {
    const user = this.users.find(item => item.id === id);
    
    if (!user)
      throw boom.notFound('user not found');
    
    if (user.isBlock)
      throw boom.conflict('user is block');

    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1){
      throw boom.notFound('user not found');
    }

    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };

    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1)
      throw boom.notFound('user not found');

    // .splice allows me to receive a position and indicate how many elements to remove from it.
    this.users.splice(index, 1);

    // Some APIs give a success message or id.
    return { id };
  }

}

module.exports = UsersService;