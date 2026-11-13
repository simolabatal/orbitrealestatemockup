import { useEffect, useRef, useState } from "react";

/** Révélation au scroll (fade-in / slide-up) via IntersectionObserver */
export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Compteur animé (apparition au scroll) */
export function CountUp({ value, prefix = "", suffix = "", decimals = 0, duration = 1700 }) {
  const ref = useRef(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now) => {
            const p = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(value * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString("fr-FR");

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/** Étiquette éditoriale au-dessus d'un titre */
export function Eyebrow({ children, light = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] ${
        light ? "text-orbit-400" : "text-orbit-600"
      }`}
    >
      <span className="h-px w-6 bg-current" />
      {children}
    </span>
  );
}

/** Badge de statut (Exclusivité / Signature / Nouveauté) */
export function Badge({ children, tone = "orbit", className = "" }) {
  const tones = {
    orbit: "bg-orbit-500 text-white",
    sand: "bg-sand-200 text-wood-700",
    dark: "bg-wood-700 text-sand-100",
    outline: "border border-orbit-500 text-orbit-600",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
        tones[tone] || tones.orbit
      } ${className}`}
    >
      {children}
    </span>
  );
}

/** Bouton primaire / secondaire réutilisable */
export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  href,
  target,
  rel,
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50";
  const variants = {
    primary:
      "bg-orbit-500 text-white hover:bg-orbit-600 hover:shadow-[0_12px_30px_-8px_rgba(255,85,0,0.6)] hover:-translate-y-0.5",
    dark: "bg-wood-700 text-sand-100 hover:bg-wood-800 hover:-translate-y-0.5",
    light: "bg-white text-ink hover:bg-sand-100 hover:-translate-y-0.5",
    outline:
      "border border-ink/15 text-ink hover:border-ink hover:-translate-y-0.5",
    "outline-light":
      "border border-white/30 text-white hover:bg-white/10 hover:-translate-y-0.5",
  };

  const cls = `${base} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}

/** Logo Orbit — point orbital animé */
export function Logo({ light = false, compact = false }) {
  return (
    <span className="flex items-center gap-3 select-none">
      <span className="relative h-9 w-9 shrink-0">
        <span
          className={`absolute inset-0 rounded-full border ${
            light ? "border-white/30" : "border-ink/20"
          }`}
        />
        <span
          className={`absolute inset-0 rounded-full border border-transparent ${
            light ? "border-t-white/70" : "border-t-ink/50"
          } animate-orbit`}
        >
          <span className="absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-orbit-500" />
        </span>
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orbit-500" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-serif text-xl tracking-[0.18em] ${
              light ? "text-white" : "text-ink"
            }`}
          >
            ORBIT
          </span>
          <span
            className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.42em] ${
              light ? "text-sand-200/70" : "text-ink/45"
            }`}
          >
            Real Estate
          </span>
        </span>
      )}
    </span>
  );
}
