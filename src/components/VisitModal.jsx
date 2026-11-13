import { useEffect, useMemo, useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Home,
  Users,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Download,
  Sparkles,
  MapPin,
} from "lucide-react";
import { PROPERTIES, CONFIG } from "../data.js";
import { useCurrency } from "../CurrencyContext.jsx";
import {
  TIME_SLOTS,
  nextDays,
  formatDayLabel,
  formatFullDate,
  buildCalendarEvent,
  downloadICS,
  generateDossierCode,
} from "../lib.js";

export default function VisitModal({ initialPropertyId, onClose }) {
  const { formatPrice } = useCurrency();
  const [step, setStep] = useState(0);
  const [type, setType] = useState(initialPropertyId ? "property" : "property");
  const [propertyId, setPropertyId] = useState(initialPropertyId || "");
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [dossier, setDossier] = useState(null);

  const days = useMemo(() => nextDays(14), []);
  const property = PROPERTIES.find((p) => p.id === propertyId);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const canContinue =
    (type === "consultation" || propertyId) && date && slot;

  const goConfirm = (e) => {
    e.preventDefault();
    if (!canContinue) return;

    const [h, m] = slot.split(":").map(Number);
    const start = new Date(date);
    start.setHours(h, m, 0, 0);

    const code = generateDossierCode();
    const title =
      type === "property"
        ? `Visite privée — ${property.name}`
        : "Consultation privée — Orbit Real Estate";
    const location =
      type === "property"
        ? `${property.name}, ${property.neighborhood}, ${property.city}`
        : CONFIG.address;
    const description =
      `Dossier ${code}\n` +
      `Type : ${type === "property" ? "Visite d'un bien" : "Consultation privée"}\n` +
      (property ? `Bien : ${property.name} (${property.neighborhood}, ${property.city})\n` : "") +
      `Date : ${formatFullDate(start)} à ${slot}\n` +
      `Contact : ${contact.name} — ${contact.phone} — ${contact.email}\n` +
      `Organisé par ${CONFIG.legal}.`;

    const { googleUrl, ics } = buildCalendarEvent({
      title,
      description,
      location,
      start,
      durationMin: 60,
    });

    setDossier({ code, title, location, start, slot, googleUrl, ics });
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <div className="backdrop-in absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="modal-in relative z-10 flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white sm:rounded-3xl">
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-ink/5 px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orbit-600">
              Visite privée
            </p>
            <h2 className="font-serif text-xl text-ink">
              {step === 2 ? "Confirmation" : "Réservez votre créneau"}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-100 text-ink transition-colors hover:bg-orbit-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Indicateur d'étapes */}
        {step < 2 && (
          <div className="flex items-center gap-2 px-6 pt-5">
            <StepDot n={1} label="Choix" active={step >= 0} />
            <div className={`h-px flex-1 ${step >= 1 ? "bg-orbit-500" : "bg-ink/10"}`} />
            <StepDot n={2} label="Coordonnées" active={step >= 1} />
          </div>
        )}

        <div className="overflow-y-auto">
          {step === 0 && (
            <div className="p-6">
              {/* Type */}
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
                Type de rendez-vous
              </p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <TypeCard
                  active={type === "property"}
                  onClick={() => setType("property")}
                  icon={<Home className="h-5 w-5" />}
                  title="Visite d'un bien"
                  desc="Découvrir une adresse du portefeuille"
                />
                <TypeCard
                  active={type === "consultation"}
                  onClick={() => setType("consultation")}
                  icon={<Users className="h-5 w-5" />}
                  title="Consultation privée"
                  desc="Échanger sur votre projet"
                />
              </div>

              {/* Bien */}
              {type === "property" && (
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
                    Choisissez le bien
                  </p>
                  <select
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                    className="input-dark mt-3"
                  >
                    <option value="" disabled>
                      Sélectionner un bien…
                    </option>
                    {PROPERTIES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.neighborhood}, {p.city}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Date */}
              <div className="mt-6">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
                  <Calendar className="h-3.5 w-3.5" />
                  Choisissez la date
                </p>
                <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
                  {days.map((d) => {
                    const iso = d.toDateString();
                    const active = date?.toDateString() === iso;
                    return (
                      <button
                        key={iso}
                        onClick={() => setDate(d)}
                        className={`flex shrink-0 flex-col items-center rounded-2xl border px-4 py-2.5 transition-all duration-300 ${
                          active
                            ? "border-orbit-500 bg-orbit-500 text-white shadow-[0_10px_24px_-10px_rgba(255,85,0,0.6)]"
                            : "border-ink/10 bg-white text-ink hover:border-ink/30"
                        }`}
                      >
                        <span className="text-[11px] uppercase tracking-wide opacity-70">
                          {d.toLocaleDateString("fr-FR", { weekday: "short" })}
                        </span>
                        <span className="font-serif text-lg leading-none">
                          {d.getDate()}
                        </span>
                        <span className="text-[10px] uppercase tracking-wide opacity-70">
                          {d.toLocaleDateString("fr-FR", { month: "short" })}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Créneau */}
              <div className="mt-6">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
                  <Clock className="h-3.5 w-3.5" />
                  Choisissez le créneau
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TIME_SLOTS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSlot(s)}
                      className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                        slot === s
                          ? "border-orbit-500 bg-orbit-500 text-white"
                          : "border-ink/10 bg-white text-ink hover:border-ink/30"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                disabled={!canContinue}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-orbit-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuer
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={goConfirm} className="p-6">
              <div className="mb-5 rounded-2xl bg-sand-50 p-4 text-sm text-ink/70">
                <p className="font-semibold text-ink">
                  {type === "property" ? property?.name : "Consultation privée"}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-orbit-500" />
                  {type === "property"
                    ? `${property?.neighborhood}, ${property?.city}`
                    : CONFIG.address}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-orbit-500" />
                  {date ? formatDayLabel(date) : ""} · {slot}
                </p>
                {type === "property" && property && (
                  <p className="mt-2 border-t border-ink/5 pt-2 font-serif text-lg text-orbit-600">
                    {formatPrice(property.price)}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Field label="Nom complet *">
                  <input
                    required
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                    placeholder="Votre nom"
                    className="input-dark"
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email *">
                    <input
                      required
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                      placeholder="vous@exemple.com"
                      className="input-dark"
                    />
                  </Field>
                  <Field label="Téléphone *">
                    <input
                      required
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                      placeholder="+212 6 00 00 00 00"
                      className="input-dark"
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-4 text-sm font-semibold text-ink transition-colors hover:border-ink"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </button>
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-orbit-500 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-orbit-600 hover:shadow-[0_16px_36px_-10px_rgba(255,85,0,0.65)]"
                >
                  Confirmer ma visite
                  <Check className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && dossier && (
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-orbit-50">
                  <CheckCircle2 className="h-8 w-8 text-orbit-500" />
                </span>
                <h3 className="mt-5 font-serif text-2xl text-ink">Votre visite est confirmée</h3>
                <p className="mt-2 max-w-sm text-sm text-ink/60">
                  Un conseiller Orbit vous recontacte pour finaliser les détails.
                </p>

                {/* Code dossier */}
                <div className="mt-6 w-full rounded-2xl border border-dashed border-orbit-500/40 bg-orbit-50 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orbit-600">
                    Votre code de dossier
                  </p>
                  <p className="mt-2 font-serif text-3xl tracking-[0.1em] text-ink">
                    {dossier.code}
                  </p>
                </div>

                {/* Récapitulatif */}
                <div className="mt-5 w-full rounded-2xl bg-sand-50 p-4 text-left text-sm text-ink/70">
                  <p className="font-semibold text-ink">{dossier.title}</p>
                  <p className="mt-1 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-orbit-500" />
                    {dossier.location}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-orbit-500" />
                    {formatFullDate(dossier.start)} · {dossier.slot}
                  </p>
                </div>

                {/* Double option agenda */}
                <div className="mt-7 w-full">
                  <p className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink/40">
                    <Sparkles className="h-3.5 w-3.5 text-orbit-500" />
                    Ajouter à mon agenda
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <a
                      href={dossier.googleUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a73e8] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(26,115,232,0.7)]"
                    >
                      <Calendar className="h-4 w-4" />
                      Google Calendar
                    </a>
                    <button
                      onClick={() => downloadICS(dossier.ics, `orbit-${dossier.code}.ics`)}
                      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-5 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-orbit-500 hover:text-orbit-600"
                    >
                      <Download className="h-4 w-4" />
                      Apple · .ics
                    </button>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="mt-7 w-full rounded-full bg-sand-100 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-sand-200"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TypeCard({ active, onClick, icon, title, desc }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${
        active ? "border-orbit-500 bg-orbit-50" : "border-ink/10 bg-white hover:border-ink/30"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          active ? "bg-orbit-500 text-white" : "bg-sand-100 text-ink/60"
        }`}
      >
        {icon}
      </span>
      <span>
        <span className={`block text-sm font-bold ${active ? "text-orbit-600" : "text-ink"}`}>
          {title}
        </span>
        <span className="mt-0.5 block text-xs text-ink/50">{desc}</span>
      </span>
    </button>
  );
}

function StepDot({ n, label, active }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
          active ? "bg-orbit-500 text-white" : "bg-ink/10 text-ink/40"
        }`}
      >
        {n}
      </span>
      <span className={`text-xs font-semibold ${active ? "text-ink" : "text-ink/40"}`}>{label}</span>
    </div>
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
