import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X, ShoppingBag, Heart } from "lucide-react";
import { formatPKR, discountedPrice, renderStars } from "../utils";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { showToast } = useToast();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const finalPrice = discountedPrice(product.price, product.discount);
  const wished = isInWishlist(product.id);

  function handleAdd() {
    addToCart(product, qty);
    showToast(`${product.name} (x${qty}) added to your bag.`);
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close quick view">
          <X size={20} />
        </button>
        <div className="qv-image">
          {product.discount > 0 && <span className="badge-discount">-{product.discount}%</span>}
          <img src={product.image} alt={product.name} />
        </div>
        <div className="qv-body">
          <span className="eyebrow">{product.family}</span>
          <h2 className="qv-name">{product.name}</h2>
          <p className="stars">{renderStars(product.rating)} <span className="pc-reviews">({product.reviews} reviews)</span></p>
          <p className="qv-desc">{product.description}</p>

          <div className="qv-notes">
            <div><span className="eyebrow">Top</span><p>{product.notes.top}</p></div>
            <div><span className="eyebrow">Middle</span><p>{product.notes.middle}</p></div>
            <div><span className="eyebrow">Base</span><p>{product.notes.base}</p></div>
          </div>

          <div className="price-row qv-price">
            <span className="price-current">{formatPKR(finalPrice)}</span>
            {product.discount > 0 && <span className="price-original">{formatPKR(product.price)}</span>}
          </div>

          <div className="qv-actions">
            <div className="qty-stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">-</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
            </div>
            <button className="btn-nivora btn-brass" onClick={handleAdd}>
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button className="btn-nivora btn-outline" onClick={() => toggleWishlist(product.id)}>
              <Heart size={16} fill={wished ? "currentColor" : "none"} />
            </button>
          </div>

          <Link to={`/product/${product.id}`} className="qv-full-link" onClick={onClose}>
            View full details &amp; subscription options →
          </Link>
        </div>
      </div>
    </div>
  );
}