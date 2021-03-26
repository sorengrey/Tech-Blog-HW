const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const seedUsers = require('./userData')
const seedBlogs = require('./blogData');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');
  await seedBlogs();
  console.log('\n----- BLOGS SEEDED -----\n');
  process.exit(0);
};

seedAll();
