import { useCallback, useState } from "react";
import { PROPERTIES, BUDGETS } from "./data.js";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Services from "./components/Services.jsx";
import Investors from "./components/Investors.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import PropertyModal from "./components/PropertyModal.jsx";
import VisitModal from "./components/VisitModal.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [filters, setFilters] = useState({
    category: "Toutes",
    city: "Toutes",
    budget: BUDGETS[0],
  });
  const [activePropertyId, setActivePropertyId] = useState(null);
  const [visitOpen, setVisitOpen] = useState(false);
  const [visitPropertyId, setVisitPropertyId] = useState(null);

  const navigate = useCallback((p, anchor) => {
    setPage(p);
    if (anchor) {
      // Attend le rendu de la nouvelle page avant de défiler vers la section
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document
            .getElementById(anchor)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const search = useCallback((f) => {
    setFilters(f);
    setPage("portfolio");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openProperty = useCallback((id) => setActivePropertyId(id), []);

  const openVisit = useCallback((propertyId = null) => {
    setVisitPropertyId(propertyId);
    setVisitOpen(true);
  }, []);

  const activeProperty = PROPERTIES.find((p) => p.id === activePropertyId) || null;

  return (
    <div className="min-h-screen bg-offwhite text-ink">
      <div className="grain-overlay" aria-hidden="true" />

      <Navbar page={page} onNavigate={navigate} onVisit={() => openVisit()} />

      <main key={page} className="page-enter">
        {page === "home" && (
          <Home onSearch={search} onNavigate={navigate} onOpen={openProperty} onVisit={openVisit} />
        )}
        {page === "portfolio" && (
          <Portfolio
            filters={filters}
            setFilters={setFilters}
            onOpen={openProperty}
            onVisit={() => openVisit()}
          />
        )}
        {page === "services" && <Services onVisit={() => openVisit()} onNavigate={navigate} />}
        {page === "investors" && <Investors onVisit={() => openVisit()} onNavigate={navigate} />}
        {page === "contact" && <Contact onVisit={() => openVisit()} />}
      </main>

      <Footer onNavigate={navigate} onVisit={() => openVisit()} />
      <WhatsAppButton />

      {activeProperty && (
        <PropertyModal
          property={activeProperty}
          onClose={() => setActivePropertyId(null)}
          onVisit={openVisit}
        />
      )}

      {visitOpen && (
        <VisitModal initialPropertyId={visitPropertyId} onClose={() => setVisitOpen(false)} />
      )}
    </div>
  );
}
