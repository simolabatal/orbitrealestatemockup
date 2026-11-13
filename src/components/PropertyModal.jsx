import { useEffect, useState } from "react";
import {
  X,
  MapPin,
  Ruler,
  BedDouble,
  Bath,
  CalendarDays,
  Check,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { unsplash } from "../data.js";
import { formatPrice } from "../lib.js";
import { Badge, Button } from "./ui.jsx";

export default function PropertyModal({ property, onClose, onVisit }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!property) return null;

  const specs = [
    { icon: <Ruler className="h-5 w-5" />, label: "Surface", value: `${property.surface} m²` },
    ...(property.bedrooms > 0
      ? [{ icon: <BedDouble className="h-5 w-5" />, label: "Chambres", value: `${property.bedrooms}` }]
      : []),
    ...(property.bathrooms > 0
      ? [{ icon: <Bath className="h-5 w-5" />, label: "Salles d'eau", value: `${property.bathrooms}` }]
      : []),
    ...(property.year
      ? [{ icon: <CalendarDays className="h-5 w-5" />, label: "Année", value: `${property.year}` }]
      : []),
    { icon: <TrendingUp className="h-5 w-5" />, label: "Rendement estimé", value: property.yield },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="backdrop-in absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="modal-in relative z-10 flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-white sm:rounded-3xl">
        {/* Galerie */}
        <div className="relative">
          <div className="relative aspect-[16/9] overflow-hidden bg-wood-800">
            <img
              src={unsplash(property.images[active], 1600)}
              alt={`${property.name} — vue ${active + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink backdrop-blur transition-colors hover:bg-orbit-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-5 sm:bottom-5 sm:left-6">
            {property.badge && <Badge className="mb-2">{property.badge}</Badge>}
            <h2 className="font-serif text-2xl text-white sm:text-3xl">{property.name}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
              <MapPin className="h-4 w-4 text-orbit-400" />
              {property.neighborhood} · {property.city}
            </p>
          </div>

          <div className="absolute bottom-4 right-5 flex gap-2 sm:bottom-5 sm:right-6">
            {property.images.map((img, i) => (
              <button
                key={img + i}
                onClick={() => setActive(i)}
                className={`h-12 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                  active === i ? "border-orbit-500" : "border-white/40 opacity-70 hover:opacity-100"
                }`}
              >
                <img src={unsplash(img, 200)} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Corps scrollable */}
        <div className="overflow-y-auto">
          <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.6fr_1fr]">
            {/* Gauche */}
            <div>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                    {property.category}
                  </p>
                  <p className="mt-1 font-serif text-3xl text-orbit-600">
                    {formatPrice(property.price)}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[15px] leading-relaxed text-ink/70">
                {property.description}
              </p>

              <h3 className="mt-8 font-serif text-xl text-ink">Prestations & équipements</h3>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {property.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-ink/75">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orbit-50 text-orbit-600">
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
                <dl className="mt-4 space-y-4">
                  {specs.map((s) => (
                    <div key={s.label} className="flex items-center justify-between border-b border-ink/5 pb-3 last:border-0 last:pb-0">
                      <dt className="flex items-center gap-2.5 text-sm text-ink/60">
                        <span className="text-orbit-500">{s.icon}</span>
                        {s.label}
                      </dt>
                      <dd className="text-sm font-semibold text-ink">{s.value}</dd>
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
                  href={`https://wa.me/212661234567?text=${encodeURIComponent(
                    `Bonjour Orbit, je souhaite en savoir plus sur « ${property.name} » (${property.neighborhood}, ${property.city}).`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Contacter un agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
