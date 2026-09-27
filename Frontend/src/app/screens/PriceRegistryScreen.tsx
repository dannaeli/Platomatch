import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { ClipboardList, ChevronLeft, Plus, CheckCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PriceEntry {
  id: string;
  product: string;
  price: string;
  market: string;
  date: string;
  trend: "up" | "down" | "same";
}

const MARKETS = ["Mercado Central", "Mercado de Surquillo", "Mercado Santa Anita", "Supermercado Wong", "Supermercado Metro", "Mercado La Parada"];

const INITIAL_ENTRIES: PriceEntry[] = [
  { id: "1", product: "Lentejas (kg)", price: "3.50", market: "Mercado Central", date: "25/09/2026", trend: "same" },
  { id: "2", product: "Quinua (kg)", price: "8.00", market: "Mercado de Surquillo", date: "25/09/2026", trend: "up" },
  { id: "3", product: "Espinaca (atado)", price: "1.20", market: "Mercado Santa Anita", date: "24/09/2026", trend: "down" },
  { id: "4", product: "Frejoles (kg)", price: "4.50", market: "Mercado Central", date: "24/09/2026", trend: "same" },
  { id: "5", product: "Tomate (kg)", price: "2.80", market: "Supermercado Metro", date: "23/09/2026", trend: "down" },
];

function TrendIcon({ trend }: { trend: "up" | "down" | "same" }) {
  if (trend === "up") return <TrendingUp size={12} className="text-[#EF4444]" />;
  if (trend === "down") return <TrendingDown size={12} className="text-[#16A34A]" />;
  return <Minus size={12} className="text-[#717182]" />;
}

export function PriceRegistryScreen() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<PriceEntry[]>(INITIAL_ENTRIES);
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [market, setMarket] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!product.trim()) errs.product = "Ingresa el nombre del producto.";
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) errs.price = "Ingresa un precio válido.";
    if (!market) errs.market = "Selecciona un mercado.";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const today = new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" });
    setEntries([{ id: String(Date.now()), product: product.trim(), price, market, date: today, trend: "same" }, ...entries]);
    setProduct(""); setPrice(""); setMarket(""); setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  }

  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen bg-[#F5F9F7]">
        {/* Top bar */}
        <div className="bg-[#1A5C3A] sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
            <button onClick={() => navigate("/admin")} className="text-[#A7D9BA] hover:text-white transition-colors text-sm flex items-center gap-1">
              <ChevronLeft size={16} /> Admin
            </button>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <ClipboardList size={18} className="text-[#2ECC71]" />
              <span className="text-white font-semibold">Registro de Precios</span>
            </div>
          </div>
        </div>

        {/* Page header */}
        <div className="bg-[#1A5C3A] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-12 relative z-10">
            <h1 className="text-white font-bold text-2xl lg:text-3xl">Registro de precios de mercado</h1>
            <p className="text-[#A7D9BA] text-sm mt-1">Mantén actualizada la base de precios para recomendaciones precisas</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Form */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#E8F5EE] overflow-hidden">
              <div className="px-5 pt-5 pb-4 border-b border-[#E8F5EE] flex items-center gap-2">
                <div className="w-8 h-8 bg-[#E8F5EE] rounded-xl flex items-center justify-center">
                  <Plus size={16} className="text-[#2ECC71]" />
                </div>
                <p className="text-[#1A2B2A] font-semibold">Registrar nuevo precio</p>
              </div>

              {submitted && (
                <div className="mx-5 mt-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-3 flex items-center gap-3">
                  <CheckCircle size={16} className="text-[#16A34A] shrink-0" />
                  <p className="text-[#166534] text-sm font-semibold">Precio registrado correctamente</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4" noValidate>
                <div>
                  <label className="text-[#1A2B2A] text-xs font-semibold mb-1.5 block">Nombre del producto <span className="text-[#EF4444]">*</span></label>
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => { setProduct(e.target.value); if (errors.product) setErrors((p) => ({ ...p, product: "" })); }}
                    placeholder="Ej: Lentejas, Quinua, Tomate..."
                    className={`w-full px-4 py-3 rounded-2xl border-2 text-sm outline-none transition-all ${errors.product ? "border-[#EF4444] bg-[#FFF5F5]" : "border-[#E0EDE6] bg-[#F5F9F7] focus:border-[#2ECC71] focus:ring-2 focus:ring-[#2ECC71]/15"}`}
                  />
                  {errors.product && <p className="text-[#EF4444] text-xs mt-1">{errors.product}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#1A2B2A] text-xs font-semibold mb-1.5 block">Precio (S/.) <span className="text-[#EF4444]">*</span></label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A5C3A] font-semibold text-xs bg-[#E8F5EE] px-1.5 py-0.5 rounded">S/.</span>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => { setPrice(e.target.value); if (errors.price) setErrors((p) => ({ ...p, price: "" })); }}
                        placeholder="0.00"
                        min="0.01"
                        step="0.10"
                        className={`w-full pl-14 pr-4 py-3 rounded-2xl border-2 text-sm font-semibold outline-none transition-all ${errors.price ? "border-[#EF4444] bg-[#FFF5F5]" : "border-[#E0EDE6] bg-[#F5F9F7] focus:border-[#2ECC71] focus:ring-2 focus:ring-[#2ECC71]/15"}`}
                      />
                    </div>
                    {errors.price && <p className="text-[#EF4444] text-xs mt-1">{errors.price}</p>}
                  </div>

                  <div>
                    <label className="text-[#1A2B2A] text-xs font-semibold mb-1.5 block">Fecha de registro</label>
                    <div className="w-full px-4 py-3 rounded-2xl border-2 border-[#E0EDE6] bg-[#F5F9F7] text-sm text-[#717182]">
                      {new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" })}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[#1A2B2A] text-xs font-semibold mb-1.5 block">Mercado <span className="text-[#EF4444]">*</span></label>
                  <select
                    value={market}
                    onChange={(e) => { setMarket(e.target.value); if (errors.market) setErrors((p) => ({ ...p, market: "" })); }}
                    className={`w-full px-4 py-3 rounded-2xl border-2 text-sm outline-none transition-all appearance-none cursor-pointer ${errors.market ? "border-[#EF4444] bg-[#FFF5F5]" : "border-[#E0EDE6] bg-[#F5F9F7] focus:border-[#2ECC71] focus:ring-2 focus:ring-[#2ECC71]/15"}`}
                  >
                    <option value="">Seleccionar mercado...</option>
                    {MARKETS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  {errors.market && <p className="text-[#EF4444] text-xs mt-1">{errors.market}</p>}
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] text-white rounded-2xl flex items-center justify-center gap-2 font-semibold shadow-lg shadow-[#2ECC71]/25 mt-2">
                  <Plus size={18} /> Registrar Precio
                </button>
              </form>
            </div>

            {/* Recent entries */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#E8F5EE] overflow-hidden">
              <div className="px-5 pt-5 pb-4 border-b border-[#E8F5EE] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#FEF9C3] rounded-xl flex items-center justify-center">
                    <ClipboardList size={15} className="text-[#92600A]" />
                  </div>
                  <p className="text-[#1A2B2A] font-semibold">Entradas recientes</p>
                </div>
                <span className="bg-[#F5F9F7] text-[#717182] text-xs px-2.5 py-1 rounded-full font-medium">{entries.length} registros</span>
              </div>

              <div className="hidden sm:block overflow-x-auto max-h-[520px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-[#F5F9F7]">
                    <tr>
                      <th className="text-left px-5 py-3 text-[#717182] text-xs font-semibold uppercase tracking-wide">Producto</th>
                      <th className="text-right px-4 py-3 text-[#717182] text-xs font-semibold uppercase tracking-wide">Precio</th>
                      <th className="text-left px-4 py-3 text-[#717182] text-xs font-semibold uppercase tracking-wide">Mercado</th>
                      <th className="text-center px-4 py-3 text-[#717182] text-xs font-semibold uppercase tracking-wide">Tendencia</th>
                      <th className="text-right px-5 py-3 text-[#717182] text-xs font-semibold uppercase tracking-wide">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, i) => (
                      <tr key={entry.id} className={`${i !== entries.length - 1 ? "border-b border-[#F5F9F7]" : ""} hover:bg-[#F9FFFE] transition-colors`}>
                        <td className="px-5 py-3.5 text-[#1A2B2A] font-medium text-xs">{entry.product}</td>
                        <td className="px-4 py-3.5 text-[#1A5C3A] font-bold text-xs text-right">S/. {parseFloat(entry.price).toFixed(2)}</td>
                        <td className="px-4 py-3.5 text-[#717182] text-xs max-w-[130px] truncate">{entry.market}</td>
                        <td className="px-4 py-3.5 text-center"><TrendIcon trend={entry.trend} /></td>
                        <td className="px-5 py-3.5 text-[#717182] text-xs text-right">{entry.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="sm:hidden divide-y divide-[#F5F9F7] max-h-80 overflow-y-auto">
                {entries.map((entry) => (
                  <div key={entry.id} className="px-4 py-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#1A2B2A] font-semibold text-xs">{entry.product}</p>
                      <p className="text-[#717182] text-[10px] truncate">{entry.market}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[#1A5C3A] font-bold text-xs">S/. {parseFloat(entry.price).toFixed(2)}</p>
                      <p className="text-[#717182] text-[10px]">{entry.date}</p>
                    </div>
                    <TrendIcon trend={entry.trend} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
