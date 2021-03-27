const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData')
const blogData = require('./blogData');
const commentData = require('./commentData');

const seedDatabase = async () => {
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

  // for (const comment of commentData) {
  //   await Comment.create({
  //     ...comment,
  //   });
  // }

  process.exit(0);
};

seedDatabase();