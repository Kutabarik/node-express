const { Router } = require('express');
const User = require('../models/user');
const router = Router();

router.get('/login', (req, res) => {
  res.render('auth/login', {
    title: 'Authorization',
    isLogin: true,
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

router.post('/login', async (req, res) => {
  const user = await User.findById('63e69887174117fa74c1c1ca');
  req.session.user = user;
  req.session.isAuthenticated = true;
  req.session.save((err) => {
    if (err) {
      сываывавыв;
      throw err;
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
