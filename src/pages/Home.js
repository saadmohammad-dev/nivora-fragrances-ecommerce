import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Wand2, Truck, ShieldCheck, Quote } from "lucide-react";
import { getFeaturedProducts, getBestsellers } from "../api";
import ProductCarousel from "../components/ProductCarousel";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";

const TESTIMONIALS = [
  { name: "Ayesha K.", city: "Lahore", text: "Vanilla Musk has become my everyday signature. It gets compliments before I even finish saying hello.", rating: 5 },
  { name: "Bilal R.", city: "Karachi", text: "Took the scent quiz not expecting much and it nailed Midnight Leather for me first try. Genuinely impressed.", rating: 5 },
  { name: "Hina S.", city: "Islamabad", text: "The Signature membership paid for itself in the first order. Free shipping plus the discount is a no-brainer.", rating: 4 },
  { name: "Umar F.", city: "Faisalabad", text: "Oud Royale lasted through a 9-hour work day. This is the real deal, not a watered-down knockoff.", rating: 5 }
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([getFeaturedProducts(), getBestsellers()])
      .then(([featRes, bestRes]) => {
        if (!mounted) return;
        setFeatured(featRes.data);
        setBestsellers(bestRes.data);
      })
      .catch(() => {
        // Fails silently to keep the layout intact — a friendly inline
        // message covers the empty state below.
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="hero-media">
          <img
            src="https://images.pexels.com/photos/28664164/pexels-photo-28664164.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="An elegant boutique display of perfume bottles arranged by fragrance note"
          />
          <div className="hero-scrim" />
        </div>
        <div className="container-nivora hero-content">
          <span className="eyebrow hero-eyebrow">Nivora Fragrances</span>
          <h1 className="hero-title">
            Every great scent tells a story <em>in three parts.</em>
          </h1>
          <p className="hero-sub">
            Top notes to open. A heart to hold your attention. A base that lingers long after
            you've left the room. Discover fragrances built the way perfume was meant to be made —
            for men, for women, and for everyone in between.
          </p>
          <div className="hero-cta-row">
            <Link to="/shop" className="btn-nivora btn-brass">Shop the Collection</Link>
            <Link to="/quiz" className="btn-nivora btn-outline btn-outline-hero">
              <Wand2 size={16} /> Take the Scent Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- TRUST STRIP ---------- */}
      <section className="trust-strip">
        <div className="container-nivora trust-strip-inner">
          <div><Truck size={18} /> Free delivery over Rs. 10,000</div>
          <div><ShieldCheck size={18} /> 7-day easy returns</div>
          <div><Sparkles size={18} /> 18 original in-house fragrances</div>
        </div>
      </section>

      {/* ---------- SHOP BY CATEGORY ---------- */}
      <section className="section-block">
        <div className="container-nivora">
          <span className="eyebrow">Shop By Category</span>
          <h2 className="section-title mb-block">Find a fragrance for everyone</h2>
          <div className="category-grid">
            <Link to="/shop?gender=men" className="category-card category-men">
              <img src="https://images.pexels.com/photos/17978253/pexels-photo-17978253.jpeg?auto=compress&cs=tinysrgb&w=700" alt="Men's fragrances" />
              <div className="category-card-label"><span>Men</span><small>7 fragrances</small></div>
            </Link>
            <Link to="/shop?gender=women" className="category-card category-women">
              <img src="https://images.pexels.com/photos/3910068/pexels-photo-3910068.jpeg?auto=compress&cs=tinysrgb&w=700" alt="Women's fragrances" />
              <div className="category-card-label"><span>Women</span><small>7 fragrances</small></div>
            </Link>
            <Link to="/shop?gender=unisex" className="category-card category-unisex">
              <img src="https://images.pexels.com/photos/4925718/pexels-photo-4925718.jpeg?auto=compress&cs=tinysrgb&w=700" alt="Unisex fragrances" />
              <div className="category-card-label"><span>Unisex</span><small>4 fragrances</small></div>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FEATURED CAROUSEL ---------- */}
      <section className="section-block section-block-ink">
        <div className="container-nivora">
          <span className="eyebrow">Featured</span>
          <h2 className="section-title mb-block ink-title">This season's edit</h2>
          {!loading && featured.length > 0 && (
            <ProductCarousel products={featured} onQuickView={setQuickViewProduct} />
          )}
          {!loading && featured.length === 0 && (
            <p className="empty-state-text ink-title">
              Couldn't load featured perfumes — make sure the backend server is running on port 5000.
            </p>
          )}
        </div>
      </section>

      {/* ---------- BESTSELLERS GRID ---------- */}
      <section className="section-block">
        <div className="container-nivora">
          <span className="eyebrow">Customer Favourites</span>
          <h2 className="section-title mb-block">Bestsellers right now</h2>
          <div className="product-grid">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
            ))}
          </div>
          <div className="center-cta">
            <Link to="/shop" className="btn-nivora btn-outline">View Full Collection</Link>
          </div>
        </div>
      </section>

      {/* ---------- MEMBERSHIP BANNER ---------- */}
      <section className="membership-banner">
        <div className="container-nivora membership-banner-inner">
          <div>
            <span className="eyebrow">Nivora Membership</span>
            <h2 className="section-title ink-title">Join once. Save on every order after.</h2>
            <p className="ink-sub">
              Free shipping, member-only discounts, and early access to new fragrances — starting
              free, upgrading whenever you're ready.
            </p>
          </div>
          <Link to="/membership" className="btn-nivora btn-brass">See Membership Plans</Link>
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="section-block">
        <div className="container-nivora">
          <span className="eyebrow">What Customers Say</span>
          <h2 className="section-title mb-block">Loved across Pakistan</h2>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t) => (
              <div className="testimonial-card" key={t.name}>
                <Quote size={22} className="testimonial-quote-icon" />
                <p>"{t.text}"</p>
                <div className="testimonial-footer">
                  <strong>{t.name}</strong>
                  <span>{t.city} · {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- QUIZ CTA ---------- */}
      <section className="quiz-cta">
        <div className="container-nivora quiz-cta-inner">
          <Wand2 size={30} />
          <h2 className="section-title ink-title">Not sure where to start?</h2>
          <p className="ink-sub">Answer 8 quick questions and we'll match you to your perfect scent.</p>
          <Link to="/quiz" className="btn-nivora btn-brass">Take the 2-Minute Quiz</Link>
        </div>
      </section>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}