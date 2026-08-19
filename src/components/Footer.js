import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Send } from "lucide-react";
import { subscribeToPlan } from "../api";
import { useToast } from "../context/ToastContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  async function handleNewsletter(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const { data } = await subscribeToPlan({ email });
      showToast(data.message, "success");
      setEmail("");
    } catch (err) {
      showToast(err.response?.data?.message || "Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="nivora-footer">
      <div className="container-nivora footer-grid">
        <div className="footer-col footer-brand">
          <span className="brand-word footer-brand-word">NIVORA</span>
          <p>
            Original fragrances, formulated in-house and shipped across Pakistan. Every bottle is
            built on a real top / middle / base note pyramid — a scent that evolves with your day,
            not one that fades flat.
          </p>
          <div className="footer-socials">
            <a href="#top" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#top" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#top" aria-label="Twitter"><Twitter size={18} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop All</Link></li>
            <li><Link to="/shop?gender=men">Men's Fragrances</Link></li>
            <li><Link to="/shop?gender=women">Women's Fragrances</Link></li>
            <li><Link to="/quiz">Scent Quiz</Link></li>
            <li><Link to="/membership">Membership</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><Link to="/track">Track My Order</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/contact">Shipping &amp; Delivery</Link></li>
            <li><Link to="/contact">Returns &amp; Exchanges</Link></li>
            <li><Link to="/contact">FAQs</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Get in Touch</h4>
          <ul className="footer-contact-list">
            <li><MapPin size={15} /> 12 Gulberg Boulevard, Lahore, Pakistan</li>
            <li><Phone size={15} /> +92 300 1234567</li>
            <li><Mail size={15} /> hello@nivorafragrances.pk</li>
          </ul>
          <form className="footer-newsletter" onSubmit={handleNewsletter}>
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" disabled={loading} aria-label="Subscribe to newsletter">
              <Send size={15} />
            </button>
          </form>
          <span className="footer-newsletter-hint">Get 10% off your first order.</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container-nivora footer-bottom-inner">
          <span>© {new Date().getFullYear()} Nivora Fragrances. All rights reserved.</span>
          <span className="footer-payments">Cash on Delivery · Cards · JazzCash · Easypaisa</span>
        </div>
      </div>
    </footer>
  );
}