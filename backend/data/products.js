// Nivora Fragrances - Product Catalog
// Images are hotlinked directly from Pexels' CDN (free-to-use stock photography).
// Nothing is downloaded or stored locally - the browser fetches these straight
// from the internet, exactly as required by the assignment brief.

const products = [
  // ---------------------- MEN ----------------------
  {
    id: 1,
    name: "Oud Royale",
    brand: "Nivora",
    gender: "men",
    family: "Woody & Oriental",
    price: 8500,
    discount: 15,
    rating: 4.8,
    reviews: 214,
    image: "https://images.pexels.com/photos/2814832/pexels-photo-2814832.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "A commanding blend of aged oud and warm spice. Oud Royale is built for the man who walks into a room and quietly changes its temperature.",
    notes: { top: "Saffron, Black Pepper", middle: "Rose, Oud", base: "Sandalwood, Amber" },
    tags: ["men", "woody", "oriental", "strong", "night", "winter", "special"],
    bestseller: true,
    featured: true
  },
  {
    id: 2,
    name: "Steel Noir",
    brand: "Nivora",
    gender: "men",
    family: "Fresh & Aromatic",
    price: 6200,
    discount: 0,
    rating: 4.5,
    reviews: 132,
    image: "https://images.pexels.com/photos/7751714/pexels-photo-7751714.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Crisp and metallic-cool. Steel Noir opens with icy citrus and settles into a smoky musk that lingers just long enough to be remembered.",
    notes: { top: "Bergamot, Grapefruit", middle: "Lavender, Sea Salt", base: "Musk, Vetiver" },
    tags: ["men", "fresh", "aromatic", "moderate", "day", "all-season", "daily"],
    bestseller: false,
    featured: true
  },
  {
    id: 3,
    name: "Amber Legacy",
    brand: "Nivora",
    gender: "men",
    family: "Oriental & Spicy",
    price: 9800,
    discount: 10,
    rating: 4.7,
    reviews: 98,
    image: "https://images.pexels.com/photos/12402362/pexels-photo-12402362.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Cinnamon and cardamom collide with rich amber and worn leather. A legacy scent, passed down in spirit if not in name.",
    notes: { top: "Cardamom, Cinnamon", middle: "Amber, Leather", base: "Tonka Bean, Oud" },
    tags: ["men", "oriental", "spicy", "strong", "night", "winter", "special"],
    bestseller: true,
    featured: false
  },
  {
    id: 4,
    name: "Citrus Storm",
    brand: "Nivora",
    gender: "men",
    family: "Citrus & Fresh",
    price: 5400,
    discount: 0,
    rating: 4.3,
    reviews: 76,
    image: "https://images.pexels.com/photos/3785784/pexels-photo-3785784.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "A bright, energetic burst of lemon and mint that hits like the first morning of spring. Built for movement.",
    notes: { top: "Lemon, Bergamot", middle: "Mint, Basil", base: "Cedarwood, Musk" },
    tags: ["men", "citrus", "fresh", "light", "day", "summer", "daily"],
    bestseller: false,
    featured: true
  },
  {
    id: 5,
    name: "Midnight Leather",
    brand: "Nivora",
    gender: "men",
    family: "Woody & Leather",
    price: 11500,
    discount: 0,
    rating: 4.9,
    reviews: 156,
    image: "https://images.pexels.com/photos/17978253/pexels-photo-17978253.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Dark birch and warm vanilla wrapped in supple leather. For the after-hours version of yourself.",
    notes: { top: "Black Pepper, Nutmeg", middle: "Leather, Birch", base: "Vanilla, Oud" },
    tags: ["men", "woody", "leather", "strong", "night", "winter", "special"],
    bestseller: true,
    featured: true
  },
  {
    id: 6,
    name: "Sport Edge",
    brand: "Nivora",
    gender: "men",
    family: "Aquatic & Fresh",
    price: 4800,
    discount: 20,
    rating: 4.2,
    reviews: 203,
    image: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Sea spray, lime, and green tea for days that don't slow down. Our most reordered everyday scent.",
    notes: { top: "Sea Spray, Lime", middle: "Ginger, Green Tea", base: "Musk, Driftwood" },
    tags: ["men", "aquatic", "fresh", "light", "day", "summer", "daily"],
    bestseller: true,
    featured: false
  },
  {
    id: 7,
    name: "Tobacco Vanille Noir",
    brand: "Nivora",
    gender: "men",
    family: "Oriental & Sweet",
    price: 12800,
    discount: 0,
    rating: 4.9,
    reviews: 88,
    image: "https://images.pexels.com/photos/1653085/pexels-photo-1653085.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Cured tobacco leaf, cacao, and dried fruit finished with a slow-burning vanilla base. Rich, unhurried, unforgettable.",
    notes: { top: "Tobacco Leaf, Spice", middle: "Cacao, Dried Fruit", base: "Vanilla, Woods" },
    tags: ["men", "oriental", "sweet", "strong", "night", "winter", "special"],
    bestseller: false,
    featured: false
  },

  // ---------------------- WOMEN ----------------------
  {
    id: 8,
    name: "Blush Rose",
    brand: "Nivora",
    gender: "women",
    family: "Floral",
    price: 7200,
    discount: 10,
    rating: 4.6,
    reviews: 187,
    image: "https://images.pexels.com/photos/7524968/pexels-photo-7524968.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Dewy rose petals and litchi over a soft peony heart. Romantic without trying too hard.",
    notes: { top: "Rose Petals, Litchi", middle: "Peony, Freesia", base: "White Musk" },
    tags: ["women", "floral", "romantic", "light", "day", "spring", "daily"],
    bestseller: true,
    featured: true
  },
  {
    id: 9,
    name: "Jasmine Veil",
    brand: "Nivora",
    gender: "women",
    family: "White Floral",
    price: 8900,
    discount: 0,
    rating: 4.7,
    reviews: 141,
    image: "https://images.pexels.com/photos/3910068/pexels-photo-3910068.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Heady jasmine sambac and tuberose, veiled in silky sandalwood musk. An evening signature.",
    notes: { top: "Bergamot, Mandarin", middle: "Jasmine Sambac, Tuberose", base: "Sandalwood, Musk" },
    tags: ["women", "floral", "moderate", "night", "spring", "special"],
    bestseller: false,
    featured: true
  },
  {
    id: 10,
    name: "Vanilla Musk",
    brand: "Nivora",
    gender: "women",
    family: "Sweet & Musky",
    price: 6700,
    discount: 15,
    rating: 4.5,
    reviews: 220,
    image: "https://images.pexels.com/photos/10415082/pexels-photo-10415082.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "A warm, cozy skin-scent built on caramel orchid and soft vanilla musk. Our best-selling comfort fragrance.",
    notes: { top: "Pear, Bergamot", middle: "Orchid, Caramel", base: "Vanilla, Musk" },
    tags: ["women", "sweet", "musky", "light", "day", "all-season", "daily"],
    bestseller: true,
    featured: false
  },
  {
    id: 11,
    name: "Pink Peony",
    brand: "Nivora",
    gender: "women",
    family: "Floral & Fruity",
    price: 5900,
    discount: 0,
    rating: 4.3,
    reviews: 95,
    image: "https://images.pexels.com/photos/12563417/pexels-photo-12563417.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Juicy raspberry and peony petals, playful and effortless. Made for long days that turn into longer nights.",
    notes: { top: "Raspberry, Peony", middle: "Rose, Lily", base: "Cedar, Musk" },
    tags: ["women", "floral", "fruity", "light", "day", "spring", "daily"],
    bestseller: false,
    featured: false
  },
  {
    id: 12,
    name: "Golden Amber Femme",
    brand: "Nivora",
    gender: "women",
    family: "Oriental",
    price: 10200,
    discount: 0,
    rating: 4.8,
    reviews: 112,
    image: "https://images.pexels.com/photos/10536609/pexels-photo-10536609.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Iris and amber dusted in gold. Opulent, confident, and built to be worn on the nights that matter.",
    notes: { top: "Mandarin, Pink Pepper", middle: "Amber, Iris", base: "Vanilla, Sandalwood" },
    tags: ["women", "oriental", "strong", "night", "winter", "special"],
    bestseller: true,
    featured: false
  },
  {
    id: 13,
    name: "Citrus Bloom",
    brand: "Nivora",
    gender: "women",
    family: "Fresh Floral",
    price: 5200,
    discount: 0,
    rating: 4.2,
    reviews: 88,
    image: "https://images.pexels.com/photos/3785784/pexels-photo-3785784.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Sparkling grapefruit and neroli over soft orange blossom. Light enough for the office, bright enough for brunch.",
    notes: { top: "Grapefruit, Neroli", middle: "Orange Blossom, Jasmine", base: "White Musk" },
    tags: ["women", "citrus", "fresh", "light", "day", "summer", "daily"],
    bestseller: false,
    featured: false
  },
  {
    id: 14,
    name: "Velvet Orchid Noir",
    brand: "Nivora",
    gender: "women",
    family: "Floral & Oriental",
    price: 13500,
    discount: 12,
    rating: 4.9,
    reviews: 133,
    image: "https://images.pexels.com/photos/12402362/pexels-photo-12402362.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Black orchid steeped in dark honey and patchouli. Our most decadent fragrance, saved for unforgettable nights.",
    notes: { top: "Bergamot, Pink Pepper", middle: "Black Orchid, Honey", base: "Vanilla, Patchouli" },
    tags: ["women", "oriental", "floral", "strong", "night", "winter", "special"],
    bestseller: true,
    featured: true
  },

  // ---------------------- UNISEX ----------------------
  {
    id: 15,
    name: "White Tea Zen",
    brand: "Nivora",
    gender: "unisex",
    family: "Fresh & Green",
    price: 7800,
    discount: 0,
    rating: 4.4,
    reviews: 76,
    image: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "White tea, bamboo, and jasmine in perfect quiet balance. Calm, clean, and universally flattering.",
    notes: { top: "White Tea, Bergamot", middle: "Jasmine, Bamboo", base: "Musk, Cedar" },
    tags: ["unisex", "fresh", "green", "light", "day", "all-season", "daily"],
    bestseller: false,
    featured: false
  },
  {
    id: 16,
    name: "Sandalwood Mist",
    brand: "Nivora",
    gender: "unisex",
    family: "Woody",
    price: 9200,
    discount: 10,
    rating: 4.6,
    reviews: 102,
    image: "https://images.pexels.com/photos/17978253/pexels-photo-17978253.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Creamy sandalwood and soft iris, gender-fluid and endlessly wearable. A modern classic in the making.",
    notes: { top: "Cardamom, Pink Pepper", middle: "Sandalwood, Iris", base: "Musk, Amber" },
    tags: ["unisex", "woody", "moderate", "both", "all-season", "daily"],
    bestseller: false,
    featured: true
  },
  {
    id: 17,
    name: "Ocean Breeze",
    brand: "Nivora",
    gender: "unisex",
    family: "Aquatic",
    price: 6100,
    discount: 0,
    rating: 4.3,
    reviews: 64,
    image: "https://images.pexels.com/photos/3785784/pexels-photo-3785784.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Salt air, water lily, and driftwood. Close your eyes and you're at the coast.",
    notes: { top: "Sea Notes, Bergamot", middle: "Water Lily, Sage", base: "Driftwood, Musk" },
    tags: ["unisex", "aquatic", "fresh", "light", "day", "summer", "daily"],
    bestseller: false,
    featured: false
  },
  {
    id: 18,
    name: "Desert Rose Oud",
    brand: "Nivora",
    gender: "unisex",
    family: "Oriental & Woody",
    price: 14200,
    discount: 0,
    rating: 4.9,
    reviews: 77,
    image: "https://images.pexels.com/photos/7524968/pexels-photo-7524968.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Rose and oud under a desert night sky, saffron-warmed and unmistakably rich. Our most awarded scent.",
    notes: { top: "Saffron, Rose", middle: "Oud, Geranium", base: "Amber, Musk" },
    tags: ["unisex", "oriental", "woody", "strong", "night", "all-season", "special"],
    bestseller: true,
    featured: true
  }
];

module.exports = products;