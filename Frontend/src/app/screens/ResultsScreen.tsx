import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { useApp, SAMPLE_DISHES } from "../context/AppContext";
import { ChevronLeft, ChevronRight, SlidersHorizontal, Flame, Shield, Zap, Bookmark, SearchX, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const TAG_COLORS: Record<string, { bg: string; text: string;}> = {
  "Rico en hierro": { bg: "bg-[#FEE2E2]", text: "text-[#DC2626]"},
  "Sin gluten": { bg: "bg-[#FEF9C3]", text: "text-[#92600A]"},
  "Alto en fibra": { bg: "bg-[#E8F5EE]", text: "text-[#1A5C3A]"},
  "Alto en proteína": { bg: "bg-[#EDE9FE]", text: "text-[#5B21B6]"},
  "Sin lactosa": { bg: "bg-[#F0FDF4]", text: "text-[#166534]"},
  "Vegano": { bg: "bg-[#F0FDF4]", text: "text-[#166534]"},
  "Económico": { bg: "bg-[#FFF7ED]", text: "text-[#9A3412]"},
  "Bajo en calorías": { bg: "bg-[#EFF6FF]", text: "text-[#1D4ED8]"},
  default: { bg: "bg-[#F5F9F7]", text: "text-[#1A2B2A]"},
};

const FILTER_OPTIONS = ["Todos", "Rico en hierro", "Vegano", "Alto en proteína"];

export function ResultsScreen() {
  const navigate = useNavigate();
  const { lastBudget, isDishSaved } = useApp();
  const [activeFilter, setActiveFilter] = useState("Todos");

  const allResults = SAMPLE_DISHES.filter((d) => d.price <= lastBudget);
  const results = activeFilter === "Todos" ? allResults : allResults.filter((d) => d.tags.includes(activeFilter));

  // Empty state when no dishes match budget
  if (allResults.length === 0) {
    return (
      <AppLayout showNav>
        <div className="bg-[#1A5C3A] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
            <button onClick={() => navigate("/search")} className="flex items-center gap-1 text-[#A7D9BA] text-sm mb-3">
              <ChevronLeft size={18} /> Volver a búsqueda
            </button>
            <h1 className="text-white text-2xl font-bold">Resultados para ti</h1>
            <p className="text-[#A7D9BA] text-sm mt-1">Presupuesto: <span className="font-semibold text-[#EF4444]/80">S/. {lastBudget.toFixed(2)}</span></p>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="relative inline-block mb-6">
            <div className="w-28 h-28 bg-[#FFF5F5] rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-[#FEE2E2] rounded-full flex items-center justify-center">
                <SearchX size={36} className="text-[#EF4444]" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#FEF9C3] rounded-full flex items-center justify-center">
              <span className="text-base"></span>
            </div>
          </div>
          <h2 className="text-[#1A2B2A] font-bold text-xl mb-3">No encontramos opciones</h2>
          <p className="text-[#717182] text-sm leading-relaxed mb-8 max-w-sm mx-auto">
            No encontramos opciones con tu presupuesto de <span className="font-semibold text-[#1A2B2A]">S/. {lastBudget.toFixed(2)}</span>. Intenta modificar tu presupuesto u otros criterios de búsqueda.
          </p>
          <div className="bg-[#FFF8EC] border border-[#FDDFA0] rounded-2xl p-4 mb-6 text-left max-w-sm mx-auto">
            <p className="text-[#92600A] text-xs font-semibold mb-2">Sugerencias</p>
            <ul className="space-y-1.5 text-[#78350F] text-xs">
              <li className="flex items-start gap-2"><span className="text-[#F59E0B] mt-0.5">→</span>Aumenta tu presupuesto a S/. 3.00 o más</li>
              <li className="flex items-start gap-2"><span className="text-[#F59E0B] mt-0.5">→</span>Agrega ingredientes disponibles en casa</li>
              <li className="flex items-start gap-2"><span className="text-[#F59E0B] mt-0.5">→</span>Revisa tu perfil de salud y restricciones</li>
            </ul>
          </div>
          <button onClick={() => navigate("/search")} className="w-full max-w-sm mx-auto bg-gradient-to-br from-[#2ECC71] to-[#27AE60] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold shadow-lg shadow-[#2ECC71]/25">
            <ArrowLeft size={18} /> Modificar búsqueda
          </button>
        </div>
      </AppLayout>
    );
  }

  const filteredEmpty = activeFilter !== "Todos" && results.length === 0;

  return (
    <AppLayout showNav>
      {/* Header */}
      <div className="bg-[#1A5C3A] relative overflow-hidden">
        <div className="absolute -top-8 right-0 w-48 h-48 bg-[#2ECC71]/08 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          <button onClick={() => navigate("/search")} className="flex items-center gap-1 text-[#A7D9BA] text-sm mb-3 hover:text-white transition-colors">
            <ChevronLeft size={18} /> Volver a búsqueda
          </button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-white text-2xl lg:text-3xl font-bold">Resultados para ti</h1>
              <p className="text-[#A7D9BA] text-sm mt-1">
                Presupuesto: <span className="font-semibold text-white">S/. {lastBudget.toFixed(2)}</span>
                <span className="ml-2 text-[#A7D9BA]">·</span>
                <span className="ml-2">{allResults.length} platos encontrados</span>
              </p>
            </div>
            <button className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              <SlidersHorizontal size={15} /> Filtros avanzados
            </button>
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeFilter === f ? "bg-[#2ECC71] text-white" : "bg-white/10 text-[#A7D9BA] hover:bg-white/20 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Iron banner */}
        <div className="bg-gradient-to-r from-[#FEF2F2] to-[#FFF7ED] border border-[#FDDFA0] rounded-2xl px-4 py-3 flex items-center gap-3 mb-6">
          <span className="text-xl"></span>
          <p className="text-[#78350F] text-sm">
            <span className="font-semibold">Perfil de anemia activo</span> — Priorizamos platos ricos en hierro y vitamina C para ti.
          </p>
        </div>

        {filteredEmpty ? (
          <div className="bg-[#F5F9F7] border border-[#E0EDE6] rounded-2xl p-8 text-center">
            <SearchX size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-[#1A2B2A] text-sm font-medium mb-1">Sin resultados para "{activeFilter}"</p>
            <p className="text-[#717182] text-xs mb-3">No encontramos opciones con este filtro. Intenta modificar tu presupuesto u otros criterios.</p>
            <button onClick={() => setActiveFilter("Todos")} className="text-[#2ECC71] text-sm font-semibold">Ver todos los resultados</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((dish, idx) => {
              const saved = isDishSaved(dish.id);
              return (
                <button
                  key={dish.id}
                  onClick={() => navigate(`/dish/${dish.id}`)}
                  className="bg-white border border-[#E8F5EE] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#2ECC71]/40 transition-all text-left group"
                >
                  <div className="relative">
                    <ImageWithFallback src={dish.image} alt={dish.name} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <span className="text-[#1A5C3A] font-bold text-sm">S/. {dish.price.toFixed(2)}</span>
                      <span className="text-[#717182] text-[10px]">/ porción</span>
                    </div>
                    {dish.ironRich && (
                      <div className="absolute top-3 left-3 bg-[#DC2626] text-white px-2.5 py-1 rounded-xl flex items-center gap-1 text-[11px] font-semibold">
                        <span></span> Rico en hierro
                      </div>
                    )}
                    <div className={`absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center ${saved ? "bg-[#2ECC71]" : "bg-white/80"}`}>
                      <Bookmark size={14} className={saved ? "text-white fill-white" : "text-[#717182]"} />
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#2ECC71]/90 backdrop-blur-sm text-white px-2 py-1 rounded-xl text-[11px] font-semibold">
                      {idx === 0 ? "✨ Mejor match" : idx === 1 ? "⚡ Recomendado" : "👍 Sugerido"}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-[#1A2B2A] font-semibold text-sm leading-tight">{dish.name}</h3>
                      <ChevronRight size={16} className="text-gray-300 shrink-0 mt-0.5 group-hover:text-[#2ECC71] transition-colors" />
                    </div>
                    <p className="text-[#717182] text-xs leading-relaxed mb-3 line-clamp-2">{dish.description}</p>
                    <div className="flex items-center gap-3 mb-3 text-xs text-[#717182]">
                      <span className="flex items-center gap-1"><Flame size={11} className="text-[#F97316]" /> {dish.calories} kcal</span>
                      <span className="flex items-center gap-1"><Zap size={11} className="text-[#F59E0B]" /> {dish.ingredients.length} ingredientes</span>
                      {dish.ironRich && <span className="flex items-center gap-1"><Shield size={11} className="text-[#DC2626]" /> Hierro</span>}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {dish.tags.slice(0, 3).map((tag) => {
                        const style = TAG_COLORS[tag] ?? TAG_COLORS["default"];
                        return (
                          <span key={tag} className={`${style.bg} ${style.text} text-[10px] px-2.5 py-1 rounded-full font-medium`}>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
