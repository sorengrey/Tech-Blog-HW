const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userData');
const blogData = require('./blogData');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const blog of blogData) {
      await Blog.create({
        ...blog,
      });
    }
  
  process.exit(0);
  };
  
  seedAll();
