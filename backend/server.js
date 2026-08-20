const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const contactRouter = require("./routes/contact");
const subscribeRouter = require("./routes/subscribe");

const app = express();
const PORT = process.env.PORT || 5000;

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------------------------------------
// Request Logger
// --------------------------------------------------

app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} ${req.method} ${req.originalUrl}`
  );
  next();
});

// --------------------------------------------------
// Health Check
// --------------------------------------------------

app.get("/", (req, res) => {
  res.json({
    message: "Nivora Fragrances API is running.",
    status: "ok"
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Nivora Fragrances API is running.",
    status: "ok"
  });
});

// --------------------------------------------------
// API Routes
// --------------------------------------------------

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contact", contactRouter);
app.use("/api/subscribe", subscribeRouter);

// --------------------------------------------------
// 404 Handler
// --------------------------------------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} does not exist.`
  });
});

// --------------------------------------------------
// Central Error Handler
// --------------------------------------------------

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Something went wrong on our end."
  });
});

// --------------------------------------------------
// Local Development Server
// --------------------------------------------------

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(
      `✨ Nivora Fragrances API listening on http://localhost:${PORT}`
    );
  });
}

// --------------------------------------------------
// Export for Vercel
// --------------------------------------------------

module.exports = app;