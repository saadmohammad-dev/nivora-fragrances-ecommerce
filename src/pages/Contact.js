import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { sendContactMessage } from "../api";

const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { data } = await sendContactMessage(form);
      setResult(data.message);
      setForm(EMPTY);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong sending your message.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-nivora page-pad contact-page">
      <span className="eyebrow">Get In Touch</span>
      <h1 className="section-title mb-block">We'd love to hear from you</h1>

      <div className="contact-grid">
        <div className="contact-info-col">
          <div className="contact-info-item"><MapPin size={20} /><div><strong>Visit Us</strong><p>12 Gulberg Boulevard, Lahore, Pakistan</p></div></div>
          <div className="contact-info-item"><Phone size={20} /><div><strong>Call Us</strong><p>+92 300 1234567</p></div></div>
          <div className="contact-info-item"><Mail size={20} /><div><strong>Email Us</strong><p>hello@nivorafragrances.pk</p></div></div>
          <div className="contact-info-item"><Clock size={20} /><div><strong>Store Hours</strong><p>Mon–Sat, 10am – 8pm</p></div></div>

          <div className="stylized-map" aria-hidden="true">
            <div className="stylized-map-pin"><MapPin size={22} /></div>
            <span>12 Gulberg Boulevard, Lahore</span>
          </div>
        </div>

        <div className="contact-form-col">
          {result ? (
            <div className="membership-success">
              <h3>{result}</h3>
            </div>
          ) : (
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  Full Name
                  <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" />
                </label>
                <label>
                  Email Address
                  <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" />
                </label>
                <label className="form-grid-full">
                  Subject
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" />
                </label>
                <label className="form-grid-full">
                  Message
                  <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Tell us more…" />
                </label>
              </div>
              {error && <p className="form-error">{error}</p>}
              <button type="submit" className="btn-nivora btn-brass" disabled={submitting}>
                <Send size={15} /> {submitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}