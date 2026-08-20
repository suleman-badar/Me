"use client";

import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import type { Review } from "./Feedback";

function StarRating({
  value,
  size = 16,
}: {
  value: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((number) => (
        <Star
          key={number}
          style={{
            width: size,
            height: size,
          }}
          fill={number <= value ? "#c6ff3d" : "transparent"}
          stroke={
            number <= value
              ? "#c6ff3d"
              : "rgba(255,255,255,0.2)"
          }
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function ReviewCard({
  review,
  index,
}: {
  review: Review;
  index: number;
}) {
  const date = review.timestamp
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
      }).format(new Date(review.timestamp))
    : "";

  const initials = review.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "-60px",
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className="glass rounded-2xl p-6 flex flex-col gap-5 group hover:border-white/16 transition-colors"
    >
      {/* Rating + date */}
      <div className="flex items-center justify-between">
        <StarRating
          value={review.rating}
          size={14}
        />

        {date && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
            {date}
          </span>
        )}
      </div>

      {/* Quote */}
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
        <div className="w-8 h-8 rounded-full bg-[#c6ff3d]/12 border border-[#c6ff3d]/20 flex items-center justify-center flex-shrink-0">
          <span className="font-mono text-[10px] text-[#c6ff3d]">
            {initials}
          </span>
        </div>

        <div>
          <div className="text-white text-[13px] leading-none">
            {review.name}
          </div>

          <div className="font-mono text-[10px] text-white/40 mt-0.5 leading-none">
            {review.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}