"use client";

import {useState} from "react";
import Link from "next/link";

const web = [
  {title: "Select the type of website you need", options: ["Business website", "E-commerce website", "Marketplace website", "Web application", "Portfolio or personal website"]},
  {title: "What features do you need?", options: ["User registration and login", "Payment gateway", "Blog or news", "Live chat", "Multi-language support", "SEO optimization", "Search and filters", "Custom forms", "Third-party integrations", "AI features"]},
  {title: "What type of design do you prefer?", options: ["Basic UI", "Custom UI", "High-end UI"]},
  {title: "Which platforms should your website support?", options: ["Desktop and mobile", "Progressive web app"]},
  {title: "Do you need a content management system?", options: ["Custom CMS", "WordPress, Shopify or similar", "No CMS"]},
  {title: "Do you need an admin panel?", options: ["Yes", "No"]},
  {title: "What post-production support do you require?", options: ["Maintenance and bug fixes", "Feature enhancements and updates"]},
  {title: "How urgent is your project timeline?", options: ["Standard (3–4 months)", "Fast track (2 months)", "As soon as possible"]},
];
const app = [
  {title: "Select the interface you need for your app", options: ["iOS only", "Android only", "iOS and Android", "Cross-platform", "Responsive website"]},
  {title: "What style of UI/UX design do you prefer?", options: ["Basic UI", "Custom UI", "High-end UI"]},
  {title: "Select the features and functionalities you need", options: ["User authentication", "Payment gateway", "Push notifications", "Real-time chat", "AI features", "GPS and location", "E-commerce", "Third-party integrations"]},
  {title: "Do you need a backend admin panel?", options: ["Basic", "Advanced", "No admin panel"]},
  {title: "What post-production support do you require?", options: ["Maintenance", "Feature enhancements"]},
  {title: "How urgent is your project timeline?", options: ["Standard (3–4 months)", "Fast track (2 months)", "As soon as possible"]},
];

export default function Calculator({type}: {type: "web" | "app"}) {
  const [step, setStep] = useState(0);
  const groups = type === "web" ? web : app;
  return <div className="resource-calculator">{step === 0 ? <form onSubmit={(event) => {event.preventDefault(); setStep(1); window.scrollTo({top: 0, behavior: "smooth"});}}>
    {groups.map((group, index) => <fieldset key={group.title}><legend>{group.title}</legend><div className="resource-choices">{group.options.map((option) => <label key={option}><input type={index === 1 && type === "web" || index === 2 && type === "app" || group.title.includes("support") ? "checkbox" : "radio"} name={`group-${index}`} value={option} /> {option}</label>)}</div></fieldset>)}
    <button className="resource-action" type="submit">Next →</button>
  </form> : <div><h2>Discuss your project estimate</h2><p>Your selections are a starting point. Contact our team for a tailored estimate based on your requirements.</p><button className="resource-action secondary" type="button" onClick={() => setStep(0)}>← Previous</button> <Link className="resource-action" href="/contact">Contact our team →</Link></div>}</div>;
}
