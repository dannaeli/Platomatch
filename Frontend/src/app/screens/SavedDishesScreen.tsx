import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { useApp } from "../context/AppContext";
import { Bookmark, ChevronRight, Trash2, Search, Flame, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function SavedDishesScreen() {
  const navigate = useNavigate();
  const { savedDishes, removeDish } = useApp();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  function handleRemove(id: string) {
    removeDish(id);
    setConfirmDelete(null);
  }

  return (
    <AppLayout showNav>
      {/* Page header */}
      <div className="bg-[#1A5C3A] relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#2ECC71]/10 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-[#2ECC71]/20 rounded-xl flex items-center justify-center">
                  <Bookmark size={16} className="text-[#2ECC71]" />
                </div>
                <p className="text-[#A7D9BA] text-sm">Mi colección</p>
              </div>
              <h1 className="text-white text-2xl lg:text-3xl font-bold">Platos guardados</h1>
              <p className="text-[#A7D9BA] text-sm mt-1">
                {savedDishes.length > 0
                  ? `${savedDishes.length} plato${savedDishes.length !== 1 ? "s" : ""} en tu colección`
                  : "Tu colección personal de recetas"}
              </p>
            </div>
            {savedDishes.length > 0 && (
              <div className="hidden md:block text-right">
                <p className="text-white font-bold text-3xl">{savedDishes.length}</p>
                <p className="text-[#A7D9BA] text-xs">guardados</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirm delete modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.45)" }}>
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-[#FEE2E2] rounded-2xl flex items-center justify-center">
                <Trash2 size={18} className="text-[#EF4444]" />
              </div>
              <button onClick={() => setConfirmDelete(null)} className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">
                <X size={15} className="text-gray-500" />
              </button>
            </div>
            <h3 className="text-[#1A2B2A] font-semibold text-base mb-1">¿Eliminar plato guardado?</h3>
            <p className="text-[#717182] text-sm mb-5 leading-snug">Esta acción quitará el plato de tu colección. Podrás volver a guardarlo cuando quieras.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-3 bg-[#F5F9F7] border border-[#E0EDE6] text-[#717182] rounded-2xl text-sm font-medium">Cancelar</button>
              <button onClick={() => handleRemove(confirmDelete)} className="flex-1 py-3 bg-[#EF4444] text-white rounded-2xl text-sm font-semibold shadow-md shadow-[#EF4444]/25">Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5 relative z-10 pb-8">
        {savedDishes.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-[#E8F5EE] p-12 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-28 h-28 bg-[#E8F5EE] rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-[#D1FAE5] rounded-full flex items-center justify-center">
                  <Bookmark size={36} className="text-[#2ECC71]" />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#FEF9C3] rounded-full flex items-center justify-center">
                <span className="text-base"></span>
              </div>
            </div>
            <h2 className="text-[#1A2B2A] font-semibold text-lg mb-2">Aún no tienes platos guardados</h2>
            <p className="text-[#717182] text-sm leading-relaxed max-w-sm mb-6">Explora recomendaciones y guarda tus platos favoritos para acceder a ellos cuando quieras.</p>
            <button onClick={() => navigate("/search")} className="bg-[#2ECC71] text-white px-8 py-3.5 rounded-2xl flex items-center gap-2 font-semibold shadow-lg shadow-[#2ECC71]/25">
              <Search size={18} /> Buscar platos
            </button>
          </div>
        ) : (
          <div>
            {/* Summary card */}
            <div className="bg-gradient-to-r from-[#1A5C3A] to-[#2ECC71] rounded-2xl p-5 flex items-center justify-between mb-6 shadow-lg shadow-[#1A5C3A]/20">
              <div>
                <p className="text-white/70 text-xs">Total guardados</p>
                <p className="text-white font-bold text-3xl">{savedDishes.length} platos</p>
                <p className="text-white/70 text-xs mt-0.5">
                  Ahorro potencial: S/. {savedDishes.reduce((acc, d) => acc + (10 - d.price), 0).toFixed(2)}
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-3xl"></span>
              </div>
            </div>

            <p className="text-[#717182] text-xs text-center mb-4">
              Toca <span className="text-[#EF4444] font-medium">Eliminar</span> para quitar un plato de tu colección
            </p>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedDishes.map((dish) => (
                <div key={dish.id} className="bg-white border border-[#E8F5EE] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button className="w-full flex items-center gap-4 p-4 text-left" onClick={() => navigate(`/dish/${dish.id}`)}>
                    <div className="relative shrink-0">
                      <ImageWithFallback src={dish.image} alt={dish.name} className="w-20 h-20 rounded-2xl object-cover" />
                      {dish.ironRich && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#DC2626] rounded-full flex items-center justify-center">
                          <span className="text-[9px]"></span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#1A2B2A] font-semibold text-sm leading-tight mb-1 truncate">{dish.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#2ECC71] font-bold text-sm">S/. {dish.price.toFixed(2)}</span>
                        <span className="text-[#717182] text-xs flex items-center gap-0.5">
                          <Flame size={10} className="text-[#F97316]" /> {dish.calories} kcal
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {dish.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="bg-[#F5F9F7] text-[#1A5C3A] text-[10px] px-2 py-0.5 rounded-full border border-[#E0EDE6]">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 shrink-0" />
                  </button>
                  <div className="border-t border-[#E8F5EE] flex items-center">
                    <button onClick={() => navigate(`/dish/${dish.id}`)} className="flex-1 py-3 text-[#2ECC71] text-xs font-semibold flex items-center justify-center gap-1.5">
                      Ver receta <ChevronRight size={12} />
                    </button>
                    <div className="w-px h-8 bg-[#E8F5EE]" />
                    <button onClick={() => setConfirmDelete(dish.id)} className="px-5 py-3 flex items-center gap-1.5 group">
                      <div className="flex items-center gap-1.5 bg-[#FEF2F2] px-3 py-1.5 rounded-xl group-active:bg-[#FEE2E2] transition-colors">
                        <Trash2 size={12} className="text-[#EF4444]" />
                        <span className="text-[#EF4444] text-xs font-semibold">Eliminar</span>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => navigate("/search")} className="w-full mt-5 border-2 border-dashed border-[#2ECC71]/40 bg-[#F5F9F7] text-[#2ECC71] py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-[#E8F5EE] transition-colors">
              <Search size={16} /> Descubrir más platos
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
