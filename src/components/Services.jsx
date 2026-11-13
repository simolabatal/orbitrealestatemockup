import { Building2, HardHat, KeyRound, Wallet, ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow, CountUp, Button } from "./ui.jsx";

const PILLARS = [
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Real Estate Development",
    desc: "De la parcelle à la livraison, nous concevons et développons des projets résidentiels et hôteliers d'exception, en maîtrise d'ouvrage complète.",
    points: ["Étude de faisabilité & foncier", "Conception architecturale", "Pilotage & livraison clé en main"],
  },
  {
    icon: <HardHat className="h-6 w-6" />,
    title: "Construction",
    desc: "Maîtrise d'œuvre haut de gamme, artisans d'art et matériaux nobles. Chaque chantier est suivi avec une rigueur documentée et transparente.",
    points: ["Artisans & corps de métiers d'art", "Reporting de chantier hebdomadaire", "Contrôle qualité indépendant"],
  },
  {
    icon: <KeyRound className="h-6 w-6" />,
    title: "Property Management",
    desc: "Gestion locative, conciergerie de luxe et valorisation patrimoniale. Nous optimisons le rendement de vos actifs, à distance comme sur place.",
    points: ["Location saisonnière premium", "Conciergerie 24/7", "Reporting financier mensuel"],
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Transactions",
    desc: "Acquisition, cession et négociation de biens rares. Un accompagnement discret, d'off-market en closing, pour des résultats au meilleur prix.",
    points: ["Mandats exclusifs & off-market", "Due diligence & négociation", "Sécurisation juridique complète"],
  },
];

const KPIS = [
  { value: 7, suffix: "", label: "Chantiers en cours", note: "livraisons planifiées" },
  { value: 94, suffix: " %", label: "Livraisons à l'heure", note: "depuis 2021" },
  { value: 180, suffix: "+", label: "Unités sous gestion", note: "à Marrakech, Casa & Rabat" },
  { value: 97, suffix: " %", label: "Occupation locative", note: "taux moyen annualisé" },
];

export default function Services({ onVisit, onNavigate }) {
  return (
    <div className="pt-[76px]">
      {/* En-tête immersif */}
      <section className="relative overflow-hidden bg-wood-800">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <Eyebrow light>Services & expertises</Eyebrow>
            <h1 className="mt-5 max-w-3xl font-serif text-4xl font-light leading-tight text-white sm:text-6xl">
              Quatre piliers, une seule exigence&nbsp;:
              <em className="italic text-orbit-400"> l'excellence.</em>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/70 sm:text-lg">
              Orbit intervient sur l'ensemble de la chaîne de valeur immobilière.
              Chaque métier est piloté en interne, avec une transparence totale
              sur les indicateurs de performance.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Les 4 piliers */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 100}>
              <article className="group h-full rounded-3xl border border-ink/10 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-orbit-500/30 hover:shadow-[0_30px_60px_-28px_rgba(255,85,0,0.35)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sand-100 text-orbit-600 transition-colors duration-500 group-hover:bg-orbit-500 group-hover:text-white">
                  {p.icon}
                </div>
                <h3 className="mt-6 font-serif text-2xl text-ink">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{p.desc}</p>
                <ul className="mt-5 space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-sm text-ink/75">
                      <span className="h-1 w-1 rounded-full bg-orbit-500" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* KPIs — transparence */}
      <section className="bg-wood-800">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <Reveal>
              <Eyebrow light>Transparence</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-white sm:text-4xl">
                Des indicateurs que nous publions, pas que nous promettons.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/60">
                Suivi de chantier et gestion locative en temps réel, accessibles
                à chaque client via un espace dédié. Vous savez exactement où en
                est votre projet — à tout moment.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-4">
              {KPIS.map((k, i) => (
                <Reveal key={k.label} delay={i * 90}>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                    <p className="font-serif text-4xl text-orbit-400 sm:text-5xl">
                      <CountUp value={k.value} suffix={k.suffix} />
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">{k.label}</p>
                    <p className="mt-0.5 text-xs text-white/45">{k.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-center rounded-[2.5rem] bg-sand-100 px-6 py-16 text-center sm:px-12">
            <h2 className="max-w-2xl font-serif text-3xl font-light leading-tight text-ink sm:text-4xl">
              Un projet de développement ou de gestion&nbsp;?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-ink/60">
              Présentez-nous votre vision. Nous la transformons en plan
              d'exécution chiffré, daté et contractualisé.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button onClick={onVisit}>
                Planifier une consultation
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button variant="dark" onClick={() => onNavigate("contact")}>
                Nous écrire
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
