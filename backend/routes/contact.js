const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const CONTACT_FILE = path.join(__dirname, "..", "data", "contacts.json");

function readContacts() {
  if (!fs.existsSync(CONTACT_FILE)) return [];
  try {
    const raw = fs.readFileSync(CONTACT_FILE, "utf-8");
    return raw.trim() ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeContacts(list) {
  fs.writeFileSync(CONTACT_FILE, JSON.stringify(list, null, 2));
}

// POST /api/contact — general inquiry / contact-us form
router.post("/", (req, res) => {
  const { name, email, subject, message } = req.body;
  const errors = [];

  if (!name || !name.trim()) errors.push("Please tell us your name.");
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push("Please provide a valid email address.");
  if (!message || !message.trim()) errors.push("Your message can't be empty.");

  if (errors.length) {
    return res.status(400).json({ success: false, message: errors.join(" ") });
  }

  const entry = {
    id: uuidv4(),
    name,
    email,
    subject: subject || "General Inquiry",
    message,
    createdAt: new Date().toISOString()
  };

  const contacts = readContacts();
  contacts.push(entry);
  writeContacts(contacts);

  res.status(201).json({
    success: true,
    message: `Thanks, ${name.split(" ")[0]}! We've received your message and our team will get back to you within 24 hours.`
  });
});

module.exports = router;