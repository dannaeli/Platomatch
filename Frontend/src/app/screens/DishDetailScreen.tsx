import React from "react";
import { useNavigate, useParams } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { useApp, SAMPLE_DISHES } from "../context/AppContext";
import { ChevronLeft, Bookmark, Check, Flame, Zap, Clock, ChefHat, Share2, ShieldCheck, Info, MessageSquare } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function DishDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { saveDish, removeDish, isDishSaved, user } = useApp();
  const dish = SAMPLE_DISHES.find((d) => d.id === id);
  const saved = dish ? isDishSaved(dish.id) : false;

  if (!dish) {
    return (
      <AppLayout showNav>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-[#717182]">Plato no encontrado</p>
        </div>
      </AppLayout>
    );
  }

  const hasAnemia = user?.conditions?.includes("Anemia");
  const profileMatch = !dish.tags.some((t) =>
    user?.allergies?.some((a) => t.toLowerCase().includes(a.toLowerCase()))
  );
  const showHealthBadge = profileMatch || dish.ironRich;

  return (
    <AppLayout showNav>
      {/* Back bar */}
      <div className="bg-[#1A5C3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#A7D9BA] hover:text-white transition-colors text-sm"
          >
            <ChevronLeft size={18} /> Volver a resultados
          </button>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl text-xs transition-colors">
            <Share2 size={14} /> Compartir
          </button>
        </div>
      </div>

      {/* Two-column layout on desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left: Image + price ── */}
          <div className="lg:col-span-2">
            <div className="sticky top-20">
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <ImageWithFallback src={dish.image} alt={dish.name} className="w-full h-64 lg:h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg">
                    <p className="text-[#717182] text-[10px] uppercase tracking-wider">Costo estimado</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[#1A5C3A] font-bold text-2xl">S/. {dish.price.toFixed(2)}</span>
                      <span className="text-[#717182] text-xs">/ porción</span>
                    </div>
                  </div>
                  {dish.ironRich && (
                    <div className="bg-[#DC2626] text-white px-3 py-2 rounded-2xl shadow-lg">
                      <p className="text-[10px] font-semibold">Rico en hierro</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats — visible on desktop below image */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { icon: <Flame size={16} className="text-[#F97316]" />, label: "Calorías", value: `${dish.calories}`, unit: "kcal", bg: "bg-[#FFF7ED]" },
                  { icon: <Zap size={16} className="text-[#F59E0B]" />, label: "Ingredientes", value: `${dish.ingredients.length}`, unit: "items", bg: "bg-[#FEF9C3]" },
                  { icon: <Clock size={16} className="text-[#3B82F6]" />, label: "Preparación", value: "20", unit: "min", bg: "bg-[#EFF6FF]" },
                ].map((stat) => (
                  <div key={stat.label} className={`${stat.bg} rounded-2xl p-3.5 flex flex-col items-center text-center`}>
                    <div className="mb-1">{stat.icon}</div>
                    <span className="text-[#1A2B2A] font-bold text-lg leading-none">{stat.value}</span>
                    <span className="text-[#717182] text-[10px]">{stat.unit}</span>
                    <span className="text-[#717182] text-[9px] mt-0.5">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: All details ── */}
          <div className="lg:col-span-3">
            {/* Title + badge */}
            <h1 className="text-[#1A2B2A] text-2xl lg:text-3xl font-bold leading-tight mb-3">{dish.name}</h1>

            {showHealthBadge && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E8F5EE] to-[#D1FAE5] border border-[#2ECC71]/30 px-4 py-2.5 rounded-2xl mb-4 w-full">
                <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck size={13} className="text-white" />
                </div>
                <div>
                  <p className="text-[#1A5C3A] text-sm font-bold">Apto para tu perfil de salud</p>
                  {dish.ironRich && (
                    <p className="text-[#2ECC71] text-xs mt-0.5">Rico en hierro{hasAnemia ? " — ideal para anemia" : ""}</p>
                  )}
                </div>
              </div>
            )}

            <p className="text-[#717182] text-sm leading-relaxed mb-5">{dish.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {dish.tags.map((tag) => (
                <span key={tag} className="bg-[#F5F9F7] border border-[#E0EDE6] text-[#1A5C3A] text-xs px-3 py-1.5 rounded-full font-medium">{tag}</span>
              ))}
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-[#E8F5EE] rounded-xl flex items-center justify-center">
                  <ChefHat size={15} className="text-[#2ECC71]" />
                </div>
                <h2 className="text-[#1A2B2A] font-semibold text-base">Ingredientes</h2>
              </div>
              <div className="bg-[#F5F9F7] rounded-2xl overflow-hidden border border-[#E0EDE6]">
                {dish.ingredients.map((ing, i) => (
                  <div key={ing} className={`flex items-center gap-3 px-4 py-3.5 ${i !== dish.ingredients.length - 1 ? "border-b border-[#E8F5EE]" : ""}`}>
                    <div className="w-6 h-6 bg-[#E8F5EE] rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-[#2ECC71] text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-[#1A2B2A] text-sm">{ing}</span>
                    {(ing.toLowerCase().includes("espinaca") || ing.toLowerCase().includes("lentejas")) && (
                      <span className="ml-auto text-[10px] bg-[#FEE2E2] text-[#DC2626] px-2 py-0.5 rounded-full">🩸 Hierro</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Legal disclaimer */}
            <div className="bg-[#F5F9F7] border border-[#E0EDE6] rounded-2xl px-4 py-3.5 mb-6 flex items-start gap-3">
              <div className="w-7 h-7 bg-[#EFF6FF] rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                <Info size={14} className="text-[#3B82F6]" />
              </div>
              <p className="text-[#717182] text-[11px] leading-relaxed">
                <span className="font-semibold text-[#1A2B2A]">Aviso importante:</span>{" "}
                El sistema actúa como herramienta de apoyo y no sustituye el asesoramiento profesional en salud. Consulta a un nutricionista o médico para recomendaciones personalizadas.
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => (saved ? removeDish(dish.id) : saveDish(dish))}
                className={`py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-base transition-all ${
                  saved
                    ? "bg-[#E8F5EE] border-2 border-[#2ECC71] text-[#1A5C3A]"
                    : "bg-gradient-to-br from-[#2ECC71] to-[#27AE60] text-white shadow-xl shadow-[#2ECC71]/30 active:scale-[0.97]"
                }`}
              >
                {saved ? (<><Check size={20} />Plato guardado</>) : (<><Bookmark size={20} />Guardar plato</>)}
              </button>
              <button
                onClick={() => navigate(`/feedback/${dish.id}`)}
                className="py-4 rounded-2xl flex items-center justify-center gap-2 font-medium text-sm border-2 border-[#E8F5EE] bg-white text-[#717182] hover:border-[#2ECC71]/50 transition-all"
              >
                <MessageSquare size={17} className="text-[#2ECC71]" />
                ¿Qué te pareció?
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
