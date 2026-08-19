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

// simple request logger
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()}  ${req.method}  ${req.originalUrl}`);
  next();
});

// Root & Health Check Routes (Handles both / and /api)
app.get(["/", "/api"], (req, res) => {
  res.json({ message: "Nivora Fragrances API is running.", status: "ok" });
});

// API Routes — Mount BOTH with and without /api prefix for Vercel compatibility
app.use(["/api/products", "/products"], productsRouter);
app.use(["/api/orders", "/orders"], ordersRouter);
app.use(["/api/contact", "/contact"], contactRouter);
app.use(["/api/subscribe", "/subscribe"], subscribeRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} does not exist.` });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong on our end. Please try again." });
});

// Start local server (only runs during local development)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✨ Nivora Fragrances API listening on http://localhost:${PORT}`);
  });
}

// CRITICAL FOR VERCEL: Export the Express app instance
module.exports = app;