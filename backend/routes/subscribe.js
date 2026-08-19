const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const SUB_FILE = path.join(__dirname, "..", "data", "subscribers.json");

function readSubs() {
  if (!fs.existsSync(SUB_FILE)) return [];
  try {
    const raw = fs.readFileSync(SUB_FILE, "utf-8");
    return raw.trim() ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeSubs(list) {
  fs.writeFileSync(SUB_FILE, JSON.stringify(list, null, 2));
}

const PLAN_BENEFITS = {
  essence: { name: "Essence (Free)", perks: ["Birthday surprise gift", "Early sale access"] },
  signature: {
    name: "Signature (PKR 1,499/mo)",
    perks: ["Free delivery on every order", "10% off all fragrances", "1 discovery sample monthly"]
  },
  prestige: {
    name: "Prestige (PKR 3,499/mo)",
    perks: [
      "Free express delivery",
      "18% off all fragrances",
      "2 full-size bottles per year",
      "Dedicated fragrance concierge"
    ]
  }
};

// POST /api/subscribe — membership plan or newsletter signup
router.post("/", (req, res) => {
  const { name, email, plan } = req.body;
  const errors = [];

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push("Please provide a valid email address.");
  if (plan && !PLAN_BENEFITS[plan]) errors.push("That membership plan doesn't exist.");

  if (errors.length) {
    return res.status(400).json({ success: false, message: errors.join(" ") });
  }

  const entry = {
    id: uuidv4(),
    name: name || "",
    email,
    plan: plan || "newsletter",
    createdAt: new Date().toISOString()
  };

  const subs = readSubs();
  subs.push(entry);
  writeSubs(subs);

  const planInfo = plan ? PLAN_BENEFITS[plan] : null;

  res.status(201).json({
    success: true,
    message: planInfo
      ? `Welcome to Nivora ${planInfo.name}! A confirmation has been sent to ${email}.`
      : `You're subscribed! Watch ${email} for exclusive drops and offers.`,
    benefits: planInfo ? planInfo.perks : null
  });
});

module.exports = router;