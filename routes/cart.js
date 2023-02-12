const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
  const cart = await Cart.fetch();
  res.render('cart', {
    title: 'Cart',
    isCart: true,
    courses: cart.courses,
    price: cart.price,
    cart,
  });
});

router.post('/add', async (req, res) => {
  const course = await Course.getById(req.body.id);
  await req.user.addToCart(course);
  res.redirect('/cart');
});

router.delete('/remove/:id', async (req, res) => {
  const cart = await Cart.remove(req.params.id);

  res.status(200).json(cart);
});

module.exports = router;