import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import BackToTop from "./components/BackToTop";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Quiz from "./pages/Quiz";
import Cart from "./pages/Cart";
import Membership from "./pages/Membership";
import TrackOrder from "./pages/TrackOrder";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import "./App.css";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          <a href="#main-content" className="skip-link">Skip to content</a>

          <Navbar onOpenChat={() => setChatOpen(true)} />

          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/track" element={<TrackOrder />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
          <BackToTop />
          <Chatbot isOpen={chatOpen} onOpen={() => setChatOpen(true)} onClose={() => setChatOpen(false)} />
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}