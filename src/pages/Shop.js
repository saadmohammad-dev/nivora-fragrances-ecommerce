import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { getProducts } from "../api";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";

const GENDERS = [
  { value: "all", label: "All" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "unisex", label: "Unisex" }
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useCart();

  const gender = searchParams.get("gender") || "all";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const showWishlistOnly = searchParams.get("wishlist") === "1";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setLoading(true);
    getProducts({ gender, search, sort })
      .then(({ data }) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [gender, search, sort]);

  useEffect(() => setSearchInput(search), [search]);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    updateParam("search", searchInput.trim());
  }

  const visibleProducts = showWishlistOnly
    ? products.filter((p) => wishlist.includes(p.id))
    : products;

  return (
    <div className="shop-page">
      <div className="shop-banner">
        <img src="https://images.pexels.com/photos/5531708/pexels-photo-5531708.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Nivora fragrance shelf display" />
        <div className="shop-banner-scrim" />
        <div className="container-nivora shop-banner-content">
          <span className="eyebrow">The Full Collection</span>
          <h1 className="section-title ink-title">{showWishlistOnly ? "Your Wishlist" : "Shop All Fragrances"}</h1>
        </div>
      </div>

      <div className="container-nivora shop-body">
        <div className="shop-toolbar">
          <div className="shop-gender-filters">
            {GENDERS.map((g) => (
              <button
                key={g.value}
                className={`chip ${gender === g.value ? "chip-active" : ""}`}
                onClick={() => updateParam("gender", g.value === "all" ? "" : g.value)}
              >
                {g.label}
              </button>
            ))}
          </div>

          <form className="shop-search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search by name, family, or note…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit"><SlidersHorizontal size={15} /> Filter</button>
          </form>

          <div className="shop-sort-view">
            <select value={sort} onChange={(e) => updateParam("sort", e.target.value)}>
              <option value="">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <div className="view-toggle">
              <button
                className={viewMode === "grid" ? "view-active" : ""}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                className={viewMode === "list" ? "view-active" : ""}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {loading && <p className="empty-state-text">Loading fragrances…</p>}

        {!loading && visibleProducts.length === 0 && (
          <p className="empty-state-text">
            {showWishlistOnly
              ? "Your wishlist is empty — tap the heart icon on any product to save it here."
              : "No fragrances matched your search. Try a different keyword or clear the filters."}
          </p>
        )}

        {!loading && visibleProducts.length > 0 && (
          <div className={viewMode === "grid" ? "product-grid" : "product-list"}>
            {visibleProducts.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} layout={viewMode} />
            ))}
          </div>
        )}
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}