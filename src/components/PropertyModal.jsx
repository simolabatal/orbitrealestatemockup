import { useEffect, useState } from "react";
import {
  X,
  MapPin,
  Ruler,
  Map,
  BedDouble,
  Bath,
  CalendarDays,
  Check,
  ArrowUpRight,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Waves,
  Compass,
} from "lucide-react";
import { unsplash, CONFIG, STATUSES } from "../data.js";
import { useCurrency } from "../CurrencyContext.jsx";
import { Badge, Button } from "./ui.jsx";

export default function PropertyModal({ property, onClose, onVisit }) {
  const { currency, formatPrice, formatIn } = useCurrency();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const images = property?.images || [];
  const total = images.length;

  const next = () => setActive((i) => (i + 1) % total);
  const prev = () => setActive((i) => (i - 1 + total) % total);

  // Réinitialise la galerie à l'ouverture d'un autre bien
  useEffect(() => {
    setActive(0);
    setLightbox(false);
  }, [property?.id]);

  // Verrouille le scroll + navigation clavier
  useEffect(() => {
    if (!property) return undefined;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(false);
        else onClose();
      }
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % total);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, property, lightbox, total]);

  if (!property) return null;

  const statusMeta = property.status ? STATUSES[property.status] : null;
  const otherCurrency = currency === "MAD" ? "EUR" : "MAD";
  const num = (n) => n.toLocaleString("fr-FR");

  const specs = [
    { icon: <Ruler className="h-5 w-5" />, label: "Surface habitable", value: `${num(property.surface)} m²` },
    ...(property.landArea
      ? [{ icon: <Map className="h-5 w-5" />, label: "Superficie du terrain", value: `${num(property.landArea)} m²` }]
      : []),
    ...(property.suites
      ? [{ icon: <BedDouble className="h-5 w-5" />, label: "Suites", value: `${property.suites}` }]
      : []),
    ...(property.bedrooms > 0 && !property.suites
      ? [{ icon: <BedDouble className="h-5 w-5" />, label: "Chambres", value: `${property.bedrooms}` }]
      : []),
    ...(property.bathrooms > 0
      ? [{ icon: <Bath className="h-5 w-5" />, label: "Salles d'eau", value: `${property.bathrooms}` }]
      : []),
    ...(property.hasInfinityPool
      ? [{ icon: <Waves className="h-5 w-5" />, label: "Piscine", value: "À débordement" }]
      : []),
    ...(property.orientation
      ? [{ icon: <Compass className="h-5 w-5" />, label: "Orientation", value: property.orientation }]
      : []),
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Localisation",
      value: `${property.neighborhood}, ${property.city}`,
    },
    ...(property.year
      ? [{ icon: <CalendarDays className="h-5 w-5" />, label: "Année / livraison", value: `${property.year}` }]
      : []),
    { icon: <TrendingUp className="h-5 w-5" />, label: "Rendement estimé", value: property.yield },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <div className="backdrop-in absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />

      <div className="modal-in relative z-10 flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-3xl bg-white sm:rounded-3xl">
        {/* Galerie immersive */}
        <div className="relative h-[42vh] shrink-0 overflow-hidden bg-wood-900 sm:h-[52vh]">
          <img
            src={unsplash(images[active], 1900)}
            alt={`${property.name} — vue ${active + 1} sur ${total}`}
            className="h-full w-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />

          {/* Fermer */}
          <button
            onClick={onClose}
            aria-label="Fermer la fiche"
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink backdrop-blur transition-colors hover:bg-orbit-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Navigation */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Photo précédente"
                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition-all hover:bg-orbit-500 sm:left-4"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Photo suivante"
                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition-all hover:bg-orbit-500 sm:right-4"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Titre + statut */}
          <div className="absolute bottom-5 left-5 right-24 sm:bottom-7 sm:left-7">
            {statusMeta && (
              <Badge tone={statusMeta.tone} className="mb-2.5 shadow-lg">
                {statusMeta.label}
              </Badge>
            )}
            <h2 className="font-serif text-2xl leading-tight text-white sm:text-4xl">
              {property.name}
            </h2>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/80">
              <MapPin className="h-4 w-4 text-orbit-400" />
              {property.neighborhood} · {property.city}
            </p>
          </div>

          {/* Compteur + plein écran */}
          <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 sm:bottom-7 sm:right-7">
            <span className="rounded-full bg-black/40 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-white backdrop-blur">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={() => setLightbox(true)}
              aria-label="Ouvrir la galerie en plein écran"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-orbit-500"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Corps scrollable */}
        <div className="overflow-y-auto">
          {/* Vignettes */}
          {total > 1 && (
            <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-ink/5 px-5 py-3 sm:px-6">
              {images.map((img, i) => (
                <button
                  key={`${img}-${i}`}
                  onClick={() => setActive(i)}
                  aria-label={`Voir la photo ${i + 1}`}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    active === i
                      ? "border-orbit-500 opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={unsplash(img, 260)} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.55fr_1fr]">
            {/* Gauche */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                {property.category}
              </p>

              <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <p className="font-serif text-3xl text-orbit-600 sm:text-4xl">
                  {formatPrice(property.price)}
                </p>
                <p className="text-sm font-medium text-ink/40">
                  ≈ {formatIn(property.price, otherCurrency)}
                </p>
              </div>

              <p className="mt-5 text-[15px] leading-relaxed text-ink/70">
                {property.description}
              </p>

              <h3 className="mt-8 font-serif text-xl text-ink">Prestations & équipements</h3>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {property.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-ink/75">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orbit-50 text-orbit-600">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Droite — specs + CTA */}
            <div className="flex flex-col">
              <div className="rounded-3xl bg-sand-50 p-6">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/40">
                  Caractéristiques
                </h3>
                <dl className="mt-4 space-y-3.5">
                  {specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between gap-4 border-b border-ink/5 pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="flex items-center gap-2.5 text-[13px] text-ink/60">
                        <span className="text-orbit-500">{s.icon}</span>
                        {s.label}
                      </dt>
                      <dd className="text-right text-[13px] font-semibold text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button onClick={() => { onClose(); onVisit(property.id); }}>
                  Réserver une visite privée
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  href={`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    `Bonjour Orbit, je souhaite en savoir plus sur « ${property.name} » (${property.neighborhood}, ${property.city}).`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Contacter un agent
                </Button>
              </div>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-ink/35">
                Dossier complet, plans et diagnostics disponibles sur demande
                lors de la visite privée.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox plein écran */}
      {lightbox && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-black/95 backdrop-blur">
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="truncate font-serif text-lg text-white">{property.name}</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                {property.neighborhood} · {property.city}
              </p>
            </div>
            <button
              onClick={() => setLightbox(false)}
              aria-label="Fermer le plein écran"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-orbit-500"
            >
              <Minimize2 className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-3 pb-3 sm:px-16">
            <img
              src={unsplash(images[active], 2200)}
              alt={`${property.name} — vue ${active + 1}`}
              className="max-h-full max-w-full rounded-lg object-contain"
            />

            {total > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Photo précédente"
                  className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-orbit-500 sm:left-6"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={next}
                  aria-label="Photo suivante"
                  className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-orbit-500 sm:right-6"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 pb-5">
            {images.map((img, i) => (
              <button
                key={`lb-${img}-${i}`}
                onClick={() => setActive(i)}
                aria-label={`Voir la photo ${i + 1}`}
                className={`h-14 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                  active === i ? "border-orbit-500" : "border-white/20 opacity-50 hover:opacity-90"
                }`}
              >
                <img src={unsplash(img, 260)} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
