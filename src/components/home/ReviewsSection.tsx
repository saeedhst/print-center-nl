'use client';

import React from 'react';
import { CUSTOMER_REVIEWS } from '@/lib/sampleData';
import { Star, CheckCircle2, MessageSquare, MapPin } from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section id="customer-reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Customer Reviews</span>
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            Customer Satisfaction &amp; Feedback
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Trusted by industrial designers, hardware engineering teams, and makers across Haarlem, Amsterdam, and Utrecht.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating & Location Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {review.location}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  &ldquo;{review.headline}&rdquo;
                </h3>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Author & Order Tag */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {review.avatarInitials}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{review.name}</span>
                      <span className="text-[10px] font-normal text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        Verified Order
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">{review.role}</div>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-400">
                  {review.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stat badges */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-100 border border-slate-200 flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">4.9 / 5.0</div>
            <div className="text-xs text-slate-500 mt-0.5">Average Customer Rating</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-300"></div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">1 Working Day</div>
            <div className="text-xs text-slate-500 mt-0.5">Average Dispatch Speed</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-300"></div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</div>
            <div className="text-xs text-slate-500 mt-0.5">Tolerance &amp; Reprint Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
}
