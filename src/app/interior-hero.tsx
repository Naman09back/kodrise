import Link from "next/link";

export default function InteriorHero({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <section className="interior-hero container">
      <div className="interior-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>{label}</span>
      </div>
      <div className="interior-heading">
        <div>
          <span className="interior-eyebrow">
            KODRISE / {label.toUpperCase()}
          </span>
          <h1>
            {title}
            <br />
            <span>{accent}</span>
          </h1>
          <p>{description}</p>
        </div>
        <div className="interior-arch" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>↗</span>
        </div>
      </div>
    </section>
  );
}
