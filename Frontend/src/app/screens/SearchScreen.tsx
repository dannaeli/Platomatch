import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { useApp, SAMPLE_DISHES } from "../context/AppContext";
import { Search, ChevronRight, Info, ShoppingBag, AlertCircle } from "lucide-react";

const QUICK_BUDGETS = [3, 5, 8, 10];

export function SearchScreen() {
  const navigate = useNavigate();
  const { lastBudget, setLastBudget, lastIngredients, setLastIngredients } = useApp();
  const [budget, setBudget] = useState<string>(lastBudget > 0 ? String(lastBudget) : "");
  const [ingredients, setIngredients] = useState(lastIngredients);
  const [budgetError, setBudgetError] = useState<string>("");
  const [budgetTouched, setBudgetTouched] = useState(false);

  function validateBudget(val: string): string {
    if (val === "" || val === undefined) return "Ingresa un monto para continuar.";
    const n = parseFloat(val);
    if (isNaN(n)) return "Solo se permiten valores numéricos.";
    if (n <= 0) return "El presupuesto debe ser un número positivo mayor a 0.";
    return "";
  }

  function handleBudgetChange(val: string) {
    setBudget(val);
    if (budgetTouched) setBudgetError(validateBudget(val));
  }

  const handleSearch = () => {
    setBudgetTouched(true);
    const err = validateBudget(budget);
    setBudgetError(err);
    if (err) return;
    const b = parseFloat(budget);
    setLastBudget(b);
    setLastIngredients(ingredients);
    navigate("/results");
  };

  const budgetNum = parseFloat(budget);
  const isValidBudget = budget !== "" && !isNaN(budgetNum) && budgetNum > 0;
  const matchCount = isValidBudget ? SAMPLE_DISHES.filter((d) => d.price <= budgetNum).length : 0;

  return (
    <AppLayout showNav>
      {/* Page header */}
      <div className="bg-[#1A5C3A] relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#2ECC71]/10 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 relative z-10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-[#2ECC71]/20 rounded-xl flex items-center justify-center">
              <Search size={16} className="text-[#2ECC71]" />
            </div>
            <p className="text-[#A7D9BA] text-sm">Planificador de comidas</p>
          </div>
          <h1 className="text-white text-2xl lg:text-3xl font-bold">¿Qué vamos a comer?</h1>
          <p className="text-[#A7D9BA] text-sm mt-1">Ingresa tu presupuesto y te recomendamos opciones saludables</p>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5 pb-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-[#F0F7F3] p-6 lg:p-8">

          {/* Desktop: budget + ingredients side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">

            {/* Budget (lg: 2 cols) */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[#1A2B2A] font-semibold text-sm">
                  Presupuesto máximo <span className="text-[#EF4444]">*</span>
                </label>
                <div className="flex items-center gap-1 text-[#717182] text-xs">
                  <Info size={12} />
                  <span>Por porción</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#E8F5EE] px-2.5 py-1 rounded-lg z-10">
                  <span className="text-[#1A5C3A] font-bold text-sm">S/.</span>
                </div>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => handleBudgetChange(e.target.value)}
                  onBlur={() => { setBudgetTouched(true); setBudgetError(validateBudget(budget)); }}
                  placeholder="0.00"
                  min="0.01"
                  step="0.5"
                  className={`w-full pl-20 pr-4 py-4 lg:py-5 border-2 rounded-2xl text-[#1A2B2A] text-3xl font-bold placeholder-gray-300 outline-none transition-all ${
                    budgetError && budgetTouched
                      ? "bg-[#FFF5F5] border-[#EF4444] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/15"
                      : "bg-[#F5F9F7] border-[#E0EDE6] focus:border-[#2ECC71] focus:ring-2 focus:ring-[#2ECC71]/20"
                  }`}
                />
              </div>

              {budgetError && budgetTouched && (
                <div className="flex items-center gap-1.5 mt-2">
                  <AlertCircle size={13} className="text-[#EF4444] shrink-0" />
                  <p className="text-[#EF4444] text-xs">{budgetError}</p>
                </div>
              )}

              {/* Quick select */}
              <div className="mt-3">
                <p className="text-[#717182] text-xs mb-2">Montos rápidos:</p>
                <div className="flex gap-2">
                  {QUICK_BUDGETS.map((b) => (
                    <button
                      key={b}
                      onClick={() => { setBudget(String(b)); setBudgetError(""); setBudgetTouched(true); }}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                        budget === String(b)
                          ? "bg-[#2ECC71] border-[#2ECC71] text-white shadow-lg shadow-[#2ECC71]/25"
                          : "bg-[#F5F9F7] border-[#E0EDE6] text-[#1A2B2A] hover:border-[#2ECC71]/50"
                      }`}
                    >
                      S/.{b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget indicator */}
              {isValidBudget && (
                <div className="bg-[#E8F5EE] rounded-2xl p-3.5 flex items-center gap-3 mt-3">
                  <span className="text-xl">
                    {budgetNum <= 3 ? "💰" : budgetNum <= 6 ? "🥗" : budgetNum <= 10 ? "🍽️" : "🎉"}
                  </span>
                  <div>
                    <p className="text-[#1A5C3A] font-semibold text-sm">
                      {budgetNum <= 3 ? "Presupuesto básico" : budgetNum <= 6 ? "Presupuesto moderado" : budgetNum <= 10 ? "Presupuesto cómodo" : "Presupuesto amplio"}
                    </p>
                    <p className="text-[#2ECC71] text-xs">{matchCount} opciones disponibles</p>
                  </div>
                </div>
              )}
            </div>

            {/* Ingredients (lg: 2 cols) */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-[#1A2B2A] font-semibold text-sm">Ingredientes disponibles</label>
                <span className="bg-[#F0F7F3] text-[#2ECC71] border border-[#C6E8D5] text-[10px] font-semibold px-2.5 py-0.5 rounded-full">Opcional</span>
              </div>
              <div className="relative">
                <ShoppingBag size={16} className="absolute left-4 top-4 text-[#2ECC71]" />
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="Ej: arroz, lentejas, tomate, cebolla..."
                  rows={5}
                  className="w-full pl-10 pr-4 py-3.5 bg-[#F5F9F7] border-2 border-[#E0EDE6] rounded-2xl text-[#1A2B2A] text-sm placeholder-gray-400 outline-none focus:border-[#2ECC71] focus:ring-2 focus:ring-[#2ECC71]/20 transition-all resize-none"
                />
              </div>
              <p className="text-[#717182] text-xs mt-1.5">Ingresa lo que tienes en casa para sugerencias más precisas</p>
            </div>

            {/* Filters panel (lg: 1 col) */}
            <div className="lg:col-span-1">
              <p className="text-[#1A2B2A] font-semibold text-sm mb-2">Filtros de perfil</p>
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-4 h-fit">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm"></span>
                  <p className="text-[#1E40AF] text-xs font-semibold">Filtros activos</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="bg-[#DBEAFE] text-[#1E40AF] text-[11px] px-2.5 py-1.5 rounded-full text-center">✓ Sin alergenos</span>
                  <span className="bg-[#DBEAFE] text-[#1E40AF] text-[11px] px-2.5 py-1.5 rounded-full text-center">✓ Perfil de salud</span>
                  <span className="bg-[#DBEAFE] text-[#1E40AF] text-[11px] px-2.5 py-1.5 rounded-full text-center">✓ Nutricional</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-base transition-all ${
              isValidBudget
                ? "bg-gradient-to-br from-[#2ECC71] to-[#27AE60] text-white shadow-xl shadow-[#2ECC71]/30 active:scale-[0.97]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Search size={20} />
            Buscar platos saludables
            {isValidBudget && <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
