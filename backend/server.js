const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const contactRouter = require("./routes/contact");
const subscribeRouter = require("./routes/subscribe");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

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

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contact", contactRouter);
app.use("/api/subscribe", subscribeRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} does not exist.`
  });
});

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong on our end."
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✨ Nivora Fragrances API listening on http://localhost:${PORT}`);
  });
}

module.exports = app;