const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blog posts and JOIN with user data
    const blogData = await Blog.findAll({
      include: [{all: true}],
    });

    const comments = await Comment.findAll({
      include: [{all: true}],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((post) => post.get({ plain: true }));
    // const comments = commentData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{all: true}],
    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{all: true}],
    });

    const user = userData.get({ plain: true });

    const blogData = await Blog.findAll({
      include: [{all: true}],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((post) => post.get({ plain: true }));

    res.render('profile', {
      ...user,
      blogs,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{all: true}],
//     });
//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

// router.get('/comment', async (req, res) => {
//   if (!req.session.logged_in) {
//     res.redirect('/login');
//   } else {
//     res.render('comment', { logged_in: req.session.logged_in });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     // Get all comments and JOIN with user and blog data
//     const commentData = await Comment.findAll({
//       include: [{ all: true }],
//     });

//     // Serialize data so the template can read it
//     const comments = commentData.map((post) => post.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', {
//       comments,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/commment/:id', async (req, res) => {
//   try {
//     const commentData = await Comment.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const comment = commentData.get({ plain: true });

//     res.render('comment', {
//       ...comment,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
