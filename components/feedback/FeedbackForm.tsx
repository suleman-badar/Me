"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  AlertCircle,
  CheckCircle,
  Loader,
  Send,
  Star,
} from "lucide-react";

import { useState } from "react";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyLLpHkC7mOWzK8djHW53CUEsR3wAijozmMjmH8ZQfVHfJJcwxfI5m8lYiaaJ8Brfo/exec";

interface FormState {
  name: string;
  role: string;
  message: string;
  rating: number;
}

type SubmitState =
  | "idle"
  | "submitting"
  | "success"
  | "error";

function StarRating({
  value,
  onChange,
  size = 16,
}: {
  value: number;
  onChange: (value: number) => void;
  size?: number;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((number) => {
        const active =
          number <= (hovered || value);

        return (
          <motion.button
            key={number}
            type="button"
            onClick={() => onChange(number)}
            onMouseEnter={() => setHovered(number)}
            onMouseLeave={() => setHovered(0)}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer"
            style={{ lineHeight: 0 }}
            aria-label={`${number} star${
              number !== 1 ? "s" : ""
            }`}
          >
            <Star
              style={{
                width: size,
                height: size,
              }}
              fill={
                active
                  ? "#c6ff3d"
                  : "transparent"
              }
              stroke={
                active
                  ? "#c6ff3d"
                  : "rgba(255,255,255,0.2)"
              }
              strokeWidth={1.5}
            />
          </motion.button>
        );
      })}
    </div>
  );
}

export function FeedbackForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    role: "",
    message: "",
    rating: 5,
  });

  const [submitState, setSubmitState] =
    useState<SubmitState>("idle");

  const [errors, setErrors] = useState<
    Partial<FormState>
  >({});

  function validate() {
    const nextErrors: Partial<FormState> = {};

    if (!form.name.trim()) {
      nextErrors.name = "Required";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Required";
    } else if (form.message.trim().length < 20) {
      nextErrors.message =
        "At least 20 characters";
    }

    return nextErrors;
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitState("submitting");

    try {
      const response = await fetch(
        APPS_SCRIPT_URL,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body: `payload=${encodeURIComponent(
            JSON.stringify(form)
          )}`,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Submission failed"
        );
      }

      await response.text();

      setSubmitState("success");

      setForm({
        name: "",
        role: "",
        message: "",
        rating: 5,
      });
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "-80px",
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className="mt-16 md:mt-24 grid grid-cols-12 gap-6"
    >
      {/* Left */}
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

        <div className="glass rounded-xl p-4 font-mono text-[11px] leading-relaxed text-white/40">
          <div className="text-[#c6ff3d] mb-2">
            // sheet schema
          </div>

          <div>
            <span className="text-white/55">
              Name
            </span>{" "}
            · string
          </div>

          <div>
            <span className="text-white/55">
              Role
            </span>{" "}
            · string
          </div>

          <div>
            <span className="text-white/55">
              Message
            </span>{" "}
            · string
          </div>

          <div>
            <span className="text-white/55">
              Rating
            </span>{" "}
            · 1 – 5
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="col-span-12 lg:col-span-8">
        <div className="glass rounded-2xl overflow-hidden">
          {/* Terminal bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/8 font-mono text-[10px] uppercase tracking-wider text-white/40">
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-[#c6ff3d]" />

            <span className="ml-2">
              feedback.submit()
            </span>

            <span className="ml-auto text-white/25">
              → sheets.append_row()
            </span>
          </div>

          <AnimatePresence mode="wait">
            {submitState === "success" ? (
              <motion.div
                key="success"
                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                }}
                className="p-8 md:p-10 flex flex-col items-center justify-center text-center gap-5 min-h-[360px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1,
                  }}
                  className="w-14 h-14 rounded-full bg-[#c6ff3d]/12 border border-[#c6ff3d]/30 flex items-center justify-center"
                >
                  <CheckCircle
                    className="w-6 h-6 text-[#c6ff3d]"
                    strokeWidth={1.5}
                  />
                </motion.div>

                <div>
                  <p className="font-display text-2xl">
                    Received.
                  </p>

                  <p className="mt-2 text-white/45 text-[14px] leading-relaxed max-w-sm">
                    Your feedback is queued for
                    review. Once approved it'll
                    appear on this page. Thank
                    you, genuinely :)
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSubmitState("idle")
                  }
                  className="font-mono text-[11px] uppercase tracking-wider text-[#c6ff3d]/70 hover:text-[#c6ff3d] transition-colors mt-2"
                >
                  Submit another →
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                    Name{" "}
                    <span className="text-[#c6ff3d]">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => {
                      setForm((previous) => ({
                        ...previous,
                        name: event.target.value,
                      }));

                      setErrors((previous) => ({
                        ...previous,
                        name: undefined,
                      }));
                    }}
                    placeholder="Bilal Ahmed"
                    className={`bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#c6ff3d]/50 transition-colors ${
                      errors.name
                        ? "border-red-500/60"
                        : "border-white/10"
                    }`}
                  />

                  {errors.name && (
                    <span className="font-mono text-[10px] text-red-400">
                      {errors.name}
                    </span>
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
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        role: event.target.value,
                      }))
                    }
                    placeholder="Senior Engineer · Stripe"
                    className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#c6ff3d]/50 transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                    Feedback{" "}
                    <span className="text-[#c6ff3d]">
                      *
                    </span>
                  </label>

                  <textarea
                    rows={4}
                    maxLength={500}
                    value={form.message}
                    onChange={(event) => {
                      setForm((previous) => ({
                        ...previous,
                        message: event.target.value,
                      }));

                      setErrors((previous) => ({
                        ...previous,
                        message: undefined,
                      }));
                    }}
                    placeholder="Describe what you worked on together and what stood out about the collaboration..."
                    className={`bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#c6ff3d]/50 transition-colors resize-none leading-relaxed ${
                      errors.message
                        ? "border-red-500/60"
                        : "border-white/10"
                    }`}
                  />

                  <div className="flex items-center justify-between">
                    {errors.message ? (
                      <span className="font-mono text-[10px] text-red-400">
                        {errors.message}
                      </span>
                    ) : (
                      <span />
                    )}

                    <span className="font-mono text-[10px] text-white/25">
                      {form.message.length} / 500
                    </span>
                  </div>
                </div>

                {/* Rating + submit */}
                <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                      Rating
                    </label>

                    <StarRating
                      value={form.rating}
                      onChange={(rating) =>
                        setForm((previous) => ({
                          ...previous,
                          rating,
                        }))
                      }
                      size={22}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    {submitState === "error" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          x: 8,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        className="flex items-center gap-1.5 text-red-400 font-mono text-[11px]"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        Submission failed — try again
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={
                        submitState === "submitting"
                      }
                      className="group relative inline-flex items-center gap-2.5 bg-[#c6ff3d] text-black px-5 py-2.5 rounded-full font-mono text-[12px] uppercase tracking-wider disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
                    >
                      {submitState ===
                      "submitting" ? (
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
  );
}