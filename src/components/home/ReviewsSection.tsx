'use client';

import React from 'react';

const REVIEWS = [
  {
    id: 'bram',
    quote:
      '"Printed our final thesis model in 18 hours. Flawless 0.12mm surface quality and saved over 40% compared to online broker aggregators."',
    name: 'Bram V.',
    role: 'Industrial Design • UvA',
  },
  {
    id: 'sanne',
    quote:
      '"Singel pickup saved our client pitch deadline. Intricate architectural facade panels without layer stepping or warping."',
    name: 'Sanne K.',
    role: 'Lead Architect • Studio Amsterdam',
  },
  {
    id: 'daan',
    quote:
      '"Accurate instant volume calculation on the site, ordered at 10 AM, and functional PETG-CF brackets were ready the next morning."',
    name: 'Daan M.',
    role: 'Hardware Founder • RoboTech NL',
  },
];

export default function ReviewsSection() {
  return (
    <section className="w-full bg-surface py-20 border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-xl mb-14 space-y-2">
          <span className="font-label-mono text-label-mono uppercase text-secondary font-bold tracking-wider">
            Customer Reviews
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Trusted Across Netherlands
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/40 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {review.quote}
              </p>
              <div className="pt-2 border-t border-outline-variant/30 font-label-mono-xs text-label-mono-xs text-on-surface">
                <span className="font-bold block text-on-surface">{review.name}</span>
                <span className="text-on-surface-variant">{review.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

