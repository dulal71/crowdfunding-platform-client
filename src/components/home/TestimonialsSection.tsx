"use client";

import Image from "next/image";

const testimonials = [
  {
    quote:
      "We just acquired Efferd for 3 gazillion dollars. We're calling it iEfferd. It's our best product yet.",
    name: "Alex Rivera",
    role: "CEO, Northwind",
    avatar: "/testimonials/alex.jpg",
  },
  {
    quote:
      "I'm considering shipping Efferd components with our delivery network. 2-day shipping on beautiful UIs? Done.",
    name: "Jordan Blake",
    role: "Founder, Parcelly",
    avatar: "/testimonials/jordan.jpg",
  },
  {
    quote:
      "We're rewriting our entire frontend in Efferd. Every engineer on the team says it's the only logical choice.",
    name: "Sam Okafor",
    role: "CEO, Latticework",
    avatar: "/testimonials/sam.jpg",
  },
];

// Small crosshair/plus mark used at the shared corners of the card grid,
// echoing a blueprint/schematic feel.
function CornerMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-4 w-4 text-zinc-300 ${className}`}
      fill="none"
    >
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            Loved by builders everywhere
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500 sm:text-lg">
            Don&apos;t take our word for it — here&apos;s what industry leaders have to say.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-px">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`relative border border-zinc-200 bg-white p-8 shadow-[0_1px_3px_rgba(15,23,42,0.06)] ${
                index === 1 ? "sm:mt-8" : index === 2 ? "sm:mt-16" : ""
              }`}
            >
              {/* corner marks on the top-left and bottom-right of each card */}
              <CornerMark className="absolute -left-2 -top-2" />
              <CornerMark className="absolute -bottom-2 -right-2" />

              <svg
                viewBox="0 0 32 24"
                className="h-6 w-8 text-zinc-300"
                fill="currentColor"
              >
                <path d="M0 24V13.5C0 6 4.8 1.2 12 0l1.8 3.6C8.4 5.4 6 8.4 6 12h6v12H0zm18 0V13.5c0-7.5 4.8-12.3 12-13.5l1.8 3.6C26.4 5.4 24 8.4 24 12h6v12H18z" />
              </svg>

              <p className="mt-6 text-[15px] leading-relaxed text-zinc-600">
                {testimonial.quote}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-zinc-200">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-zinc-900">{testimonial.name}</p>
                  <p className="text-sm text-cyan-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}