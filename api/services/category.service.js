const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class CategoriesService {

  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.string.uuid(),
        categorie: faker.word.adjective(),
        isBlock: faker.datatype.boolean(),
      }
      );
    }
  }

  async create(data) {
    const newCategory = {
      id: faker.string.uuid(),
      ...data
    }
    this.categories.push(newCategory);

    return newCategory;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 2000);
    });
  }

  async findOne(id) {
    const category = this.categories.find(item => item.id === id);

    if (!category)
      throw boom.notFound('category not found');

    if (category.isBlock)
      throw boom.conflict('category is block');

    return category;
  }

  async update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1)
      throw boom.notFound('category not found');
    
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    }

    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1)
      throw boom.notFound('category not found');
    
    // .splice allows me to receive a position and indicate how many elements to remove from it.
    this.categories.splice(index, 1);

    // Some APIs give a success message or id.
    return { id };
  }

}

module.exports = CategoriesService;