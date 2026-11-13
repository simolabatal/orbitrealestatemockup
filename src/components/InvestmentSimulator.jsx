import { useState } from "react";
import { TrendingUp, Wallet, CalendarClock, Info, ArrowUpRight } from "lucide-react";
import { useCurrency } from "../CurrencyContext.jsx";
import { Reveal, Eyebrow, Button } from "./ui.jsx";

// Valorisation moyenne indicative : +4,5 % par an
const APPRECIATION_YEARLY = 0.045;
const MIN_BUDGET = 3000000;
const MAX_BUDGET = 30000000;
const MIN_YIELD = 6;
const MAX_YIELD = 12;

const SCENARIOS = [
  { label: "Prudent", value: 6.5 },
  { label: "Équilibré", value: 7.5 },
  { label: "Premium", value: 9.5 },
];

export default function InvestmentSimulator({ onVisit }) {
  const { formatPrice } = useCurrency();
  const [budget, setBudget] = useState(12000000);
  const [yieldPct, setYieldPct] = useState(7.5);

  const annualRent = budget * (yieldPct / 100);
  const gain3y = budget * (Math.pow(1 + APPRECIATION_YEARLY, 3) - 1);
  const total3y = annualRent * 3 + gain3y;

  const budgetFill = ((budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100;
  const yieldFill = ((yieldPct - MIN_YIELD) / (MAX_YIELD - MIN_YIELD)) * 100;

  return (
    <section id="simulateur" className="relative scroll-mt-24 overflow-hidden bg-wood-800">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          {/* Intro */}
          <Reveal>
            <Eyebrow light>Simulateur d'investissement</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-white sm:text-4xl">
              Projetez votre rendement, en temps réel.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
              Ajustez votre budget et votre rendement locatif cible pour estimer
              immédiatement vos revenus annuels et votre plus-value potentielle
              à 3 ans.
            </p>
            <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs leading-relaxed text-white/50">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-orbit-400" />
              <span>
                Projections indicatives, basées sur une valorisation moyenne de
                +4,5&nbsp;%/an, hors frais, taxes et fiscalité. Taux de change
                indicatif&nbsp;: 1&nbsp;€ = 10,8&nbsp;MAD.
              </span>
            </div>
          </Reveal>

          {/* Carte interactive */}
          <Reveal delay={120}>
            <div className="rounded-[2rem] bg-white p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)] sm:p-8">
              {/* Budget */}
              <div>
                <div className="flex items-end justify-between gap-4">
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/50">
                    Budget d'investissement
                  </label>
                  <span className="font-serif text-2xl text-orbit-600">
                    {formatPrice(budget)}
                  </span>
                </div>
                <input
                  type="range"
                  min={MIN_BUDGET}
                  max={MAX_BUDGET}
                  step={500000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="range-orbit mt-4"
                  style={{ "--fill": `${budgetFill}%` }}
                  aria-label="Budget d'investissement"
                />
                <div className="mt-1 flex justify-between text-xs font-medium text-ink/40">
                  <span>{formatPrice(MIN_BUDGET)}</span>
                  <span>{formatPrice(MAX_BUDGET)}</span>
                </div>
              </div>

              {/* Rendement */}
              <div className="mt-7">
                <div className="flex items-end justify-between gap-4">
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/50">
                    Rendement locatif estimé
                  </label>
                  <span className="font-serif text-2xl text-orbit-600">
                    {yieldPct.toFixed(1).replace(".", ",")} %
                  </span>
                </div>
                <input
                  type="range"
                  min={MIN_YIELD}
                  max={MAX_YIELD}
                  step={0.1}
                  value={yieldPct}
                  onChange={(e) => setYieldPct(Number(e.target.value))}
                  className="range-orbit mt-4"
                  style={{ "--fill": `${yieldFill}%` }}
                  aria-label="Rendement locatif estimé"
                />
                <div className="mt-1 flex justify-between text-xs font-medium text-ink/40">
                  <span>6 %</span>
                  <span>12 %</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {SCENARIOS.map((s) => {
                    const activeScenario = Math.abs(yieldPct - s.value) < 0.05;
                    return (
                      <button
                        key={s.label}
                        onClick={() => setYieldPct(s.value)}
                        className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                          activeScenario
                            ? "bg-ink text-white"
                            : "bg-sand-100 text-ink/55 hover:bg-sand-200 hover:text-ink"
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Résultats */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Result
                  icon={<Wallet className="h-5 w-5" />}
                  label="Revenu locatif annuel"
                  value={formatPrice(annualRent)}
                />
                <Result
                  icon={<TrendingUp className="h-5 w-5" />}
                  label="Plus-value à 3 ans"
                  value={formatPrice(gain3y)}
                />
                <Result
                  icon={<CalendarClock className="h-5 w-5" />}
                  label="Retour total 3 ans"
                  value={formatPrice(total3y)}
                  highlight
                />
              </div>

              <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-ink/5 pt-5 sm:flex-row">
                <p className="text-xs leading-relaxed text-ink/45">
                  Estimation indicative — affinée par nos analystes selon
                  l'adresse exacte et le mode d'exploitation.
                </p>
                <Button onClick={onVisit} className="shrink-0 px-5 py-2.5 text-[13px]">
                  Valider avec un conseiller
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Result({ icon, label, value, highlight = false }) {
  return (
    <div
      className={`rounded-2xl p-4 transition-colors ${
        highlight ? "bg-orbit-500 text-white" : "bg-sand-50 text-ink"
      }`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
          highlight ? "bg-white/20 text-white" : "bg-orbit-50 text-orbit-600"
        }`}
      >
        {icon}
      </div>
      <p
        className={`mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] ${
          highlight ? "text-white/85" : "text-ink/45"
        }`}
      >
        {label}
      </p>
      <p className={`mt-1 font-serif text-lg ${highlight ? "text-white" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}
