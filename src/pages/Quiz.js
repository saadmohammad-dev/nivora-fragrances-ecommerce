import React, { useEffect, useState } from "react";
import { Wand2, RotateCcw } from "lucide-react";
import { getProducts } from "../api";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import "./Quiz.css";

const QUESTIONS = [
  {
    question: "Who are you shopping for?",
    options: [
      { label: "Myself — a men's fragrance", tags: ["men"] },
      { label: "Myself — a women's fragrance", tags: ["women"] },
      { label: "A unisex pick or a gift", tags: ["unisex"] },
      { label: "Not sure, surprise me", tags: [] }
    ]
  },
  {
    question: "Which scent family pulls you in first?",
    options: [
      { label: "Floral", tags: ["floral"] },
      { label: "Woody", tags: ["woody"] },
      { label: "Oriental & Spicy", tags: ["oriental"] },
      { label: "Fresh & Citrus", tags: ["citrus", "fresh"] },
      { label: "Aquatic & Green", tags: ["aquatic", "fresh", "green"] },
      { label: "Sweet & Musky", tags: ["sweet", "musky"] }
    ]
  },
  {
    question: "How intense do you like a fragrance?",
    options: [
      { label: "Light & subtle", tags: ["light"] },
      { label: "Balanced, noticeable up close", tags: ["moderate"] },
      { label: "Bold — I want it to announce me", tags: ["strong"] }
    ]
  },
  {
    question: "When do you usually wear fragrance?",
    options: [
      { label: "Daytime", tags: ["day"] },
      { label: "Evenings & nights out", tags: ["night"] },
      { label: "Both, equally", tags: ["both", "day", "night"] }
    ]
  },
  {
    question: "Pick the occasion you're shopping for",
    options: [
      { label: "Everyday wear", tags: ["daily"] },
      { label: "Office / work", tags: ["daily"] },
      { label: "Parties & nights out", tags: ["party", "night"] },
      { label: "Special occasions", tags: ["special"] }
    ]
  },
  {
    question: "What's your favourite season?",
    options: [
      { label: "Summer", tags: ["summer"] },
      { label: "Winter", tags: ["winter"] },
      { label: "Spring", tags: ["spring"] },
      { label: "I wear scent year-round", tags: ["all-season"] }
    ]
  },
  {
    question: "Pick the vibe that feels most like you",
    options: [
      { label: "Romantic & elegant", tags: ["floral", "romantic", "moderate"] },
      { label: "Bold & confident", tags: ["oriental", "strong"] },
      { label: "Fresh & energetic", tags: ["citrus", "aquatic", "light"] },
      { label: "Classic & timeless", tags: ["woody", "moderate"] }
    ]
  },
  {
    question: "What's your budget?",
    options: [
      { label: "Under Rs. 6,000", budget: "under6000" },
      { label: "Rs. 6,000 – 10,000", budget: "6000-10000" },
      { label: "Above Rs. 10,000", budget: "above10000" },
      { label: "No limit — show me the best", budget: "no-limit" }
    ]
  }
];

function scoreProduct(product, answerTags, budget) {
  let score = 0;
  answerTags.forEach((tag) => {
    if (product.tags.includes(tag)) score += 1;
  });
  if (answerTags.includes(product.gender)) score += 2;
  if (product.gender === "unisex") score += 1;

  if (budget === "under6000" && product.price < 6000) score += 2;
  if (budget === "6000-10000" && product.price >= 6000 && product.price <= 10000) score += 2;
  if (budget === "above10000" && product.price > 10000) score += 2;

  return score;
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  // One slot per question — storing answers by index (rather than pushing
  // to a flat list) means using the Back button and re-picking an answer
  // overwrites the old choice instead of stacking duplicate tags.
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [allProducts, setAllProducts] = useState([]);
  const [results, setResults] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    getProducts({}).then(({ data }) => setAllProducts(data)).catch(() => setAllProducts([]));
  }, []);

  function selectOption(option) {
    const nextAnswers = [...answers];
    nextAnswers[step] = option;
    setAnswers(nextAnswers);

    if (step === QUESTIONS.length - 1) {
      computeResults(nextAnswers);
    } else {
      setStep((s) => s + 1);
    }
  }

  function computeResults(finalAnswers) {
    const answerTags = finalAnswers
      .filter((a) => a && a.tags)
      .flatMap((a) => a.tags);
    const budgetAnswer = finalAnswers.find((a) => a && a.budget);
    const budget = budgetAnswer ? budgetAnswer.budget : "no-limit";

    const scored = allProducts
      .map((p) => ({ product: p, score: scoreProduct(p, answerTags, budget) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((s) => s.product);

    setResults(scored);
  }

  function retakeQuiz() {
    setStep(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setResults(null);
  }

  if (results) {
    return (
      <div className="container-nivora page-pad quiz-page">
        <div className="quiz-results-header">
          <Wand2 size={30} />
          <h1 className="section-title">Your Nivora Match</h1>
          <p className="ink-sub-light">Based on your answers, these are your top three fragrances.</p>
        </div>
        {results.length > 0 ? (
          <div className="product-grid">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        ) : (
          <p className="empty-state-text">
            Couldn't load recommendations — make sure the backend server is running on port 5000.
          </p>
        )}
        <div className="center-cta">
          <button className="btn-nivora btn-outline" onClick={retakeQuiz}>
            <RotateCcw size={15} /> Retake the Quiz
          </button>
        </div>
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      </div>
    );
  }

  const current = QUESTIONS[step];
  const progressPct = Math.round(((step + 1) / QUESTIONS.length) * 100);
  const currentAnswerLabel = answers[step]?.label;

  return (
    <div className="container-nivora page-pad quiz-page">
      <div className="quiz-progress-track">
        <div className="quiz-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <span className="eyebrow">Question {step + 1} of {QUESTIONS.length}</span>
      <h1 className="section-title quiz-question mb-block">{current.question}</h1>

      <div className="quiz-options">
        {current.options.map((option) => (
          <button
            key={option.label}
            className={`quiz-option-btn ${currentAnswerLabel === option.label ? "quiz-option-selected" : ""}`}
            onClick={() => selectOption(option)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {step > 0 && (
        <button className="quiz-back-btn" onClick={() => setStep((s) => s - 1)}>← Back</button>
      )}
    </div>
  );
}