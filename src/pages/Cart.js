import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, RefreshCw } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { placeOrder } from "../api";
import { formatPKR } from "../utils";

const EMPTY_FORM = { name: "", phone: "", email: "", address: "", city: "", zip: "", notes: "" };

export default function Cart() {
  const { cart, removeFromCart, updateQty, lineTotal, cartSubtotal, cartTotal, shippingFee, grandTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    const payload = {
      ...form,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        subscribeAndSave: item.subscribeAndSave
      })),
      total: grandTotal,
      subscription: cart.some((item) => item.subscribeAndSave)
    };

    try {
      const { data } = await placeOrder(payload);
      setConfirmation(data);
      clearCart();
      showToast("Order placed successfully!");
    } catch (err) {
      setFormError(err.response?.data?.message || "Something went wrong placing your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div className="container-nivora page-pad order-confirm">
        <ShoppingBag size={40} />
        <h1 className="section-title">{confirmation.message}</h1>
        <p className="ink-sub-light">Your tracking ID is:</p>
        <div className="tracking-id-box">{confirmation.trackingId}</div>
        <p className="ink-sub-light">Save this ID to follow your order's live status.</p>
        <div className="hero-cta-row confirm-cta-row">
          <button className="btn-nivora btn-brass" onClick={() => navigate(`/track?id=${confirmation.trackingId}`)}>
            Track This Order
          </button>
          <Link to="/shop" className="btn-nivora btn-outline">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container-nivora page-pad empty-cart">
        <ShoppingBag size={40} />
        <h1 className="section-title">Your bag is empty</h1>
        <p className="ink-sub-light">Looks like you haven't found your scent yet.</p>
        <Link to="/shop" className="btn-nivora btn-brass">Browse Fragrances</Link>
      </div>
    );
  }

  return (
    <div className="container-nivora page-pad">
      <h1 className="section-title mb-block">Your Bag</h1>

      <div className="cart-grid">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-row" key={`${item.id}-${item.subscribeAndSave}`}>
              <img src={item.image} alt={item.name} />
              <div className="cart-row-info">
                <h3>{item.name}</h3>
                {item.subscribeAndSave && <span className="chip chip-active chip-tiny"><RefreshCw size={11} /> Subscribe &amp; Save</span>}
                <div className="qty-stepper qty-stepper-sm">
                  <button onClick={() => updateQty(item.id, item.subscribeAndSave, item.qty - 1)} aria-label="Decrease quantity">-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.subscribeAndSave, item.qty + 1)} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cart-row-price">
                <strong>{formatPKR(lineTotal(item))}</strong>
                <button className="cart-remove-btn" onClick={() => removeFromCart(item.id, item.subscribeAndSave)} aria-label="Remove item">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-line"><span>Subtotal</span><span>{formatPKR(cartSubtotal)}</span></div>
          {cartSubtotal !== cartTotal && (
            <div className="summary-line summary-line-discount"><span>Discounts</span><span>-{formatPKR(cartSubtotal - cartTotal)}</span></div>
          )}
          <div className="summary-line"><span>Shipping</span><span>{shippingFee === 0 ? "Free" : formatPKR(shippingFee)}</span></div>
          <hr className="divider-hairline" />
          <div className="summary-line summary-total"><span>Total</span><span>{formatPKR(grandTotal)}</span></div>

          {!showCheckout && (
            <button className="btn-nivora btn-brass btn-block" onClick={() => setShowCheckout(true)}>
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>

      {showCheckout && (
        <div className="checkout-form-wrap">
          <h2 className="section-title mb-block">Delivery Details</h2>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Full Name
                <input name="name" required value={form.name} onChange={handleChange} placeholder="Ayesha Khan" />
              </label>
              <label>
                Phone Number
                <input name="phone" required value={form.phone} onChange={handleChange} placeholder="03xx xxxxxxx" />
              </label>
              <label className="form-grid-full">
                Email Address
                <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" />
              </label>
              <label className="form-grid-full">
                Street Address
                <input name="address" required value={form.address} onChange={handleChange} placeholder="House #, street, area" />
              </label>
              <label>
                City
                <input name="city" required value={form.city} onChange={handleChange} placeholder="Lahore" />
              </label>
              <label>
                Zip / Postal Code
                <input name="zip" required value={form.zip} onChange={handleChange} placeholder="54000" />
              </label>
              <label className="form-grid-full">
                Order Notes (optional)
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Delivery instructions, gift note, etc." />
              </label>
            </div>

            {formError && <p className="form-error">{formError}</p>}

            <button type="submit" className="btn-nivora btn-brass btn-block" disabled={submitting}>
              {submitting ? "Placing your order…" : `Place Order — ${formatPKR(grandTotal)}`}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}