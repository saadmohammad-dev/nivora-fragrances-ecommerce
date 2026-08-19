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

// simple request logger — helpful while demoing/marking the project
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()}  ${req.method}  ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Nivora Fragrances API is running.", status: "ok" });
});

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contact", contactRouter);
app.use("/api/subscribe", subscribeRouter);

// 404 handler — always respond clearly to unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} does not exist.` });
});

// central error handler — so the API always responds with clean JSON,
// never a raw stack trace, no matter what input breaks a route
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong on our end. Please try again." });
});

app.listen(PORT, () => {
  console.log(`✨ Nivora Fragrances API listening on http://localhost:${PORT}`);
});