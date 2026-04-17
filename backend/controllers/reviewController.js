const Review = require('../models/Review');
const Product = require('../models/Product');

const getReviews = async (req, res) => {
  const { productId } = req.query;
  const filter = {};
  if (productId) filter.product = productId;
  const reviews = await Review.find(filter).sort({ createdAt: -1 }).populate('product', 'name');
  res.json(reviews);
};

const addReview = async (req, res) => {
  const { productId, name, rating, comment } = req.body;
  if (!productId || !name || !rating || !comment) {
    return res.status(400).json({ message: 'Tous les champs de l’avis sont requis.' });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Produit introuvable.' });
  }

  const review = await Review.create({
    product: productId,
    name,
    rating,
    comment
  });

  res.status(201).json(review);
};

module.exports = { getReviews, addReview };