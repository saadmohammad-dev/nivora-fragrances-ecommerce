const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const contactRouter = require("./routes/contact");
const subscribeRouter = require("./routes/subscribe");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.originalUrl}`);
  next();
});

// Root & Health Check
app.get(["/", "/api"], (req, res) => {
  res.json({ message: "Nivora Fragrances API is running.", status: "ok" });
});

// Mount Routes (Handles /api/products as well as direct /products)
app.use(["/api/products", "/products"], productsRouter);
app.use(["/api/orders", "/orders"], ordersRouter);
app.use(["/api/contact", "/contact"], contactRouter);
app.use(["/api/subscribe", "/subscribe"], subscribeRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} does not exist.` });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong on our end." });
});

// Only listen locally, do not listen on Vercel
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✨ Nivora Fragrances API listening on http://localhost:${PORT}`);
  });
}

module.exports = app;