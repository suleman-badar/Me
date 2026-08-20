import { SectionLabel } from "../section-label";
import { ReviewCard } from "./ReviewCard";
import { FeedbackForm } from "./FeedbackForm";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyLLpHkC7mOWzK8djHW53CUEsR3wAijozmMjmH8ZQfVHfJJcwxfI5m8lYiaaJ8Brfo/exec";

export interface Review {
  name: string;
  role: string;
  message: string;
  rating: number;
  timestamp: string;
}

const MOCK_REVIEWS: Review[] = [];

async function getReviews(): Promise<Review[]> {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      // Reviews aren't static forever, so don't cache indefinitely.
      next: {
        revalidate: 300,
      },
    });

    if (!response.ok) {
      return MOCK_REVIEWS;
    }

    const data: unknown = await response.json();

    return Array.isArray(data) ? (data as Review[]) : MOCK_REVIEWS;
  } catch {
    return MOCK_REVIEWS;
  }
}

export async function Feedback() {
  const reviews = await getReviews();

  return (
    <section
      id="feedback"
      className="relative py-8 md:py-12 overflow-hidden"
    >
      {/* Atmospheric */}
      <div className="absolute inset-0 grid-bg opacity-35 mask-fade-y pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c6ff3d]/20 to-transparent" />

      <div className="absolute -top-60 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] bg-[#c6ff3d]/[0.07] pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="absolute inset-0 noise opacity-[0.4] mix-blend-overlay pointer-events-none" />

      <div className="relative mx-auto max-w-[1550px] px-6 md:px-10">
        <SectionLabel
          index="// 07 — signal"
          title="Peer signal."
          subtitle="Collaborators, teammates, and open source co-contributors."
        />

        {/* Reviews */}
        <div className="relative">
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={`${review.name}-${index}`}
                  review={review}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-white/30 font-mono text-sm">
              No reviews yet.
            </div>
          )}
        </div>

        {/* Submission form */}
        <FeedbackForm />

        {/* Moderation note */}
        <div className="mt-10 flex items-start gap-3 max-w-lg" />
      </div>
    </section>
  );
}