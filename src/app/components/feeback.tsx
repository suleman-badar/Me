import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Star, Send, CheckCircle, AlertCircle, Quote, Loader } from "lucide-react";
import { SectionLabel } from "./section-label";

/* ── Configure your Apps Script URL here ───────────────────── */
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyLLpHkC7mOWzK8djHW53CUEsR3wAijozmMjmH8ZQfVHfJJcwxfI5m8lYiaaJ8Brfo/exec";
/* ─────────────────────────────────────────────────────────────────── */

const IS_CONFIGURED = true;

/* ── Types ─────────────────────────────────────────────────────── */
interface Review {
  name: string;
  role: string;
  message: string;
  rating: number;
  timestamp: string;
}

interface FormState {
  name: string;
  role: string;
  message: string;
  rating: number;
}

/* ── Mock approved reviews (shown while not yet configured) ─────── */
const MOCK_REVIEWS: Review[] = [];

/* ── Star component ─────────────────────────────────────────────── */
function StarRating({
  value,
  onChange,
  readonly = false,
  size = 16,
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: number;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = readonly ? n <= value : n <= (hovered || value);
        return (
          <motion.button
            key={n}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(n)}
            onMouseEnter={() => !readonly && setHovered(n)}
            onMouseLeave={() => !readonly && setHovered(0)}
            whileHover={readonly ? {} : { scale: 1.25 }}
            whileTap={readonly ? {} : { scale: 0.9 }}
            className={readonly ? "cursor-default" : "cursor-pointer"}
            style={{ lineHeight: 0 }}
          >
            <Star
              style={{ width: size, height: size }}
              fill={active ? "#c6ff3d" : "transparent"}
              stroke={active ? "#c6ff3d" : "rgba(255,255,255,0.2)"}
              strokeWidth={1.5}
            />
          </motion.button>
        );
      })}
    </div>
  );
}

/* ── Review card ────────────────────────────────────────────────── */
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const date = review.timestamp
    ? new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(
      new Date(review.timestamp)
    )
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
      className="glass rounded-2xl p-6 flex flex-col gap-5 group hover:border-white/16 transition-colors"
    >
      {/* Top: rating + date */}
      <div className="flex items-center justify-between">
        <StarRating value={review.rating} readonly size={14} />
        {date && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
            {date}
          </span>
        )}
      </div>

      {/* Quote mark */}
      <Quote
        className="w-5 h-5 text-[#c6ff3d]/40 -mb-1"
        strokeWidth={1.5}
      />

      {/* Message */}
      <p className="text-white/70 text-[14px] leading-relaxed flex-1">
        {review.message}
      </p>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-[#c6ff3d]/20 via-white/8 to-transparent" />

      {/* Author */}
      <div className="flex items-center gap-3">
        {/* Avatar initials */}
        <div className="w-8 h-8 rounded-full bg-[#c6ff3d]/12 border border-[#c6ff3d]/20 flex items-center justify-center flex-shrink-0">
          <span className="font-mono text-[10px] text-[#c6ff3d]">
            {review.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
          </span>
        </div>
        <div>
          <div className="text-white text-[13px] leading-none">{review.name}</div>
          <div className="font-mono text-[10px] text-white/40 mt-0.5 leading-none">
            {review.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export function Feedback() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const [form, setForm] = useState<FormState>({ name: "", role: "", message: "", rating: 5 });
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  /* ── Fetch approved reviews ─────────────────────────────────── */
  useEffect(() => {
    if (!IS_CONFIGURED) {
      setReviews(MOCK_REVIEWS);
      setLoadState("done");
      return;
    }

    setLoadState("loading");
    fetch(APPS_SCRIPT_URL)
      .then((r) => r.json())
      .then((data: Review[]) => {
        setReviews(Array.isArray(data) ? data : MOCK_REVIEWS);
        setLoadState("done");
      })
      .catch(() => {
        setReviews(MOCK_REVIEWS);
        setLoadState("error");
      });
  }, []);

  /* ── Form validation ────────────────────────────────────────── */
  function validate() {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.message.trim()) e.message = "Required";
    if (form.message.trim().length < 20) e.message = "At least 20 characters";
    return e;
  }

  /* ── Submit handler ─────────────────────────────────────────── */
  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitState("submitting");

    if (!IS_CONFIGURED) {
      // Demo mode — simulate network delay
      await new Promise((r) => setTimeout(r, 1200));
      setSubmitState("success");
      setForm({ name: "", role: "", message: "", rating: 5 });
      return;
    }

    try {
      /**
       * POST via application/x-www-form-urlencoded to avoid CORS preflight.
       * Google Apps Script reads e.parameter.payload on the server side.
       */

      // console.log("Submitting form:", form);

      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `payload=${encodeURIComponent(JSON.stringify(form))}`,
      });

      // console.log("Response status:", response.status);

      const text = await response.text();

      // console.log("Response body:", text);
      setSubmitState("success");
      setForm({ name: "", role: "", message: "", rating: 5 });
    } catch {
      setSubmitState("error");
    }
  }

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <section id="feedback" className="relative py-32 md:py-44 overflow-hidden">
      {/* Atmospheric */}
      <div className="absolute inset-0 grid-bg opacity-35 mask-fade-y pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c6ff3d]/20 to-transparent" />
      <div className="absolute -top-60 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] bg-[#c6ff3d]/[0.07] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 noise opacity-[0.4] mix-blend-overlay pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">

        <SectionLabel
          index="// 07 — signal"
          title="Peer signal."
          subtitle="Collaborators, teammates, and open source co-contributors. Approved reviews only the sheet is my moderation queue."
        />

        {/* ── Review grid ───────────────────────────────────────── */}
        <div className="relative">
          {/* Loading state */}
          {loadState === "loading" && (
            <div className="flex items-center justify-center py-20">
              <Loader className="w-6 h-6 text-[#c6ff3d] animate-spin" />
            </div>
          )}

          {/* Reviews */}
          {loadState !== "loading" && reviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {reviews.map((r, i) => (
                <ReviewCard key={`${r.name}-${i}`} review={r} index={i} />
              ))}
            </div>
          )}

          {loadState === "done" && reviews.length === 0 && (
            <div className="text-center py-16 text-white/30 font-mono text-sm">
              No approved reviews yet.
            </div>
          )}
        </div>

        {/* ── Submission form ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-16 md:mt-24 grid grid-cols-12 gap-6"
        >
          {/* Left: context copy */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-center gap-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#c6ff3d] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#c6ff3d] animate-pulse" />
              Submit feedback
            </div>
            <div>
              <h3 className="font-display text-3xl md:text-4xl leading-tight">
                Worked together?
              </h3>
              <p className="mt-4 text-white/50 text-[14px] leading-relaxed">
                I'd appreciate your honest take.
              </p>
            </div>
            {/* Schema reference */}
            <div className="glass rounded-xl p-4 font-mono text-[11px] leading-relaxed text-white/40">
              <div className="text-[#c6ff3d] mb-2">// sheet schema</div>
              <div><span className="text-white/55">Name</span>       · string</div>
              <div><span className="text-white/55">Role</span>       · string</div>
              <div><span className="text-white/55">Message</span>    · string</div>
              <div><span className="text-white/55">Rating</span>     · 1 – 5</div>
            </div>
          </div>

          {/* Right: form panel */}
          <div className="col-span-12 lg:col-span-8">
            <div className="glass rounded-2xl overflow-hidden">
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/8 font-mono text-[10px] uppercase tracking-wider text-white/40">
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-[#c6ff3d]" />
                <span className="ml-2">feedback.submit()</span>
                <span className="ml-auto text-white/25">→ sheets.append_row()</span>
              </div>

              <AnimatePresence mode="wait">
                {submitState === "success" ? (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-8 md:p-10 flex flex-col items-center justify-center text-center gap-5 min-h-[360px]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="w-14 h-14 rounded-full bg-[#c6ff3d]/12 border border-[#c6ff3d]/30 flex items-center justify-center"
                    >
                      <CheckCircle className="w-6 h-6 text-[#c6ff3d]" strokeWidth={1.5} />
                    </motion.div>
                    <div>
                      <p className="font-display text-2xl">Received.</p>
                      <p className="mt-2 text-white/45 text-[14px] leading-relaxed max-w-sm">
                        Your feedback is queued for review. Once approved it'll appear on this page.
                        Thank you, genuinely :)
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitState("idle")}
                      className="font-mono text-[11px] uppercase tracking-wider text-[#c6ff3d]/70 hover:text-[#c6ff3d] transition-colors mt-2"
                    >
                      Submit another →
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
                  >
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                        Name <span className="text-[#c6ff3d]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, name: e.target.value }));
                          setErrors((p) => ({ ...p, name: undefined }));
                        }}
                        placeholder="Bilal Ahmed"
                        className={`bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#c6ff3d]/50 transition-colors ${errors.name ? "border-red-500/60" : "border-white/10"
                          }`}
                      />
                      {errors.name && (
                        <span className="font-mono text-[10px] text-red-400">{errors.name}</span>
                      )}
                    </div>

                    {/* Role */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                        Role / Company
                      </label>
                      <input
                        type="text"
                        value={form.role}
                        onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                        placeholder="Senior Engineer · Stripe"
                        className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#c6ff3d]/50 transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                        Feedback <span className="text-[#c6ff3d]">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, message: e.target.value }));
                          setErrors((p) => ({ ...p, message: undefined }));
                        }}
                        placeholder="Describe what you worked on together and what stood out about the collaboration..."
                        className={`bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#c6ff3d]/50 transition-colors resize-none leading-relaxed ${errors.message ? "border-red-500/60" : "border-white/10"
                          }`}
                      />
                      <div className="flex items-center justify-between">
                        {errors.message ? (
                          <span className="font-mono text-[10px] text-red-400">{errors.message}</span>
                        ) : (
                          <span />
                        )}
                        <span className="font-mono text-[10px] text-white/25">
                          {form.message.length} / 500
                        </span>
                      </div>
                    </div>

                    {/* Rating + Submit row */}
                    <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                          Rating
                        </label>
                        <StarRating
                          value={form.rating}
                          onChange={(v) => setForm((p) => ({ ...p, rating: v }))}
                          size={22}
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        {submitState === "error" && (
                          <motion.div
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-1.5 text-red-400 font-mono text-[11px]"
                          >
                            <AlertCircle className="w-3.5 h-3.5" />
                            Submission failed — try again
                          </motion.div>
                        )}

                        <button
                          type="submit"
                          disabled={submitState === "submitting"}
                          className="group relative inline-flex items-center gap-2.5 bg-[#c6ff3d] text-black px-5 py-2.5 rounded-full font-mono text-[12px] uppercase tracking-wider disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
                        >
                          {submitState === "submitting" ? (
                            <>
                              <Loader className="w-3.5 h-3.5 animate-spin" />
                              Sending
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              Submit Feedback
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Moderation note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-10 flex items-start gap-3 max-w-lg"
        >
         
        </motion.div>

      </div>
    </section>
  );
}
