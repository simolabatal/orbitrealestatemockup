import { createContext, useContext, useMemo, useState } from "react";

// Taux indicatif : 1 € = 10,8 MAD
export const EUR_RATE = 10.8;

const CURRENCIES = {
  MAD: { code: "MAD", symbol: "د.م.", label: "Dirham marocain" },
  EUR: { code: "EUR", symbol: "€", label: "Euro" },
};

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem("orbit-currency");
        if (saved === "MAD" || saved === "EUR") return saved;
      } catch {
        /* stockage indisponible */
      }
    }
    return "MAD";
  });

  const setCurrency = (c) => {
    setCurrencyState(c);
    try {
      window.localStorage.setItem("orbit-currency", c);
    } catch {
      /* stockage indisponible */
    }
  };

  const value = useMemo(() => {
    const convert = (mad) => (currency === "EUR" ? mad / EUR_RATE : mad);

    const formatIn = (mad, code = currency) => {
      if (code === "EUR") {
        const eur = Math.round(mad / EUR_RATE);
        return `${eur.toLocaleString("fr-FR").replace(/\u202f/g, "\u00a0")} €`;
      }
      return `${Math.round(mad).toLocaleString("fr-FR").replace(/\u202f/g, "\u00a0")} MAD`;
    };

    const formatPrice = (mad) => formatIn(mad, currency);

    /** Format compact pour les libellés de budget : 5 M MAD, 463 k €… */
    const formatCompact = (mad, code = currency) => {
      const n = code === "EUR" ? mad / EUR_RATE : mad;
      const suffix = code === "EUR" ? "€" : "MAD";
      const fr = (v, d = 0) => v.toLocaleString("fr-FR", { maximumFractionDigits: d });
      if (n >= 1_000_000) return `${fr(n / 1_000_000, 1)} M ${suffix}`;
      if (n >= 1_000) return `${fr(n / 1_000)} k ${suffix}`;
      return `${fr(n)} ${suffix}`;
    };

    return {
      currency,
      setCurrency,
      convert,
      formatPrice,
      formatIn,
      formatCompact,
      symbol: CURRENCIES[currency].symbol,
      label: CURRENCIES[currency].label,
      rate: EUR_RATE,
    };
  }, [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency doit être utilisé dans <CurrencyProvider>");
  return ctx;
}
