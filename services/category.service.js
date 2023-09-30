const { faker } = require('@faker-js/faker');

class CategoriesService {

  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        categorie: faker.word.adjective()
      }
      );
    }
  }

  create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategory);

    return newCategory;
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find(item => item.id === id);
  }

  update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error('category not found');
    }

    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    }

    return this.categories[index];
  }

  delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error('category not found');
    }
    // .splice allows me to receive a position and indicate how many elements to remove from it.
    this.categories.splice(index, 1);

    // Some APIs give a success message or id.
    return { id };
  }

}

module.exports = CategoriesService;