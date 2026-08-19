import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, ShoppingBag, RefreshCw, ChevronRight } from "lucide-react";
import { getProductById, getProducts } from "../api";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { formatPKR, discountedPrice, renderStars } from "../utils";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";

const SIZE_OPTIONS = [
  { label: "50ml", multiplier: 0.65 },
  { label: "100ml", multiplier: 1 }
];

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [size, setSize] = useState("100ml");
  const [qty, setQty] = useState(1);
  const [subscribeAndSave, setSubscribeAndSave] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setSize("100ml");
    setQty(1);
    setSubscribeAndSave(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    getProductById(id)
      .then(({ data }) => {
        setProduct(data);
        return getProducts({ gender: data.gender });
      })
      .then(({ data }) => {
        setRelated(data.filter((p) => p.id !== parseInt(id, 10)).slice(0, 4));
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container-nivora page-pad"><p className="empty-state-text">Loading fragrance…</p></div>;

  if (notFound || !product) {
    return (
      <div className="container-nivora page-pad">
        <p className="empty-state-text">
          We couldn't find that fragrance. It may have been discontinued.{" "}
          <Link to="/shop">Back to Shop →</Link>
        </p>
      </div>
    );
  }

  const sizeMultiplier = SIZE_OPTIONS.find((s) => s.label === size).multiplier;
  const basePrice = product.price * sizeMultiplier;
  const finalPrice = discountedPrice(basePrice, subscribeAndSave ? Math.max(product.discount, 10) : product.discount);
  const wished = isInWishlist(product.id);

  function handleAddToCart() {
    addToCart({ ...product, price: basePrice }, qty, subscribeAndSave);
    showToast(`${product.name} (${size} x${qty}) added to your bag.`);
  }

  return (
    <div className="product-details-page">
      <div className="container-nivora breadcrumb">
        <Link to="/">Home</Link> <ChevronRight size={13} />{" "}
        <Link to={`/shop?gender=${product.gender}`}>Shop</Link> <ChevronRight size={13} />{" "}
        <span>{product.name}</span>
      </div>

      <div className="container-nivora pd-grid">
        <div className="pd-image">
          {product.discount > 0 && <span className="badge-discount">-{product.discount}%</span>}
          {product.bestseller && <span className="badge-bestseller">Bestseller</span>}
          <img src={product.image} alt={product.name} />
        </div>

        <div className="pd-info">
          <span className="eyebrow">{product.family} · {product.gender}</span>
          <h1 className="pd-name">{product.name}</h1>
          <p className="stars">{renderStars(product.rating)} <span className="pc-reviews">({product.reviews} reviews)</span></p>
          <p className="pd-desc">{product.description}</p>

          <div className="pd-notes">
            <div><span className="eyebrow">Top Notes</span><p>{product.notes.top}</p></div>
            <div><span className="eyebrow">Middle Notes</span><p>{product.notes.middle}</p></div>
            <div><span className="eyebrow">Base Notes</span><p>{product.notes.base}</p></div>
          </div>

          <hr className="divider-hairline" />

          <div className="pd-size-select">
            <span className="eyebrow">Size</span>
            <div className="size-chip-row">
              {SIZE_OPTIONS.map((s) => (
                <button
                  key={s.label}
                  className={`chip ${size === s.label ? "chip-active" : ""}`}
                  onClick={() => setSize(s.label)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="price-row pd-price">
            <span className="price-current">{formatPKR(finalPrice)}</span>
            {(product.discount > 0 || subscribeAndSave) && (
              <span className="price-original">{formatPKR(basePrice)}</span>
            )}
          </div>

          <label className="subscribe-save-box">
            <input
              type="checkbox"
              checked={subscribeAndSave}
              onChange={(e) => setSubscribeAndSave(e.target.checked)}
            />
            <div>
              <strong><RefreshCw size={14} /> Subscribe &amp; Save</strong>
              <p>Get this bottle delivered every month and save an extra {Math.max(product.discount, 10)}% — cancel anytime from your account.</p>
            </div>
          </label>

          <div className="pd-actions">
            <div className="qty-stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">-</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
            </div>
            <button className="btn-nivora btn-brass" onClick={handleAddToCart}>
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button
              className={`btn-nivora btn-outline ${wished ? "btn-wished" : ""}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={16} fill={wished ? "currentColor" : "none"} /> {wished ? "Saved" : "Wishlist"}
            </button>
          </div>

          <p className="pd-shipping-note">Free delivery on orders over Rs. 10,000 · 7-day easy returns</p>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container-nivora related-section">
          <span className="eyebrow">You Might Also Like</span>
          <h2 className="section-title mb-block">More from {product.gender === "men" ? "Men's" : product.gender === "women" ? "Women's" : "Unisex"}</h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      )}

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}