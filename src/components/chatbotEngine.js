// Nivora Assistant — a rule-based conversational engine.
// It scores the user's message against a library of intents (keyword sets)
// and returns the best-matching, friendly response, plus optional quick
// reply chips / navigation links so the assistant can genuinely guide the
// shopper around the store, not just chat.

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countMatches(input, keywords) {
  let score = 0;
  keywords.forEach((kw) => {
    const pattern = new RegExp(`\\b${escapeRegex(kw)}\\b`, "i");
    if (pattern.test(input)) score += 1;
  });
  return score;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const intents = [
  {
    name: "greeting",
    keywords: ["hi", "hii", "hello", "hey", "salam", "assalam", "asalamalaikum", "greetings", "good morning", "good evening", "good afternoon"],
    responses: [
      "Hi there! 🌸 Welcome to Nivora Fragrances. I'm your scent assistant — ask me about perfumes, prices, orders, or our membership, and I'll point you the right way.",
      "Hello! ✨ I'm here to help you find your signature scent. What are you in the mood for today — something floral, woody, fresh, or bold?"
    ],
    quickReplies: ["Help me pick a perfume", "Track my order", "Membership benefits"]
  },
  {
    name: "howAreYou",
    keywords: ["how are you", "how're you", "how you doing", "hows it going"],
    responses: [
      "I'm doing wonderfully, thank you for asking! 😊 More importantly — how can I help you smell amazing today?"
    ],
    quickReplies: ["Recommend a perfume for me", "What's on sale?"]
  },
  {
    name: "thanks",
    keywords: ["thanks", "thank you", "thankyou", "shukriya", "appreciate it"],
    responses: [
      "You're very welcome! If anything else comes to mind, I'm right here. 🌸",
      "Anytime! Happy shopping, and enjoy your scent journey with Nivora."
    ]
  },
  {
    name: "farewell",
    keywords: ["bye", "goodbye", "see you", "khuda hafiz", "allah hafiz", "later"],
    responses: [
      "Take care, and thank you for visiting Nivora Fragrances! Come back soon. 🌸",
      "Goodbye for now! Your signature scent will be waiting whenever you're ready."
    ]
  },
  {
    name: "aboutStore",
    keywords: ["about", "who are you", "what is nivora", "tell me about", "what do you sell", "what is this website", "your store"],
    responses: [
      "Nivora Fragrances is a Pakistan-based online perfume house — we carry over a dozen original fragrances for men, women, and unisex wear, all priced in PKR. You can browse by scent family, take our 2-minute Scent Quiz, or join our membership for ongoing perks. Where would you like to start?"
    ],
    quickReplies: ["Show me the Shop", "Take the Scent Quiz", "Membership plans"]
  },
  {
    name: "perfumeLongevity",
    keywords: ["long last", "longevity", "staying power", "how long does it last", "hours", "fade"],
    responses: [
      "Great question! Our Eau de Parfum concentration typically lasts 6–8 hours on skin. For the best staying power: apply right after a shower to moisturised skin, and dab a little on your wrists, neck, and inner elbows — pulse points radiate heat, which helps the scent bloom throughout the day."
    ]
  },
  {
    name: "perfumeQuality",
    keywords: ["ingredients", "quality", "authentic", "original", "fake", "genuine", "made of", "safe"],
    responses: [
      "All Nivora fragrances are formulated in-house with genuine aromatic compounds, structured in the classic top/middle/base note pyramid — so the scent actually evolves over the day instead of smelling flat. Every bottle is quality-checked before it ships, and we list the full note breakdown on every product page."
    ]
  },
  {
    name: "recommendMen",
    keywords: ["perfume for men", "mens perfume", "cologne for him", "best for men", "men fragrance", "for my husband", "for my boyfriend", "for my dad", "for my brother"],
    responses: [
      "For men, our bestsellers are Oud Royale (rich & woody), Midnight Leather (bold evening scent), and Sport Edge (fresh, everyday aquatic). Want me to take you to the Men's collection?"
    ],
    quickReplies: ["Show Men's collection", "Take the Scent Quiz instead"]
  },
  {
    name: "recommendWomen",
    keywords: ["perfume for women", "womens perfume", "best for her", "women fragrance", "for my wife", "for my girlfriend", "for my mom", "for my sister"],
    responses: [
      "For women, Blush Rose (soft romantic floral), Vanilla Musk (cozy everyday comfort scent), and Velvet Orchid Noir (our most decadent evening fragrance) are customer favourites. Shall I take you to the Women's collection?"
    ],
    quickReplies: ["Show Women's collection", "Take the Scent Quiz instead"]
  },
  {
    name: "quizPrompt",
    keywords: ["quiz", "dont know which", "don't know which", "help me choose", "confused", "not sure", "recommend something", "suggest a perfume", "which perfume should i"],
    responses: [
      "No worries at all — that's exactly what our Scent Quiz is for! Answer 8 quick questions about your style, and I'll match you with your top 3 fragrances. Ready?"
    ],
    quickReplies: ["Take the Scent Quiz"]
  },
  {
    name: "priceInfo",
    keywords: ["price", "cost", "how much", "expensive", "cheap", "budget", "rate"],
    responses: [
      "Our fragrances range from Rs. 4,800 to Rs. 14,200, depending on the concentration and ingredients used. Several bottles currently have 10–20% off — I can show you today's deals if you'd like."
    ],
    quickReplies: ["Show discounted perfumes"]
  },
  {
    name: "discountInfo",
    keywords: ["discount", "sale", "offer", "coupon", "deal", "promo", "cheaper"],
    responses: [
      "Right now several bestsellers are discounted — Sport Edge is 20% off, Velvet Orchid Noir is 12% off, and a few more are marked down across the Shop page. You'll also save automatically with Subscribe & Save on any product page."
    ],
    quickReplies: ["Show me the Shop"]
  },
  {
    name: "shippingInfo",
    keywords: ["shipping", "delivery", "deliver", "ship to", "delivery time", "how long to arrive"],
    responses: [
      "We deliver across Pakistan in 3–5 business days. Shipping is free on orders over Rs. 10,000 — otherwise it's a flat Rs. 250. Once your order is placed you'll get a tracking ID to follow it live on our Track Order page."
    ],
    quickReplies: ["Track my order"]
  },
  {
    name: "trackOrderInfo",
    keywords: ["track order", "where is my order", "order status", "my package", "my parcel", "track my"],
    responses: [
      "I can point you there! Head to the Track Order page and enter the tracking ID (something like NIV-AB12CD) that you received at checkout — you'll see your order's live status update."
    ],
    quickReplies: ["Go to Track Order"]
  },
  {
    name: "membershipInfo",
    keywords: ["membership", "subscription", "subscribe", "member", "loyalty", "plans", "benefits"],
    responses: [
      "Nivora Membership has three tiers — Essence (free), Signature (Rs. 1,499/mo with free shipping + 10% off everything), and Prestige (Rs. 3,499/mo with 18% off, express delivery, and two free full-size bottles a year). Want to see the full comparison?"
    ],
    quickReplies: ["Show membership plans"]
  },
  {
    name: "contactInfo",
    keywords: ["contact", "phone number", "email address", "location", "where are you located", "customer service", "helpline"],
    responses: [
      "You can reach our team at hello@nivorafragrances.pk or +92 300 1234567, Monday–Saturday, 10am–8pm. There's also a contact form on the Contact page if you'd like us to email you back."
    ],
    quickReplies: ["Open Contact page"]
  },
  {
    name: "paymentInfo",
    keywords: ["payment", "cash on delivery", "cod", "card", "easypaisa", "jazzcash", "pay"],
    responses: [
      "We accept Cash on Delivery, debit/credit cards, and mobile wallets like JazzCash and Easypaisa at checkout — whatever's easiest for you."
    ]
  },
  {
    name: "returnPolicy",
    keywords: ["return", "refund", "exchange", "wrong item", "damaged"],
    responses: [
      "If a bottle arrives damaged or you'd like to exchange it, you have 7 days from delivery to reach out to us — unopened products are eligible for a full refund or exchange, no questions asked."
    ]
  },
  {
    name: "complimentBot",
    keywords: ["good bot", "smart bot", "nice bot", "you're helpful", "youre helpful", "love this", "amazing bot"],
    responses: ["Aw, thank you! 🌸 I do my best. Let me know what else I can help you find."]
  },
  {
    name: "rude",
    keywords: ["stupid", "useless", "dumb", "bad bot", "hate you", "annoying"],
    responses: [
      "I'm sorry I couldn't help the way you needed. I'm still happy to try again — what were you looking for?"
    ]
  },
  {
    name: "help",
    keywords: ["help", "what can you do", "options", "menu", "guide me"],
    responses: [
      "Here's what I can help with: recommending perfumes, explaining notes & longevity, prices & discounts, shipping & order tracking, membership perks, and general store questions. Where should we start?"
    ],
    quickReplies: ["Recommend a perfume", "Track my order", "Membership plans", "Take the Scent Quiz"]
  }
];

const FALLBACKS = [
  "I want to make sure I get this right — could you rephrase that? You can also ask me about perfumes, prices, shipping, tracking, or membership.",
  "Hmm, I'm not quite sure I follow, but I'd love to help you find the right scent. Try asking about a perfume recommendation, an order, or our membership plans."
];

export function getBotResponse(userInput) {
  const input = userInput.trim();
  if (!input) {
    return { text: "I'm listening — go ahead and type your question! 🌸", quickReplies: [] };
  }

  let bestIntent = null;
  let bestScore = 0;

  intents.forEach((intent) => {
    const score = countMatches(input, intent.keywords);
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  });

  if (bestIntent && bestScore > 0) {
    return { text: pick(bestIntent.responses), quickReplies: bestIntent.quickReplies || [] };
  }

  return { text: pick(FALLBACKS), quickReplies: ["Help me pick a perfume", "Track my order", "Membership plans"] };
}

export const OPENING_MESSAGE = {
  text: "Hi! I'm the Nivora Assistant 🌸 Ask me anything about our perfumes, orders, or membership — I'm here to help.",
  quickReplies: ["Help me pick a perfume", "Track my order", "Membership benefits", "Contact a human"]
};