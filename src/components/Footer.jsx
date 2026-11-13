import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook, ArrowUpRight } from "lucide-react";
import { CONFIG } from "../data.js";
import { Logo } from "./ui.jsx";

const NAV = [
  { id: "home", label: "Accueil" },
  { id: "portfolio", label: "Portefeuille" },
  { id: "services", label: "Services" },
  { id: "investors", label: "Investisseurs" },
  { id: "contact", label: "Contact" },
];

export default function Footer({ onNavigate, onVisit }) {
  return (
    <footer className="bg-wood-900 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* Marque */}
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              L'agence de référence de l'immobilier d'exception au Maroc.
              Acquisition, développement, construction et gestion de biens
              rares depuis 2011.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: <Instagram className="h-4 w-4" />, href: CONFIG.socials.instagram, label: "Instagram" },
                { icon: <Linkedin className="h-4 w-4" />, href: CONFIG.socials.linkedin, label: "LinkedIn" },
                { icon: <Facebook className="h-4 w-4" />, href: CONFIG.socials.facebook, label: "Facebook" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-orbit-500 hover:bg-orbit-500 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Navigation
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => onNavigate(l.id)}
                    className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Villes */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Villes
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {CONFIG.cities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <button
              onClick={onVisit}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-orbit-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orbit-600"
            >
              Visite privée
            </button>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orbit-400" />
                {CONFIG.address}
              </li>
              <li>
                <a href={`tel:${CONFIG.phoneRaw}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-orbit-400" />
                  {CONFIG.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONFIG.email}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-orbit-400" />
                  {CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {CONFIG.legal}. Tous droits réservés.
          </p>
          <p className="text-xs text-white/40">
            L'immobilier d'exception. De la vision à la clé.
          </p>
        </div>
      </div>
    </footer>
  );
}
