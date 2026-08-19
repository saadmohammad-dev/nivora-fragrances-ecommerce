export function formatPKR(amount) {
  return "Rs. " + Math.round(amount).toLocaleString("en-PK");
}

export function discountedPrice(price, discountPct) {
  if (!discountPct) return price;
  return price - (price * discountPct) / 100;
}

export function renderStars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}