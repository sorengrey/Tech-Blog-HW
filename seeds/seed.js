const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userData');
const blogData = require('./blogData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await userData;
  console.log('\n----- User Data SEEDED -----\n');
  await blogData;
  console.log('\n----- Blog Data SEEDED -----\n');
  
  process.exit(0);
  };
  
  seedAll();
