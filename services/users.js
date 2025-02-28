const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class UsersService {

  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        gender: faker.person.gender(),
        job: faker.person.jobTitle()
      });
    }
  }

  create(data) {
    const newUser = {
      id: faker.string.uuid(),
      ...data
    };
    this.users.push(newUser);

    return newUser;
  }

  find() {
    return this.users;
  }

  findOne(id) {
    // return this.users.filter((item) => item.id === id); // Return the json object in an array
    const user = this.users.find(item => item.id === id); // Return a single json object
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }

    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };

    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UsersService;
