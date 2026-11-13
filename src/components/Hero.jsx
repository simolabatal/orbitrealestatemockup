import { useEffect, useState } from "react";
import { Search, MapPin, ChevronDown, ArrowDown } from "lucide-react";
import { CATEGORIES, CITIES, BUDGETS, unsplash } from "../data.js";
import { useCurrency } from "../CurrencyContext.jsx";
import { Reveal } from "./ui.jsx";

const HERO_IMG = unsplash("1613490493576-7fde63acd811", 2000);

const FOMO_MESSAGES = [
  (n) => `${n} villas d'exception réservées cette semaine à Marrakech`,
  (n) => `${n} riads de prestige sous offre exclusive ce mois-ci`,
  (n) => `${n} penthouses visités cette semaine à Casablanca`,
  (n) => `${n} investisseurs accompagnés ce trimestre au Maroc`,
];

function FomoTicker() {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(2);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % FOMO_MESSAGES.length);
      setCount((c) => Math.min(9, Math.max(1, c + Math.round(Math.random() * 2 - 0.5))));
    }, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex items-center justify-center gap-3 rounded-full border border-white/15 bg-black/25 px-4 py-2.5 backdrop-blur-md sm:px-5">
        <span className="flex items-center gap-1.5 rounded-full bg-orbit-500/15 px-2 py-0.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-orbit-500 animate-pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orbit-500" />
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-orbit-400">
            Live
          </span>
        </span>
        <p key={index} className="fomo-swap text-[13px] font-medium text-white/90 sm:text-sm">
          {FOMO_MESSAGES[index](count)}
        </p>
      </div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-white/35 sm:text-[10px]">
        Activité Orbit · mise à jour en continu
      </p>
    </div>
  );
}

export default function Hero({ onSearch }) {
  const { formatCompact } = useCurrency();
  const [category, setCategory] = useState("Toutes");
  const [city, setCity] = useState("Toutes");
  const [budget, setBudget] = useState(BUDGETS[0]);

  const submit = (e) => {
    e.preventDefault();
    onSearch({ category, city, budget });
  };

  const budgetLabel = (b) => {
    if (b.min === 0 && b.max === Infinity) return "Tout budget";
    if (b.max === Infinity) return `Plus de ${formatCompact(b.min)}`;
    if (b.min === 0) return `Moins de ${formatCompact(b.max)}`;
    return `${formatCompact(b.min)} – ${formatCompact(b.max)}`;
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-wood-900">
      {/* Visuel immersif */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Villa de luxe au crépuscule — Palmeraie, Marrakech"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 pb-24 pt-36 text-center sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 text-orbit-400" />
            Marrakech · Casablanca · Rabat
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mt-7 font-serif text-[42px] font-light leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            L'immobilier d'exception.
            <br />
            <em className="font-normal italic text-orbit-400">
              De la vision à la clé.
            </em>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base font-light leading-relaxed text-white/80 sm:text-lg">
            Orbit sélectionne, développe et gère les biens les plus rares du
            Maroc — avec la précision d'un cercle privé et l'exigence des plus
            belles signatures.
          </p>
        </Reveal>

        {/* Barre de recherche rapide */}
        <Reveal delay={300} className="mt-10 w-full max-w-4xl">
          <form
            onSubmit={submit}
            className="grid grid-cols-1 gap-2 rounded-2xl border border-white/15 bg-white/10 p-2.5 backdrop-blur-xl sm:grid-cols-[1fr_1fr_1fr_auto]"
          >
            <Field label="Type de bien">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="field-input">
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Localisation">
              <select value={city} onChange={(e) => setCity(e.target.value)} className="field-input">
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Budget">
              <select
                value={budget.label}
                onChange={(e) => setBudget(BUDGETS.find((b) => b.label === e.target.value))}
                className="field-input"
              >
                {BUDGETS.map((b) => (
                  <option key={b.label} value={b.label}>
                    {budgetLabel(b)}
                  </option>
                ))}
              </select>
            </Field>
            <button
              type="submit"
              className="group flex items-center justify-center gap-2 rounded-xl bg-orbit-500 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-orbit-600 hover:shadow-[0_14px_30px_-8px_rgba(255,85,0,0.7)]"
            >
              <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Explorer
            </button>
          </form>
        </Reveal>

        <Reveal delay={420} className="mt-7">
          <FomoTicker />
        </Reveal>
      </div>

      {/* Indicateur scroll */}
      <button
        onClick={() => document.getElementById("home-about")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Défiler vers le bas"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-colors hover:text-white sm:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Découvrir</span>
        <ArrowDown className="h-4 w-4 animate-float" />
      </button>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col items-start gap-1 rounded-xl bg-white/[0.06] px-3 py-2 text-left">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
        {label}
      </span>
      <div className="relative w-full">
        {children}
        <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
      </div>
    </label>
  );
}
