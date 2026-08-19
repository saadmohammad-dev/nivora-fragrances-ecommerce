import React from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { formatPKR, discountedPrice, renderStars } from "../utils";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function ProductCard({ product, onQuickView, layout = "grid" }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { showToast } = useToast();
  const wished = isInWishlist(product.id);

  function handleAddToCart(e) {
    e.preventDefault();
    addToCart(product, 1);
    showToast(`${product.name} added to your bag.`);
  }

  function handleWishlist(e) {
    e.preventDefault();
    toggleWishlist(product.id);
    showToast(wished ? `Removed ${product.name} from wishlist.` : `Saved ${product.name} to wishlist.`, "info");
  }

  function handleQuickView(e) {
    e.preventDefault();
    onQuickView && onQuickView(product);
  }

  const finalPrice = discountedPrice(product.price, product.discount);

  if (layout === "list") {
    return (
      <div className="product-card product-card-list">
        <Link to={`/product/${product.id}`} className="pc-image-wrap pc-image-wrap-list">
          {product.discount > 0 && <span className="badge-discount">-{product.discount}%</span>}
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <div className="pc-list-body">
          <div>
            <span className="eyebrow">{product.family}</span>
            <h3 className="pc-name">{product.name}</h3>
            <p className="stars">{renderStars(product.rating)} <span className="pc-reviews">({product.reviews})</span></p>
            <p className="pc-desc-list">{product.description}</p>
          </div>
          <div className="pc-list-actions">
            <div className="price-row">
              <span className="price-current">{formatPKR(finalPrice)}</span>
              {product.discount > 0 && <span className="price-original">{formatPKR(product.price)}</span>}
            </div>
            <div className="pc-btn-row">
              <Link to={`/product/${product.id}`} className="btn-nivora btn-outline btn-sm">Details</Link>
              <button className="btn-nivora btn-brass btn-sm" onClick={handleAddToCart}>
                <ShoppingBag size={15} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card">
      <div className="pc-image-wrap">
        {product.discount > 0 && <span className="badge-discount">-{product.discount}%</span>}
        {product.bestseller && <span className="badge-bestseller">Bestseller</span>}
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <div className="pc-hover-actions">
          <button className="pc-icon-btn" onClick={handleWishlist} aria-label="Toggle wishlist" title="Wishlist">
            <Heart size={16} fill={wished ? "currentColor" : "none"} />
          </button>
          <button className="pc-icon-btn" onClick={handleQuickView} aria-label="Quick view" title="Open / Quick View">
            <Eye size={16} />
          </button>
        </div>
        <div className="pc-notes-reveal">
          <span><b>Top</b> {product.notes.top}</span>
          <span><b>Mid</b> {product.notes.middle}</span>
          <span><b>Base</b> {product.notes.base}</span>
        </div>
      </div>
      <div className="pc-body">
        <span className="eyebrow">{product.family}</span>
        <h3 className="pc-name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="stars">{renderStars(product.rating)} <span className="pc-reviews">({product.reviews})</span></p>
        <div className="price-row">
          <span className="price-current">{formatPKR(finalPrice)}</span>
          {product.discount > 0 && <span className="price-original">{formatPKR(product.price)}</span>}
        </div>
        <div className="pc-btn-row">
          <Link to={`/product/${product.id}`} className="btn-nivora btn-outline btn-sm btn-block">Details</Link>
          <button className="btn-nivora btn-brass btn-sm btn-block" onClick={handleAddToCart}>
            <ShoppingBag size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}