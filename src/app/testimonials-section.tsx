"use client";

import {useEffect, useState} from "react";

type Testimonial = {_id: string; name?: string; role?: string; company?: string; quote?: string; rating?: number};

function Stars({rating = 5}: {rating?: number}) {
  return <span className="testimonial-stars" aria-label={`${rating} out of 5 stars`}>{"★".repeat(Math.min(5, Math.max(1, rating)))}</span>;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((result: Testimonial[]) => setTestimonials(result))
      .catch(() => undefined);
  }, []);

  return <section className="testimonials-section section container reveal" id="testimonials">
    <div className="section-label"><span>02 / IN THEIR WORDS</span><span className="cross">+</span></div>
    <div className="testimonials-heading"><div><h2>Good people.<br /><span className="muted">Great momentum.</span></h2></div><div className="testimonials-intro"><p>We measure success by what happens after the introduction: stronger teams, clearer progress, and work that moves forward.</p></div></div>
    {testimonials.length ? <div className="testimonial-grid">{testimonials.map((testimonial) => <figure className="testimonial-card" key={testimonial._id}><div className="testimonial-card-top"><Stars rating={testimonial.rating} /><span aria-hidden="true">“</span></div><blockquote>{testimonial.quote}</blockquote><figcaption><strong>{testimonial.name}</strong><span>{[testimonial.role, testimonial.company].filter(Boolean).join(" · ")}</span></figcaption></figure>)}</div> : <div className="testimonial-empty"><span className="testimonial-empty-mark">“</span><p>We are collecting stories from the people we have helped build with.</p></div>}
  </section>;
}
