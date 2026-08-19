const express = require("express");
const router = express.Router();
const products = require("../data/products");

// GET /api/products              -> all products (supports ?gender= & ?search= & ?family=)
// GET /api/products/:id          -> a single product
// GET /api/products/meta/featured-> featured products only
// GET /api/products/meta/bestsellers -> bestseller products only

router.get("/meta/featured", (req, res) => {
  res.json(products.filter((p) => p.featured));
});

router.get("/meta/bestsellers", (req, res) => {
  res.json(products.filter((p) => p.bestseller));
});

router.get("/", (req, res) => {
  let result = [...products];
  const { gender, search, family, sort } = req.query;

  if (gender && gender !== "all") {
    result = result.filter((p) => p.gender === gender);
  }

  if (family) {
    result = result.filter((p) =>
      p.family.toLowerCase().includes(family.toLowerCase())
    );
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.family.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
  if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

  res.json(result);
});

router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id, 10));
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found." });
  }
  res.json(product);
});

module.exports = router;