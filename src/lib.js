// ============================================================
// ORBIT REAL ESTATE — Utilitaires (format, agenda, dossiers)
// ============================================================

export const formatPrice = (n) =>
  `${n.toLocaleString("fr-FR").replace(/\u202f/g, "\u00a0")} MAD`;

export const formatNumber = (n) => n.toLocaleString("fr-FR");

/** Génère un code de dossier unique : ORB-2026-XXXX */
export function generateDossierCode() {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i += 1) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ORB-${year}-${code}`;
}

const pad = (n) => String(n).padStart(2, "0");

/** Composants « muraux » (heure locale choisie) → chaîne YYYYMMDDTHHMMSS */
const fmtLocal = (d) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(
    d.getHours(),
  )}${pad(d.getMinutes())}00`;

/**
 * Convertit une heure « murale » (Afrique/Casablanca, UTC+1) en timestamp UTC
 * pour le fichier .ics.
 */
const toUTC = (d) => {
  const t = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours() - 1, d.getMinutes());
  const u = new Date(t);
  return `${u.getUTCFullYear()}${pad(u.getUTCMonth() + 1)}${pad(u.getUTCDate())}T${pad(
    u.getUTCHours(),
  )}${pad(u.getUTCMinutes())}00Z`;
};

const escapeIcs = (s = "") =>
  s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");

/**
 * Construit les liens d'agenda (Google Calendar + fichier .ics).
 * @param {object}   params
 * @param {string}   params.title       Titre de l'événement
 * @param {string}   params.description Description
 * @param {string}   params.location    Lieu
 * @param {Date}     params.start       Début (Date locale)
 * @param {number}   params.durationMin Durée en minutes
 */
export function buildCalendarEvent({ title, description, location, start, durationMin = 60 }) {
  const end = new Date(start.getTime() + durationMin * 60 * 1000);

  const googleUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${fmtLocal(start)}/${fmtLocal(end)}` +
    `&ctz=Africa/Casablanca` +
    `&details=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(location)}`;

  const nowIcs = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Orbit Real Estate//Visite Privée//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-TIMEZONE:Africa/Casablanca",
    "BEGIN:VEVENT",
    `UID:${uid}@orbit-realestate.ma`,
    `DTSTAMP:${nowIcs}`,
    `DTSTART:${toUTC(start)}`,
    `DTEND:${toUTC(end)}`,
    `SUMMARY:${escapeIcs(title)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `LOCATION:${escapeIcs(location)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return { googleUrl, ics };
}

export function downloadICS(ics, filename = "orbit-visite-privee.ics") {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// --- Créneaux & dates de visite ---
export const TIME_SLOTS = ["09:00", "10:30", "14:00", "15:30", "17:00"];

export function nextDays(count = 14) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i += 1) {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1); // démarre demain
    days.push(d);
  }
  return days;
}

export function formatDayLabel(d) {
  return d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
}

export function formatFullDate(d) {
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
