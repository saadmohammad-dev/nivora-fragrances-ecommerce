import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, Moon, Sun, Menu, X, MessageCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Scent Quiz", to: "/quiz" },
  { label: "Membership", to: "/membership" },
  { label: "Track Order", to: "/track" },
  { label: "Contact", to: "/contact" }
];

export default function Navbar({ onOpenChat }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { cartCount, wishlist } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Sticky navbar with a scroll-triggered shadow/shrink effect — classic
  // DOM manipulation via a window scroll listener.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    setMenuOpen(false);
  }

  return (
    <header className={`nivora-navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container-nivora navbar-inner">
        <Link to="/" className="brand-mark" onClick={() => setMenuOpen(false)}>
          <span className="brand-word">NIVORA</span>
          <span className="brand-sub">FRAGRANCES</span>
        </Link>

        <nav className={`navbar-links ${menuOpen ? "links-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <button
            className="navbar-chat-link"
            onClick={() => {
              setMenuOpen(false);
              onOpenChat();
            }}
          >
            <MessageCircle size={15} /> Chat with Us
          </button>

          <form className="navbar-search navbar-search-mobile" onSubmit={handleSearch}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search perfumes…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </nav>

        <div className="navbar-actions">
          <form className="navbar-search navbar-search-desktop" onSubmit={handleSearch}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search perfumes…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle dark mode" title="Toggle theme">
            {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
          </button>

          <Link to="/shop?wishlist=1" className="icon-btn icon-btn-badge" aria-label="Wishlist" title="Wishlist">
            <Heart size={19} />
            {wishlist.length > 0 && <span className="icon-badge">{wishlist.length}</span>}
          </Link>

          <Link to="/cart" className="icon-btn icon-btn-badge" aria-label="Cart" title="Cart">
            <ShoppingBag size={19} />
            {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
          </Link>

          <button className="icon-btn navbar-burger" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}