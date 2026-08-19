import React from "react";
import { Link } from "react-router-dom";
import { Wind } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-nivora page-pad not-found-page">
      <Wind size={40} />
      <h1 className="section-title">This scent has evaporated.</h1>
      <p className="ink-sub-light">The page you're looking for doesn't exist, or has drifted elsewhere.</p>
      <Link to="/" className="btn-nivora btn-brass">Back to Home</Link>
    </div>
  );
}