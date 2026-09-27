import React from "react";
import { useNavigate } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { useApp, SAMPLE_DISHES } from "../context/AppContext";
import { ChefHat, ChevronRight, Bookmark, Zap, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function HomeScreen() {
  const navigate = useNavigate();
  const { user, savedDishes } = useApp();
  const allDishes = SAMPLE_DISHES;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "¡Buenos días" : hour < 18 ? "¡Buenas tardes" : "¡Buenas noches";

  return (
    <AppLayout showNav>
      {/* ── Page hero ── */}
      <div className="bg-[#1A5C3A] relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-52 h-52 bg-[#2ECC71]/10 rounded-full" />
        <div className="absolute bottom-0 right-0 w-56 h-28 bg-[#2ECC71]/08 rounded-tl-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#A7D9BA] text-sm">{greeting},</p>
              <h1 className="text-white text-2xl lg:text-3xl font-bold mt-0.5">
                {user?.name || "Viajero Saludable"}
              </h1>
              {user?.conditions?.includes("Anemia") && (
                <div className="mt-3 inline-flex items-center gap-2 bg-[#FEF9C3]/20 border border-[#FEF9C3]/30 px-3 py-1.5 rounded-full">
                  <span className="text-[11px] text-[#FEF9C3]">Perfil Anemia activo — priorizando hierro</span>
                </div>
              )}
            </div>
            {/* Desktop stats */}
            <div className="hidden md:flex gap-5 text-right">
              <div>
                <p className="text-white font-bold text-2xl">{savedDishes.length}</p>
                <p className="text-[#A7D9BA] text-xs">Guardados</p>
              </div>
              <div>
                <p className="text-white font-bold text-2xl">{allDishes.length}</p>
                <p className="text-[#A7D9BA] text-xs">Platos disponibles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5 relative z-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left column: CTA + Budget + Tip + Saved ── */}
          <div className="lg:col-span-1 space-y-4">
            {/* Budget card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8F5EE] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#717182] text-xs">Presupuesto sugerido de hoy</p>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-[#1A2B2A] text-2xl font-bold">S/. 5</span>
                    <span className="text-[#717182] text-xs">— S/. 8</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-[#E8F5EE] rounded-2xl flex items-center justify-center">
                  <span className="text-2xl"></span>
                </div>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full mt-3">
                <div className="h-1.5 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full w-3/5" />
              </div>
              <p className="text-[#717182] text-xs mt-1">Rango económico para hoy</p>
            </div>

            {/* Main CTA */}
            <button
              onClick={() => navigate("/search")}
              className="w-full bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-[#2ECC71]/25 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ChefHat size={26} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white/80 text-xs mb-0.5">¿Qué comemos hoy?</p>
                  <p className="text-white font-bold text-base leading-tight">Planear mi comida</p>
                  <p className="text-white/70 text-xs mt-0.5">Ingresa tu presupuesto</p>
                </div>
              </div>
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <ArrowRight size={18} className="text-white" />
              </div>
            </button>

            {/* Tip del día */}
            <div className="bg-[#FFF8EC] border border-[#FDDFA0] rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FEF3C7] rounded-xl flex items-center justify-center shrink-0">
                <Zap size={16} className="text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-[#92600A] text-[11px] font-semibold">Tip del día</p>
                <p className="text-[#78350F] text-xs">Las espinacas son ricas en hierro — combínalas con limón para mejor absorción.</p>
              </div>
            </div>

            {/* Saved dishes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bookmark size={15} className="text-[#2ECC71]" />
                  <h2 className="text-[#1A2B2A] font-semibold text-sm">Platos guardados</h2>
                </div>
                <button onClick={() => navigate("/saved")} className="flex items-center gap-1 text-[#2ECC71] text-xs">
                  Ver todos <ChevronRight size={13} />
                </button>
              </div>
              {savedDishes.length === 0 ? (
                <div className="bg-[#F5F9F7] rounded-2xl p-5 flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-[#E8F5EE] rounded-full flex items-center justify-center mb-2">
                    <Bookmark size={18} className="text-[#2ECC71]" />
                  </div>
                  <p className="text-[#1A2B2A] font-medium text-sm">Aún no tienes platos guardados</p>
                  <p className="text-[#717182] text-xs mt-1">Guarda tus recetas favoritas aquí</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {savedDishes.slice(0, 3).map((dish) => (
                    <button
                      key={dish.id}
                      onClick={() => navigate(`/dish/${dish.id}`)}
                      className="w-full bg-white border border-[#E8F5EE] rounded-2xl p-3 flex items-center gap-3 hover:border-[#2ECC71]/50 transition-all"
                    >
                      <ImageWithFallback src={dish.image} alt={dish.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-[#1A2B2A] text-sm font-medium truncate">{dish.name}</p>
                        <p className="text-[#2ECC71] text-xs font-semibold mt-0.5">S/. {dish.price.toFixed(2)}</p>
                      </div>
                      <ChevronRight size={15} className="text-gray-300 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Right column: Suggestions grid ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#1A2B2A] font-semibold text-base">Sugerencias para ti</h2>
              <button onClick={() => navigate("/search")} className="flex items-center gap-1 text-[#2ECC71] text-xs font-medium">
                Ver más <ChevronRight size={13} />
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {allDishes.map((dish) => (
                <button
                  key={dish.id}
                  onClick={() => navigate(`/dish/${dish.id}`)}
                  className="bg-white border border-[#E8F5EE] rounded-2xl overflow-hidden hover:shadow-md hover:border-[#2ECC71]/40 transition-all text-left"
                >
                  <div className="relative">
                    <ImageWithFallback src={dish.image} alt={dish.name} className="w-full h-32 sm:h-36 object-cover" />
                    {dish.ironRich && (
                      <div className="absolute top-2 left-2 bg-[#DC2626] text-white px-2 py-0.5 rounded-lg text-[10px] font-semibold">
                        Hierro
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-[#1A2B2A] text-sm font-semibold leading-snug line-clamp-2">{dish.name}</p>
                    <p className="text-[#717182] text-xs mt-1 line-clamp-2 leading-relaxed">{dish.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[#2ECC71] text-sm font-bold">S/. {dish.price.toFixed(2)}</span>
                      <span className="text-[#717182] text-[10px]">{dish.calories} kcal</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {dish.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-[#F5F9F7] text-[#1A5C3A] text-[9px] px-2 py-0.5 rounded-full border border-[#E0EDE6]">{tag}</span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
