import { MapPin, BedDouble, Bath, Ruler, ArrowUpRight, Images } from "lucide-react";
import { unsplash, STATUSES } from "../data.js";
import { useCurrency } from "../CurrencyContext.jsx";
import { Badge } from "./ui.jsx";

export default function PropertyCard({ property, onOpen, index = 0 }) {
  const { formatPrice } = useCurrency();
  const { name, category, city, neighborhood, price, surface, bedrooms, bathrooms, status, images } =
    property;
  const statusMeta = status ? STATUSES[status] : null;

  return (
    <article
      className="group reveal is-visible flex cursor-pointer flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_-18px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]"
      onClick={() => onOpen(property.id)}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      {/* Visuel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={unsplash(images[0], 1200)}
          alt={name}
          loading="lazy"
          className="img-zoom h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {statusMeta && (
          <div className="absolute left-4 top-4">
            <Badge tone={statusMeta.tone}>{statusMeta.label}</Badge>
          </div>
        )}

        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-orbit-500">
          <Images className="h-3.5 w-3.5" />
          {images.length}
        </span>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              {category}
            </p>
            <h3 className="font-serif text-xl text-white">{name}</h3>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-sm text-ink/60">
          <MapPin className="h-4 w-4 text-orbit-500" />
          <span className="font-medium">
            {neighborhood} · {city}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-4 text-[13px] font-medium text-ink/70">
          <Spec icon={<Ruler className="h-4 w-4" />} value={`${surface} m²`} />
          {bedrooms > 0 && <Spec icon={<BedDouble className="h-4 w-4" />} value={`${bedrooms} ch.`} />}
          {bathrooms > 0 && <Spec icon={<Bath className="h-4 w-4" />} value={`${bathrooms} sdb`} />}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-ink/5 pt-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">Prix</p>
            <p className="font-serif text-lg text-ink">{formatPrice(price)}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sand-100 px-4 py-2 text-[13px] font-semibold text-ink transition-all duration-300 group-hover:bg-orbit-500 group-hover:text-white">
            Découvrir
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

function Spec({ icon, value }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-orbit-500">{icon}</span>
      {value}
    </span>
  );
}
