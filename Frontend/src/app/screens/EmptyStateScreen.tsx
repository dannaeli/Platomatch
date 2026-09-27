import React from "react";
import { useNavigate } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { SearchX, ArrowLeft, Lightbulb } from "lucide-react";
import { useApp } from "../context/AppContext";

const SUGGESTIONS = [
  { text: "Aumenta tu presupuesto a S/. 3.00 o más" },
  { text: "Agrega ingredientes disponibles en casa" },
  { text: "Revisa tu perfil de salud y restricciones" },
  { text: "Prueba con términos de búsqueda más generales" },
];

export function EmptyStateScreen() {
  const navigate = useNavigate();
  const { lastBudget } = useApp();

  return (
    <AppLayout showNav>
      <div className="bg-[#1A5C3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <button onClick={() => navigate("/search")} className="flex items-center gap-1 text-[#A7D9BA] hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Volver a búsqueda
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-32 h-32 bg-[#FFF5F5] rounded-full flex items-center justify-center">
              <div className="w-24 h-24 bg-[#FEE2E2] rounded-full flex items-center justify-center">
                <SearchX size={40} className="text-[#EF4444]" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-10 h-10 bg-[#FEF9C3] rounded-full flex items-center justify-center text-xl shadow-md"></div>
          </div>
        </div>

        {/* Copy */}
        <div className="text-center mb-8">
          <h1 className="text-[#1A2B2A] font-bold text-2xl mb-3">No encontramos opciones</h1>
          <p className="text-[#717182] text-sm leading-relaxed max-w-sm mx-auto">
            No encontramos opciones, intenta modificar tu presupuesto u otros criterios.
          </p>
          {lastBudget > 0 && (
            <div className="inline-flex items-center gap-2 bg-[#FEF2F2] border border-[#FECACA] px-4 py-2 rounded-2xl mt-4">
              <span className="text-[#EF4444] text-xs font-semibold">Presupuesto buscado:</span>
              <span className="text-[#DC2626] font-bold">S/. {lastBudget.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8F5EE] p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#FEF9C3] rounded-xl flex items-center justify-center">
              <Lightbulb size={15} className="text-[#F59E0B]" />
            </div>
            <p className="text-[#1A2B2A] font-semibold text-sm">Sugerencias para mejorar tu búsqueda</p>
          </div>
          <div className="space-y-2.5">
            {SUGGESTIONS.map((s) => (
              <div key={s.text} className="flex items-center gap-3 bg-[#F5F9F7] rounded-2xl px-4 py-3">
                <p className="text-[#1A2B2A] text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/search")}
            className="flex-1 py-4 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] text-white rounded-2xl flex items-center justify-center gap-2 font-semibold shadow-lg shadow-[#2ECC71]/25"
          >
            <ArrowLeft size={18} /> Modificar búsqueda
          </button>
          <button
            onClick={() => navigate("/home")}
            className="flex-1 py-4 bg-white border-2 border-[#E0EDE6] text-[#717182] rounded-2xl flex items-center justify-center gap-2 font-medium"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
