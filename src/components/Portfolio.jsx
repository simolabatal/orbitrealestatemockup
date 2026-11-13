import { useMemo } from "react";
import { SlidersHorizontal, MapPin, Search } from "lucide-react";
import { PROPERTIES, CATEGORIES, CITIES, BUDGETS } from "../data.js";
import PropertyCard from "./PropertyCard.jsx";
import { Reveal, Eyebrow } from "./ui.jsx";

export default function Portfolio({ filters, setFilters, onOpen, onVisit }) {
  const results = useMemo(() => {
    return PROPERTIES.filter((p) => {
      const okCategory = filters.category === "Toutes" || p.category === filters.category;
      const okCity = filters.city === "Toutes" || p.city === filters.city;
      const { min, max } = filters.budget;
      const okBudget = p.price >= min && p.price < max;
      return okCategory && okCity && okBudget;
    });
  }, [filters]);

  const setCategory = (c) => setFilters((f) => ({ ...f, category: c }));
  const setCity = (c) => setFilters((f) => ({ ...f, city: c }));
  const setBudget = (b) => setFilters((f) => ({ ...f, budget: b }));

  return (
    <section className="mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-8">
      {/* En-tête */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <Eyebrow>Le portefeuille Orbit</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl font-light leading-tight text-ink sm:text-5xl">
            Des biens rares, sélectionnés
            <br className="hidden sm:block" /> avec exigence.
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="max-w-md text-[15px] leading-relaxed text-ink/60">
            {results.length} biens d'exception correspondent à votre recherche.
            Chaque adresse est visitée, auditée et documentée par nos équipes
            avant d'intégrer le portefeuille.
          </p>
        </Reveal>
      </div>

      {/* Filtres */}
      <Reveal className="mt-12">
        <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.2)] sm:p-6">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/40">
            <SlidersHorizontal className="h-4 w-4" />
            Affiner la sélection
          </div>

          {/* Catégories */}
          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => {
              const active = filters.category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-300 ${
                    active
                      ? "bg-orbit-500 text-white shadow-[0_8px_20px_-8px_rgba(255,85,0,0.7)]"
                      : "bg-sand-100 text-ink/70 hover:bg-sand-200"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Ville + budget */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <SelectWrap icon={<MapPin className="h-4 w-4" />} label="Localisation">
              <select
                value={filters.city}
                onChange={(e) => setCity(e.target.value)}
                className="select-dark"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </SelectWrap>
            <SelectWrap icon={<Search className="h-4 w-4" />} label="Budget">
              <select
                value={filters.budget.label}
                onChange={(e) => setBudget(BUDGETS.find((b) => b.label === e.target.value))}
                className="select-dark"
              >
                {BUDGETS.map((b) => (
                  <option key={b.label} value={b.label}>{b.label}</option>
                ))}
              </select>
            </SelectWrap>
          </div>
        </div>
      </Reveal>

      {/* Grille */}
      {results.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p, i) => (
            <PropertyCard key={p.id} property={p} onOpen={onOpen} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center rounded-3xl bg-sand-50 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sand-200 text-orbit-600">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="mt-5 font-serif text-2xl text-ink">Aucun bien ne correspond</h3>
          <p className="mt-2 max-w-sm text-sm text-ink/55">
            Élargissez vos critères ou confiez-nous votre recherche : nos biens
            « off-market » ne sont pas toujours publiés.
          </p>
          <button
            onClick={onVisit}
            className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orbit-500"
          >
            Être accompagné
          </button>
        </div>
      )}
    </section>
  );
}

function SelectWrap({ icon, label, children }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-sand-50 px-4 py-2.5">
      <span className="text-orbit-500">{icon}</span>
      <span className="flex flex-col">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}
