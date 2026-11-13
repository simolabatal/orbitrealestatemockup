import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { CONFIG, CITIES } from "../data.js";
import { Reveal, Eyebrow } from "./ui.jsx";

const ROLES = [
  { id: "Acquéreur", desc: "Je recherche un bien d'exception" },
  { id: "Vendeur", desc: "Je souhaite confier la vente de mon bien" },
  { id: "Investisseur", desc: "Je structure un investissement immobilier" },
];

const ROLE_HINTS = {
  Acquéreur: "Décrivez le bien recherché : type, ville, surface et budget indicatif.",
  Vendeur: "Décrivez le bien à céder : localisation, surface et prix envisagé.",
  Investisseur: "Décrivez votre thèse d'investissement : zone, ticket et horizon.",
};

export default function Contact({ onVisit }) {
  const [role, setRole] = useState("Acquéreur");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Marrakech",
    message: "",
  });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const whatsappLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Bonjour Orbit, je suis ${role.toLowerCase()} et je souhaite être mis en relation. — ${form.name || "Client"}`,
  )}`;

  return (
    <div className="pt-[76px]">
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          {/* Infos */}
          <div>
            <Reveal>
              <Eyebrow>Contact & visite privée</Eyebrow>
              <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-ink sm:text-5xl">
                Parlons de votre projet.
              </h1>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/60">
                Acquéreur, vendeur ou investisseur&nbsp;: notre équipe vous
                répond sous 24h et organise votre visite privée dans les plus
                brefs délais.
              </p>
            </Reveal>

            <div className="mt-10 space-y-5">
              <ContactRow icon={<Phone className="h-5 w-5" />} label="Téléphone" value={CONFIG.phoneDisplay} href={`tel:${CONFIG.phoneRaw}`} />
              <ContactRow icon={<Mail className="h-5 w-5" />} label="Email" value={CONFIG.email} href={`mailto:${CONFIG.email}`} />
              <ContactRow icon={<MapPin className="h-5 w-5" />} label="Adresse" value={CONFIG.address} />
              <ContactRow icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value="Réponse immédiate" href={whatsappLink} target="_blank" />
            </div>

            <Reveal delay={120}>
              <div className="mt-10 rounded-3xl bg-wood-800 p-7">
                <h3 className="font-serif text-xl text-white">Nos adresses</h3>
                <ul className="mt-4 space-y-3">
                  {CONFIG.addresses.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-sm text-white/70">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orbit-400" />
                      {a}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onVisit}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-orbit-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orbit-600"
                >
                  Réserver une visite privée
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          </div>

          {/* Formulaire */}
          <Reveal delay={100}>
            <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] sm:p-9">
              {sent ? (
                <div className="flex flex-col items-center py-14 text-center">
                  <CheckCircle2 className="h-14 w-14 text-orbit-500" />
                  <h2 className="mt-5 font-serif text-2xl text-ink">Demande envoyée</h2>
                  <p className="mt-3 max-w-sm text-[15px] text-ink/60">
                    Merci {form.name.split(" ")[0] || ""}. Un conseiller Orbit
                    vous recontacte sous 24h. Pour une réponse immédiate&nbsp;:
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Ouvrir WhatsApp
                  </a>
                </div>
              ) : (
                <>
                  {/* Rôle segmenté */}
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {ROLES.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setRole(r.id)}
                        className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                          role === r.id
                            ? "border-orbit-500 bg-orbit-50"
                            : "border-ink/10 bg-white hover:border-ink/30"
                        }`}
                      >
                        <span className={`text-sm font-bold ${role === r.id ? "text-orbit-600" : "text-ink"}`}>
                          {r.id}
                        </span>
                        <span className="mt-1 block text-xs leading-snug text-ink/50">{r.desc}</span>
                      </button>
                    ))}
                  </div>

                  <form onSubmit={submit} className="mt-7 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Nom complet *">
                        <input required value={form.name} onChange={update("name")} placeholder="Votre nom" className="input-dark" />
                      </Field>
                      <Field label="Téléphone *">
                        <input required type="tel" value={form.phone} onChange={update("phone")} placeholder="+212 6 00 00 00 00" className="input-dark" />
                      </Field>
                    </div>
                    <Field label="Email *">
                      <input required type="email" value={form.email} onChange={update("email")} placeholder="vous@exemple.com" className="input-dark" />
                    </Field>
                    <Field label="Ville d'intérêt">
                      <select value={form.city} onChange={update("city")} className="input-dark">
                        {CITIES.filter((c) => c !== "Toutes").map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Votre message">
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={update("message")}
                        placeholder={ROLE_HINTS[role]}
                        className="input-dark resize-none"
                      />
                    </Field>

                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-full bg-orbit-500 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-orbit-600 hover:shadow-[0_16px_36px_-10px_rgba(255,85,0,0.65)]"
                    >
                      Envoyer ma demande
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                    <p className="text-center text-xs text-ink/40">
                      Vos données restent confidentielles. Aucune transmission à des tiers.
                    </p>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function ContactRow({ icon, label, value, href, target, rel }) {
  const inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-orbit-600">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/40">{label}</span>
        <span className="text-sm font-semibold text-ink">{value}</span>
      </span>
    </>
  );
  const cls = "flex items-center gap-4 transition-transform duration-300 hover:translate-x-1";
  return href ? (
    <a href={href} target={target} rel={rel} className={cls}>{inner}</a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">
        {label}
      </span>
      {children}
    </label>
  );
}
