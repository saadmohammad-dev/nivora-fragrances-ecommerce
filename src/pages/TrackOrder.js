import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Package, Search, CheckCircle2, MapPin } from "lucide-react";
import { trackOrder } from "../api";
import { formatPKR } from "../utils";

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get("id") || "");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const runTrack = useCallback((id) => {
    if (!id.trim()) return;
    setLoading(true);
    setError("");
    trackOrder(id.trim())
      .then(({ data }) => setStatus(data))
      .catch((err) => {
        setStatus(null);
        setError(err.response?.data?.message || "Couldn't fetch tracking info.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Auto-track on load if a tracking id came in via ?id=
  useEffect(() => {
    if (searchParams.get("id")) runTrack(searchParams.get("id"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // "Live" tracker: poll every 5 seconds while we have a tracking id loaded,
  // so the stage visibly advances during a demo without a manual refresh.
  useEffect(() => {
    if (!status || status.isDelivered) return;
    const interval = setInterval(() => runTrack(status.trackingId), 5000);
    return () => clearInterval(interval);
  }, [status, runTrack]);

  function handleSubmit(e) {
    e.preventDefault();
    runTrack(trackingId);
  }

  return (
    <div className="container-nivora page-pad track-page">
      <span className="eyebrow">Live Order Tracking</span>
      <h1 className="section-title mb-block">Where's my order?</h1>

      <form className="track-search-form" onSubmit={handleSubmit}>
        <Package size={18} />
        <input
          type="text"
          placeholder="Enter your tracking ID, e.g. NIV-AB12CD"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          <Search size={16} /> {loading ? "Searching…" : "Track"}
        </button>
      </form>

      {error && <p className="form-error">{error}</p>}

      {status && (
        <div className="track-result">
          <div className="track-result-header">
            <div>
              <span className="eyebrow">Tracking ID</span>
              <h3>{status.trackingId}</h3>
            </div>
            <div>
              <span className="eyebrow">Order Total</span>
              <h3>{formatPKR(status.total)}</h3>
            </div>
            <div>
              <span className="eyebrow">Delivering To</span>
              <h3>{status.city}</h3>
            </div>
          </div>

          <div className="track-stepper">
            {status.stages.map((stage, i) => (
              <div key={stage.key} className={`track-step ${stage.completed ? "step-complete" : ""} ${i === status.currentStageIndex ? "step-current" : ""}`}>
                <div className="track-step-dot">
                  {stage.completed ? <CheckCircle2 size={18} /> : <span>{i + 1}</span>}
                </div>
                <div className="track-step-label">
                  <strong>{stage.label}</strong>
                  {i === status.currentStageIndex && (
                    <span className="track-step-location"><MapPin size={13} /> {stage.location}</span>
                  )}
                </div>
                {i < status.stages.length - 1 && <div className="track-step-line" />}
              </div>
            ))}
          </div>

          <p className="track-live-note">
            {status.isDelivered
              ? "Your order has been delivered. Enjoy your new fragrance! 🌸"
              : "This tracker updates automatically every few seconds — no need to refresh."}
          </p>
        </div>
      )}
    </div>
  );
}