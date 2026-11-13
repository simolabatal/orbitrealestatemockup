import { TrendingUp, LineChart, ShieldCheck, Users, Globe, ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow, CountUp, Button } from "./ui.jsx";
import InvestmentSimulator from "./InvestmentSimulator.jsx";

const YIELDS = [
  { zone: "Médina de Marrakech — Riads", yield: 7.2, growth: "+18 %", note: "sur 5 ans" },
  { zone: "Palmeraie — Villas", yield: 5.8, growth: "+14 %", note: "sur 5 ans" },
  { zone: "Hay Riad, Rabat — Résidentiel", yield: 5.2, growth: "+11 %", note: "sur 5 ans" },
  { zone: "Anfa, Casablanca — Penthouses", yield: 4.9, growth: "+9 %", note: "sur 5 ans" },
];

const INSIGHTS = [
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Un marché en structuration",
    desc: "Marrakech concentre l'essentiel de la demande internationale ; le segment ultra-premium progresse de 12 % par an en volume.",
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    title: "Rendement locatif solide",
    desc: "Les riads de prestige affichent des rendements bruts de 7 à 8 %, parmi les plus attractifs de la région MENA.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Sécurisation juridique",
    desc: "Titres fonciers audités, montages notariés et fiscalité optimisée : chaque actif est sécurisé avant signature.",
  },
];

const STEPS = [
  { n: "01", title: "Analyse patrimoniale", desc: "Définition de vos objectifs, de votre horizon et de votre profil de risque." },
  { n: "02", title: "Sourcing & due diligence", desc: "Accès aux biens off-market, audits technique, juridique et financier." },
  { n: "03", title: "Gestion & sortie", desc: "Valorisation continue, gestion locative et stratégie de cession optimisée." },
];

export default function Investors({ onVisit, onNavigate }) {
  return (
    <div className="pt-[76px]">
      {/* En-tête */}
      <section className="relative overflow-hidden bg-wood-800">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <Reveal>
                <Eyebrow light>Investisseurs & Advisory</Eyebrow>
                <h1 className="mt-5 font-serif text-4xl font-light leading-tight text-white sm:text-6xl">
                  Investir au Maroc,
                  <br />
                  <em className="italic text-orbit-400">avec clairvoyance.</em>
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/70 sm:text-lg">
                  Nous accompagnons investisseurs privés et institutionnels dans
                  la constitution, la gestion et la sortie de portefeuilles
                  immobiliers premium au Maroc.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button onClick={onVisit}>Demander une analyse</Button>
                  <Button variant="outline-light" onClick={() => onNavigate("contact")}>
                    Nous contacter
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="grid grid-cols-2 gap-4">
                <Stat value={2.4} suffix=" Md MAD" decimals={1} label="Actifs conseillés" />
                <Stat value={120} suffix="+" label="Investisseurs actifs" />
                <Stat value={6.4} suffix=" %" decimals={1} label="Rendement moyen brut" />
                <Stat value={15} suffix=" ans" label="D'expertise marché" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Simulateur d'investissement */}
      <InvestmentSimulator onVisit={onVisit} />

      {/* Rendements */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <Eyebrow>Rentabilité locative</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-light leading-tight text-ink sm:text-4xl">
            Où placer son capital en 2026&nbsp;?
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {YIELDS.map((y, i) => (
            <Reveal key={y.zone} delay={i * 80}>
              <article className="h-full rounded-3xl border border-ink/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-orbit-500/30 hover:shadow-[0_24px_50px_-26px_rgba(255,85,0,0.4)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                  {y.zone}
                </p>
                <p className="mt-3 font-serif text-4xl text-orbit-600">
                  <CountUp value={y.yield} suffix=" %" decimals={1} />
                </p>
                <p className="mt-1 text-sm font-medium text-ink/55">
                  Rendement brut estimé
                </p>
                <div className="mt-4 flex items-center gap-1.5 border-t border-ink/5 pt-4 text-sm font-semibold text-ink">
                  <TrendingUp className="h-4 w-4 text-orbit-500" />
                  Valorisation {y.growth} {y.note}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Insights */}
      <section className="bg-sand-50">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {INSIGHTS.map((ins, i) => (
              <Reveal key={ins.title} delay={i * 100}>
                <article className="h-full rounded-3xl bg-white p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orbit-50 text-orbit-600">
                    {ins.icon}
                  </div>
                  <h3 className="mt-5 font-serif text-xl text-ink">{ins.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{ins.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Méthode en 3 étapes */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="text-center">
          <Eyebrow>Notre méthode</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-light leading-tight text-ink sm:text-4xl">
            Un accompagnement sur-mesure, de la thèse à la sortie.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 110}>
              <div className="relative h-full rounded-3xl border border-ink/10 p-8">
                <span className="font-serif text-5xl font-light text-sand-300">{s.n}</span>
                <h3 className="mt-4 font-serif text-xl text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-orbit-600">
                  <Users className="h-4 w-4" />
                  Équipe dédiée
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col items-center gap-6 rounded-[2.5rem] bg-wood-800 px-6 py-14 text-center sm:px-12">
            <h2 className="max-w-2xl font-serif text-3xl font-light text-white sm:text-4xl">
              Recevez notre note de marché trimestrielle.
            </h2>
            <p className="max-w-xl text-[15px] text-white/60">
              Données de transaction, tendances de prix et opportunités
              off-market — réservées à nos investisseurs.
            </p>
            <Button onClick={() => onNavigate("contact")}>
              Demander la note
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function Stat({ value, suffix, decimals = 0, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
      <p className="font-serif text-3xl text-orbit-400 sm:text-4xl">
        <CountUp value={value} suffix={suffix} decimals={decimals} />
      </p>
      <p className="mt-2 text-sm font-semibold text-white">{label}</p>
    </div>
  );
}
