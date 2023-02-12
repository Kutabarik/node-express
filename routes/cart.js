const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

function mapCartItems(cart) {
  return cart.items.map((c) => ({
    ...c.courseId._doc,
    count: c.count,
  }));
}

router.get('/', async (req, res) => {
  const user = await req.user.populate('cart.items.courseId').execPopulate();

  const courses = mapCartItems(user.cart);

  res.render('cart', {
    title: 'Cart',
    isCart: true,
    courses: user,
    price: 0,
    cart,
  });
});

router.post('/add', async (req, res) => {
  const course = await Course.findById(req.body.id).lean();
  await req.user.addToCart(course);
  res.redirect('/cart');
});

router.delete('/remove/:id', async (req, res) => {
  const cart = await Cart.remove(req.params.id);
  res.status(200).json(cart);
});

module.exports = router;
