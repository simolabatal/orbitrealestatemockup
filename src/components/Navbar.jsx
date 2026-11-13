import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo, Button } from "./ui.jsx";
import { useCurrency } from "../CurrencyContext.jsx";

const LINKS = [
  { id: "home", label: "Accueil" },
  { id: "portfolio", label: "Portefeuille" },
  { id: "services", label: "Services" },
  { id: "investors", label: "Investisseurs" },
  { id: "contact", label: "Contact" },
];

function CurrencyToggle({ solid }) {
  const { currency, setCurrency } = useCurrency();
  const options = [
    { code: "MAD", short: "MAD", title: "Dirham marocain (د.م.)" },
    { code: "EUR", short: "EUR", title: "Euro (€)" },
  ];

  return (
    <div
      className={`flex items-center rounded-full border p-0.5 ${
        solid ? "border-ink/15" : "border-white/25"
      }`}
      role="group"
      aria-label="Sélecteur de devise"
    >
      {options.map((o) => {
        const active = currency === o.code;
        return (
          <button
            key={o.code}
            onClick={() => setCurrency(o.code)}
            title={o.title}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide transition-all duration-300 ${
              active
                ? solid
                  ? "bg-ink text-white"
                  : "bg-white text-ink"
                : solid
                  ? "text-ink/55 hover:text-ink"
                  : "text-white/60 hover:text-white"
            }`}
          >
            {o.short}
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar({ page, onNavigate, onVisit }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || page !== "home" || open;

  const go = (id) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-ink/5 bg-offwhite/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <button onClick={() => go("home")} aria-label="Orbit Real Estate — Accueil" className="cursor-pointer">
          <Logo light={!solid} />
        </button>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const active = page === l.id;
            return (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`relative px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-300 ${
                  solid ? "text-ink/70 hover:text-ink" : "text-white/80 hover:text-white"
                } ${active ? (solid ? "text-ink" : "text-white") : ""}`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-orbit-500 transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <CurrencyToggle solid={solid} />
          <button
            onClick={onVisit}
            className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-semibold tracking-wide transition-all duration-300 hover:border-orbit-500 hover:bg-orbit-500 hover:text-white ${
              solid ? "border-ink/20 text-ink" : "border-white/40 text-white"
            }`}
          >
            Visite privée
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition-colors duration-300 lg:hidden ${
            solid
              ? "border-ink/10 bg-white/70 text-ink"
              : "border-white/25 bg-black/20 text-white"
          }`}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out lg:hidden ${
          open ? "max-h-[460px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-ink/5 bg-offwhite px-5 py-4">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                page === l.id ? "bg-sand-100 text-ink" : "text-ink/70 hover:bg-sand-50"
              }`}
            >
              {l.label}
            </button>
          ))}
          <div className="mt-2 flex items-center justify-between px-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Devise
            </span>
            <CurrencyToggle solid />
          </div>
          <div className="mt-2 px-2">
            <Button onClick={() => { setOpen(false); onVisit(); }} className="w-full">
              Réserver une visite privée
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
