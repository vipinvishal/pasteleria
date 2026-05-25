import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, MessageSquare, Check, Sparkles, Send } from "lucide-react";
import { Review } from "../types";
import { REVIEWS } from "../data";

export default function ReviewsSection() {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [newAuthor, setNewAuthor] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleAddReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!newAuthor.trim() || !newText.trim()) {
      setValidationError("Please fill out both your name and review details, mon ami!");
      return;
    }

    const reviewItem: Review = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      authorName: newAuthor.trim(),
      rating: newRating,
      text: newText.trim(),
      date: "Just now",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(newAuthor)}&backgroundColor=C48C58`
    };

    setReviewsList((prev) => [reviewItem, ...prev]);

    // Cleanup state
    setNewAuthor("");
    setNewText("");
    setNewRating(5);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="reviews" className="py-24 bg-art-bg border-t border-art-border relative">
      <div className="absolute top-10 right-10 w-48 h-48 bg-art-cream/10 rounded-full filter blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-art-accent font-mono text-xs uppercase tracking-widest font-bold px-3 py-1 bg-art-cream/30 rounded-full border border-art-border">
            Guest Testimonials
          </span>
          <h2 className="font-display font-medium text-3xl md:text-5xl text-art-brown italic mt-3 tracking-tight">
            Loved locally in Ghaziabad
          </h2>
          <div className="w-16 h-[1.5px] bg-art-accent mx-auto mt-4 rounded-full" />
          <p className="text-art-muted max-w-xl mx-auto mt-4 text-xs sm:text-sm leading-relaxed">
            Read real-time verified customer reviews about our eggless customized creations and artisanal coffee, or share your own pastry story below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT 7-cols: Reviews List Feed */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-serif font-bold text-art-brown flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-art-accent" />
              <span>Verifiable Google Maps Reviews</span>
            </h3>

            <div className="space-y-4 max-h-[85vh] overflow-y-auto pr-2">
              <AnimatePresence initial={false}>
                {reviewsList.map((rev) => (
                  <motion.div
                    key={rev.id}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="p-5 rounded-2xl bg-white border border-art-border hover:border-art-accent/30 transition-colors shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={rev.avatar}
                        alt={rev.authorName}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full border border-art-border shrink-0 shadow bg-art-bg"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-left">
                          <h4 className="text-sm font-bold text-art-brown">{rev.authorName}</h4>
                          <span className="text-[10px] font-mono text-art-muted">{rev.date}</span>
                        </div>

                        {/* Stars Indicator */}
                        <div className="flex items-center gap-0.5 mt-1">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={`review-star-${rev.id}-${idx}`}
                              className={`w-3.5 h-3.5 ${
                                idx < rev.rating ? "text-art-accent fill-art-accent" : "text-art-cream"
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-xs text-art-muted mt-3 leading-relaxed text-left">
                          {rev.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT 5-cols: Dynamic Write Review Form */}
          <div className="lg:col-span-5 p-6 md:p-8 bg-white border border-art-border rounded-3xl shadow-sm">
            <div className="mb-6 text-left">
              <h3 className="font-serif font-bold text-lg text-art-brown flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-art-accent" />
                <span>Join Chef Pierre's Ledger</span>
              </h3>
              <p className="text-art-muted text-xs mt-1 leading-snug">
                How was your eggless cake or fresh coffee experience? Let’s draft your feedback.
              </p>
            </div>

            <form onSubmit={handleAddReviewSubmit} className="space-y-4 text-left">
              {validationError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
                  {validationError}
                </div>
              )}

              {/* Author name input */}
              <div>
                <label className="block text-[10px] uppercase font-mono font-bold text-art-muted mb-1.5">
                  Your Signature Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Anoop Bajpai"
                  value={newAuthor}
                  onChange={(e) => {
                    setValidationError("");
                    setNewAuthor(e.target.value);
                  }}
                  className="w-full bg-white text-xs border border-art-border focus:border-art-accent outline-none rounded-xl py-3 px-4 text-art-brown placeholder:text-art-muted transition-colors shadow-inner"
                />
              </div>

              {/* Interactive Rating Picker */}
              <div>
                <label className="block text-[10px] uppercase font-mono font-bold text-art-muted mb-1.5 font-sans">
                  Rate Your Experience
                </label>
                <div className="flex items-center gap-1.5 py-1">
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const starsRank = idx + 1;
                    const isLit = hoverRating !== null ? starsRank <= hoverRating : starsRank <= newRating;
                    return (
                      <button
                        key={`form-star-${idx}`}
                        type="button"
                        onClick={() => setNewRating(starsRank)}
                        onMouseEnter={() => setHoverRating(starsRank)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 focus:outline-none cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 transition-transform hover:scale-110 ${
                            isLit ? "text-art-accent fill-art-accent" : "text-art-cream"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Review Text Area */}
              <div>
                <label className="block text-[10px] uppercase font-mono font-bold text-art-muted mb-1.5 font-sans">
                  Review Details
                </label>
                <textarea
                  placeholder="e.g. My custom anniversary cake was extremely creamy and delivered right on time! Loving their hospitality in Shalimar Garden..."
                  rows={4}
                  value={newText}
                  onChange={(e) => {
                    setValidationError("");
                    setNewText(e.target.value);
                  }}
                  className="w-full bg-white text-xs border border-art-border focus:border-art-accent outline-none rounded-xl py-3 px-4 text-art-brown placeholder:text-art-muted transition-colors resize-none shadow-inner"
                />
              </div>

              {/* Submit Review button */}
              <button
                type="submit"
                className="w-full py-3 bg-art-accent hover:bg-art-brown text-white font-serif font-bold text-xs tracking-wide rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 mt-2"
              >
                <span>Add Review Contribution</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Simulated interactive feedback overlay from Chef Pierre */}
            <AnimatePresence>
              {isSubmitted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-art-brown/30 backdrop-blur-xs">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white border border-art-border rounded-3xl p-6 max-w-sm text-center shadow-2xl relative overflow-hidden text-art-brown"
                  >
                    <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif font-bold text-lg">Merci, Mon Ami!</h4>
                    <p className="text-art-muted text-xs leading-relaxed mt-2.5">
                      Your sweet words of praise are like a light, airy frosting topping Chef Pierre's baking spirits. You have successfully updated our interactive ledger feed!
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-5 w-full py-2.5 bg-art-cream/65 hover:bg-art-cream text-art-brown text-xs rounded-xl font-bold cursor-pointer transition-colors"
                    >
                      Return to Gallery
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
