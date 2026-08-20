const express = require("express");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const router = express.Router();
const ORDERS_FILE = path.join(__dirname, "..", "data", "orders.json");

function readOrders() {
  if (!fs.existsSync(ORDERS_FILE)) return [];
  try {
    const raw = fs.readFileSync(ORDERS_FILE, "utf-8");
    return raw.trim() ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to read orders.json:", err.message);
    return [];
  }
}

function writeOrders(orders) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error("Vercel filesystem write skipped:", err.message);
  }
}

const STAGE_SPEED = 20;
const STAGES = [
  { key: "placed", label: "Order Placed", location: "Nivora Warehouse, Lahore", afterSeconds: 0 * STAGE_SPEED },
  { key: "processing", label: "Processing", location: "Nivora Fulfillment Center, Lahore", afterSeconds: 0.75 * STAGE_SPEED },
  { key: "shipped", label: "Shipped", location: "In transit — Faisalabad Sorting Hub", afterSeconds: 2 * STAGE_SPEED },
  { key: "out_for_delivery", label: "Out for Delivery", location: "With your rider — arriving in your city", afterSeconds: 4 * STAGE_SPEED },
  { key: "delivered", label: "Delivered", location: "Delivered to your doorstep", afterSeconds: 7 * STAGE_SPEED }
];

function computeStatus(order) {
  const elapsedSeconds = (Date.now() - new Date(order.createdAt).getTime()) / 1000;
  let currentIndex = 0;
  STAGES.forEach((stage, i) => {
    if (elapsedSeconds >= stage.afterSeconds) currentIndex = i;
  });
  return {
    currentStageIndex: currentIndex,
    currentStage: STAGES[currentIndex],
    stages: STAGES.map((s, i) => ({ ...s, completed: i <= currentIndex })),
    isDelivered: currentIndex === STAGES.length - 1
  };
}

function validateOrder(body) {
  const required = ["name", "phone", "email", "address", "city", "zip"];
  const missing = required.filter((field) => !body[field] || !String(body[field]).trim());

  const errors = [];
  if (missing.length) errors.push(`Missing required field(s): ${missing.join(", ")}`);

  if (body.email && !/^\S+@\S+\.\S+$/.test(body.email)) {
    errors.push("Please provide a valid email address.");
  }
  if (body.phone && !/^[0-9+\-\s()]{7,}$/.test(body.phone)) {
    errors.push("Please provide a valid phone number.");
  }
  if (!Array.isArray(body.items) || body.items.length === 0) {
    errors.push("Your cart is empty — add at least one item before checking out.");
  }

  return errors;
}

router.post("/", (req, res) => {
  const errors = validateOrder(req.body);
  if (errors.length) {
    return res.status(400).json({ success: false, message: errors.join(" ") });
  }

  const { name, phone, email, address, city, zip, items, total, subscription, notes } = req.body;

  const order = {
    id: randomUUID(),
    trackingId: "NIV-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    name,
    phone,
    email,
    address,
    city,
    zip,
    items,
    total,
    subscription: !!subscription,
    notes: notes || "",
    createdAt: new Date().toISOString()
  };

  const orders = readOrders();
  orders.push(order);
  writeOrders(orders);

  res.status(201).json({
    success: true,
    message: `Thank you, ${name}! Your order has been placed successfully.`,
    trackingId: order.trackingId,
    order
  });
});

router.get("/:trackingId", (req, res) => {
  const orders = readOrders();
  const order = orders.find(
    (o) => o.trackingId.toLowerCase() === req.params.trackingId.toLowerCase()
  );

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "We couldn't find an order with that tracking ID. Please double-check and try again."
    });
  }

  const status = computeStatus(order);
  res.json({
    success: true,
    trackingId: order.trackingId,
    name: order.name,
    city: order.city,
    total: order.total,
    placedAt: order.createdAt,
    ...status
  });
});

module.exports = router;