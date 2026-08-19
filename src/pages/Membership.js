import React, { useState } from "react";
import { Check, Crown, Sparkle, Star } from "lucide-react";
import { subscribeToPlan } from "../api";
import { useToast } from "../context/ToastContext";

const PLANS = [
  {
    id: "essence",
    icon: Sparkle,
    name: "Essence",
    price: "Free",
    tagline: "For everyone who shops with us",
    perks: ["Birthday surprise gift", "Early access to sales", "Member-only newsletter"]
  },
  {
    id: "signature",
    icon: Star,
    name: "Signature",
    price: "Rs. 1,499/mo",
    tagline: "Our most popular plan",
    perks: ["Free delivery on every order", "10% off all fragrances", "1 discovery sample monthly", "Everything in Essence"],
    highlighted: true
  },
  {
    id: "prestige",
    icon: Crown,
    name: "Prestige",
    price: "Rs. 3,499/mo",
    tagline: "For true fragrance collectors",
    perks: [
      "Free express delivery",
      "18% off all fragrances",
      "2 full-size bottles per year",
      "Dedicated fragrance concierge",
      "Everything in Signature"
    ]
  }
];

export default function Membership() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const { showToast } = useToast();

  function choosePlan(planId) {
    setSelectedPlan(planId);
    setResult(null);
    setTimeout(() => {
      document.getElementById("membership-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await subscribeToPlan({ ...form, plan: selectedPlan });
      setResult(data);
      showToast(data.message);
      setForm({ name: "", email: "" });
    } catch (err) {
      showToast(err.response?.data?.message || "Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="membership-page">
      <div className="container-nivora page-pad membership-header">
        <span className="eyebrow">Nivora Membership</span>
        <h1 className="section-title">Join once. Save on every order after.</h1>
        <p className="ink-sub-light">Pick the tier that fits how often you shop — upgrade, downgrade, or cancel anytime.</p>
      </div>

      <div className="container-nivora plans-grid">
        {PLANS.map((plan) => {
          const Icon = plan.icon;
          return (
            <div className={`plan-card ${plan.highlighted ? "plan-highlighted" : ""} ${selectedPlan === plan.id ? "plan-selected" : ""}`} key={plan.id}>
              {plan.highlighted && <span className="plan-ribbon">Most Popular</span>}
              <Icon size={26} />
              <h3>{plan.name}</h3>
              <p className="plan-tagline">{plan.tagline}</p>
              <div className="plan-price">{plan.price}</div>
              <ul className="plan-perks">
                {plan.perks.map((perk) => (
                  <li key={perk}><Check size={15} /> {perk}</li>
                ))}
              </ul>
              <button
                className={`btn-nivora btn-block ${plan.highlighted ? "btn-brass" : "btn-outline"}`}
                onClick={() => choosePlan(plan.id)}
              >
                Choose {plan.name}
              </button>
            </div>
          );
        })}
      </div>

      {selectedPlan && (
        <div className="container-nivora" id="membership-form">
          <div className="membership-form-box">
            {result ? (
              <div className="membership-success">
                <h3>{result.message}</h3>
                {result.benefits && (
                  <ul className="plan-perks">
                    {result.benefits.map((b) => <li key={b}><Check size={15} /> {b}</li>)}
                  </ul>
                )}
              </div>
            ) : (
              <>
                <h3>Confirm your {PLANS.find((p) => p.id === selectedPlan)?.name} membership</h3>
                <form onSubmit={handleSubmit} className="inline-form-row">
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <button type="submit" className="btn-nivora btn-brass" disabled={submitting}>
                    {submitting ? "Confirming…" : "Confirm"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}