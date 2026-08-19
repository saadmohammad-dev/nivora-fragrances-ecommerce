import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products, onQuickView }) {
  const trackRef = useRef(null);

  // Direct DOM manipulation: we grab the scroll container via a ref and
  // move it manually, rather than re-rendering React state for every frame.
  function scrollByCards(direction) {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.querySelector(".carousel-slide")?.offsetWidth || 280;
    track.scrollBy({ left: direction * (cardWidth + 20), behavior: "smooth" });
  }

  return (
    <div className="carousel-wrap">
      <button className="carousel-arrow carousel-arrow-left" onClick={() => scrollByCards(-1)} aria-label="Scroll left">
        <ChevronLeft size={20} />
      </button>
      <div className="carousel-track" ref={trackRef}>
        {products.map((p) => (
          <div className="carousel-slide" key={p.id}>
            <ProductCard product={p} onQuickView={onQuickView} />
          </div>
        ))}
      </div>
      <button className="carousel-arrow carousel-arrow-right" onClick={() => scrollByCards(1)} aria-label="Scroll right">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}