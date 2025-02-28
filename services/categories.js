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
        name: faker.commerce.productAdjective()
      });
    }
  }

  create(data) {
    const newCategory = {
      id: faker.string.uuid(),
      ...data
    };
    this.categories.push(newCategory);

    return newCategory;
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    // return this.categories.filter((categories) => item.id === id); // Return the json object in an array
    const category = this.categories.find(item => item.id === id); // Return a single json object
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }

    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    };

    return this.categories[index];
  }

  delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = CategoriesService;
