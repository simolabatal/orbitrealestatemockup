import { ArrowUpRight, Building2, HardHat, KeyRound, Wallet, Sparkles } from "lucide-react";
import { PROPERTIES, AGENCY_STATS, unsplash } from "../data.js";
import Hero from "./Hero.jsx";
import PropertyCard from "./PropertyCard.jsx";
import { Reveal, Eyebrow, CountUp, Button } from "./ui.jsx";

const FEATURED_IDS = ["villa-maison-des-oliviers", "riad-zellige", "penthouse-sky-atlas"];

const PILLAR_PREVIEW = [
  { icon: <Building2 className="h-6 w-6" />, title: "Development" },
  { icon: <HardHat className="h-6 w-6" />, title: "Construction" },
  { icon: <KeyRound className="h-6 w-6" />, title: "Management" },
  { icon: <Wallet className="h-6 w-6" />, title: "Transactions" },
];

export default function Home({ onSearch, onNavigate, onOpen, onVisit }) {
  const featured = PROPERTIES.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <>
      <Hero onSearch={onSearch} />

      {/* Chiffres clés */}
      <section id="home-about" className="border-b border-ink/5 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 sm:px-8 lg:grid-cols-4">
          {AGENCY_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="text-center">
              <p className="font-serif text-4xl text-ink sm:text-5xl">
                <CountUp
                  value={s.value}
                  suffix={s.suffix}
                  decimals={s.decimals || 0}
                />
              </p>
              <p className="mt-2 text-sm font-medium text-ink/55">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sélection signature */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Eyebrow>Sélection signature</Eyebrow>
            <h2 className="mt-4 max-w-xl font-serif text-3xl font-light leading-tight text-ink sm:text-4xl">
              Les adresses qui font la réputation d'Orbit.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Button variant="outline" onClick={() => onNavigate("portfolio")}>
              Voir tout le portefeuille
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <PropertyCard key={p.id} property={p} onOpen={onOpen} index={i} />
          ))}
        </div>
      </section>

      {/* Piliers preview */}
      <section className="bg-sand-50">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <Reveal className="text-center">
            <Eyebrow>Nos expertises</Eyebrow>
            <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-light leading-tight text-ink sm:text-4xl">
              Quatre métiers, pilotés en interne.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {PILLAR_PREVIEW.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <button
                  onClick={() => onNavigate("services")}
                  className="group flex w-full flex-col items-start rounded-3xl border border-ink/10 bg-white p-6 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-orbit-500/30 hover:shadow-[0_24px_50px_-26px_rgba(255,85,0,0.4)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sand-100 text-orbit-600 transition-colors duration-500 group-hover:bg-orbit-500 group-hover:text-white">
                    {p.icon}
                  </span>
                  <span className="mt-5 font-serif text-lg text-ink">{p.title}</span>
                  <span className="mt-1 text-xs text-ink/45">En savoir plus</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Teaser investisseurs */}
      <section className="relative overflow-hidden bg-wood-800">
        <div className="absolute inset-0 opacity-20">
          <img
            src={unsplash("1600607687939-ce8a6c25118c", 1600)}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-wood-900 via-wood-900/90 to-wood-900/40" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow light>Espace investisseurs</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-white sm:text-5xl">
                Jusqu'à <span className="text-orbit-400">7,5 %</span> de rendement
                locatif brut sur les riads de prestige.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-[15px] leading-relaxed text-white/65">
                Analyses de marché, sourcing off-market et gestion locative&nbsp;:
                un accompagnement sur-mesure pour investisseurs privés et
                institutionnels.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={() => onNavigate("investors")}>
                  Découvrir l'advisory
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button variant="outline-light" onClick={onVisit}>
                  Demander une analyse
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-wood-800 px-6 py-16 text-center sm:px-12">
            <Sparkles className="absolute right-8 top-8 h-8 w-8 text-orbit-500/40" />
            <Sparkles className="absolute left-10 bottom-10 h-6 w-6 text-orbit-500/30" />
            <h2 className="mx-auto max-w-2xl font-serif text-3xl font-light leading-tight text-white sm:text-5xl">
              Prêt à franchir le seuil&nbsp;?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] text-white/60">
              Réservez une visite privée ou une consultation confidentielle avec
              l'un de nos conseillers.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button onClick={onVisit}>
                Réserver une visite privée
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button variant="outline-light" onClick={() => onNavigate("contact")}>
                Nous contacter
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
