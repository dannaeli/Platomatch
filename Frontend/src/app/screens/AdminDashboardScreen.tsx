import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { BarChart2, Users, MessageSquare, ClipboardList, Loader2, ChevronRight, TrendingUp, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";

const SAMPLE_FEEDBACKS = [
  { id: "1", user: "María G.", dish: "Lentejas con Verduras", rating: 5, comment: "Excelente opción, muy nutritiva y económica.", date: "24/09/2026", status: "Aprobado" },
  { id: "2", user: "Carlos R.", dish: "Sopa de Quinua", rating: 4, comment: "Buen sabor, fácil de preparar.", date: "23/09/2026", status: "Aprobado" },
  { id: "3", user: "Ana L.", dish: "Ensalada de Espinaca", rating: 3, comment: "Podría mejorar la presentación.", date: "22/09/2026", status: "Pendiente" },
  { id: "4", user: "Pedro M.", dish: "Frejoles Guisados", rating: 5, comment: "Rico y barato, perfecto para mi presupuesto.", date: "21/09/2026", status: "Aprobado" },
  { id: "5", user: "Lucía T.", dish: "Saltado de Verduras", rating: 2, comment: "Los precios no coinciden con el mercado.", date: "20/09/2026", status: "Revisión" },
];

const STAT_CARDS = [
  { label: "Usuarios activos", value: "1,284", change: "+12%", icon: "👥", color: "bg-[#EFF6FF]", textColor: "text-[#1D4ED8]" },
  { label: "Platos en catálogo", value: "48", change: "+3", icon: "🍽️", color: "bg-[#F0FDF4]", textColor: "text-[#166534]" },
  { label: "Feedbacks recibidos", value: "327", change: "+28", icon: "💬", color: "bg-[#FEF9C3]", textColor: "text-[#92600A]" },
  { label: "Precisión de precios", value: "94%", change: "+2%", icon: "📊", color: "bg-[#EDE9FE]", textColor: "text-[#5B21B6]" },
];

function RatingStars({ rating }: { rating: number }) {
  return <span className="text-xs text-[#F59E0B]">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>;
}

export function AdminDashboardScreen() {
  const navigate = useNavigate();
  const [cleaning, setCleaning] = useState(false);
  const [cleanDone, setCleanDone] = useState(false);

  const handleClean = () => {
    setCleaning(true);
    setTimeout(() => { setCleaning(false); setCleanDone(true); }, 1800);
  };

  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen bg-[#F5F9F7]">
        {/* Top bar */}
        <div className="bg-[#1A5C3A] sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/home")} className="text-[#A7D9BA] hover:text-white transition-colors text-sm flex items-center gap-1">
                ← Salir
              </button>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <BarChart2 size={18} className="text-[#2ECC71]" />
                <span className="text-white font-semibold">Panel de Administración</span>
              </div>
            </div>
            <span className="text-[#A7D9BA] text-xs hidden sm:block">PlatoMatch Admin · v1.0</span>
          </div>
        </div>

        {/* Page header */}
        <div className="bg-gradient-to-r from-[#1A5C3A] to-[#2ECC71]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/08 rounded-full" />
            <div className="relative z-10">
              <p className="text-white/70 text-sm mb-1">Resumen del sistema</p>
              <h1 className="text-white text-2xl lg:text-3xl font-bold">Dashboard general</h1>
              <p className="text-white/70 text-sm mt-1">Actualizado: 26/09/2026 · 08:34 AM</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-10 relative z-10 space-y-6">

          {/* KPI cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STAT_CARDS.map((card) => (
              <div key={card.label} className={`${card.color} rounded-3xl p-5 flex flex-col gap-3 border border-white/50 shadow-sm`}>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{card.icon}</span>
                  <span className="text-xs font-semibold text-[#16A34A] bg-white/60 px-2 py-0.5 rounded-full">
                    <TrendingUp size={9} className="inline mr-0.5" />{card.change}
                  </span>
                </div>
                <div>
                  <p className={`font-bold text-2xl leading-none ${card.textColor}`}>{card.value}</p>
                  <p className="text-gray-500 text-xs mt-1">{card.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Feedback table */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-[#E8F5EE] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E8F5EE] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#E8F5EE] rounded-xl flex items-center justify-center">
                    <MessageSquare size={15} className="text-[#2ECC71]" />
                  </div>
                  <p className="text-[#1A2B2A] font-semibold">Feedbacks recientes</p>
                </div>
                <span className="bg-[#E8F5EE] text-[#1A5C3A] text-xs px-2.5 py-1 rounded-full font-semibold">{SAMPLE_FEEDBACKS.length} entradas</span>
              </div>

              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F5F9F7]">
                      <th className="text-left px-5 py-3 text-[#717182] text-xs font-semibold uppercase tracking-wide">Usuario</th>
                      <th className="text-left px-4 py-3 text-[#717182] text-xs font-semibold uppercase tracking-wide">Plato</th>
                      <th className="text-center px-4 py-3 text-[#717182] text-xs font-semibold uppercase tracking-wide">Rating</th>
                      <th className="text-left px-4 py-3 text-[#717182] text-xs font-semibold uppercase tracking-wide">Estado</th>
                      <th className="text-right px-5 py-3 text-[#717182] text-xs font-semibold uppercase tracking-wide">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE_FEEDBACKS.map((fb, i) => (
                      <tr key={fb.id} className={`${i !== SAMPLE_FEEDBACKS.length - 1 ? "border-b border-[#F5F9F7]" : ""} hover:bg-[#F9FFFE] transition-colors`}>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-[#E8F5EE] rounded-full flex items-center justify-center">
                              <span className="text-[#1A5C3A] text-xs font-bold">{fb.user.charAt(0)}</span>
                            </div>
                            <span className="text-[#1A2B2A] font-medium text-xs">{fb.user}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-[#717182] text-xs max-w-[140px] truncate">{fb.dish}</td>
                        <td className="px-4 py-3.5 text-center"><RatingStars rating={fb.rating} /></td>
                        <td className="px-4 py-3.5">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            fb.status === "Aprobado" ? "bg-[#D1FAE5] text-[#065F46]" :
                            fb.status === "Pendiente" ? "bg-[#FEF9C3] text-[#92600A]" :
                            "bg-[#FEE2E2] text-[#991B1B]"
                          }`}>{fb.status}</span>
                        </td>
                        <td className="px-5 py-3.5 text-[#717182] text-xs text-right">{fb.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden divide-y divide-[#F5F9F7]">
                {SAMPLE_FEEDBACKS.map((fb) => (
                  <div key={fb.id} className="px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#1A2B2A] font-medium text-xs">{fb.user}</span>
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                        fb.status === "Aprobado" ? "bg-[#D1FAE5] text-[#065F46]" :
                        fb.status === "Pendiente" ? "bg-[#FEF9C3] text-[#92600A]" :
                        "bg-[#FEE2E2] text-[#991B1B]"
                      }`}>{fb.status}</span>
                    </div>
                    <p className="text-[#717182] text-xs">{fb.dish}</p>
                    <div className="flex items-center justify-between mt-1">
                      <RatingStars rating={fb.rating} />
                      <span className="text-[#717182] text-[10px]">{fb.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl shadow-sm border border-[#E8F5EE] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-[#EDE9FE] rounded-xl flex items-center justify-center">
                    <RefreshCw size={15} className="text-[#7C3AED]" />
                  </div>
                  <p className="text-[#1A2B2A] font-semibold text-sm">Mantenimiento</p>
                </div>

                {cleanDone ? (
                  <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4 flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#16A34A] shrink-0" />
                    <div>
                      <p className="text-[#166534] text-sm font-semibold">Limpieza completada</p>
                      <p className="text-[#4ADE80] text-xs">47 registros duplicados eliminados</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-[#FFF8EC] border border-[#FDDFA0] rounded-2xl p-3 mb-3 flex items-start gap-2">
                      <AlertTriangle size={13} className="text-[#F59E0B] mt-0.5 shrink-0" />
                      <p className="text-[#78350F] text-xs">Se detectaron 47 registros duplicados en la base de datos.</p>
                    </div>
                    <button
                      onClick={handleClean}
                      disabled={cleaning}
                      className="w-full py-3 bg-[#7C3AED] text-white rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm disabled:opacity-70 shadow-md shadow-[#7C3AED]/20"
                    >
                      {cleaning ? (<><Loader2 size={16} className="animate-spin" /> Limpiando...</>) : (<><RefreshCw size={15} /> Ejecutar Limpieza</>)}
                    </button>
                  </>
                )}
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-[#E8F5EE] overflow-hidden">
                <p className="text-[#717182] text-xs font-semibold px-4 pt-4 pb-2 uppercase tracking-wider">Accesos rápidos</p>
                {[
                  { icon: <ClipboardList size={14} className="text-[#2ECC71]" />, bg: "bg-[#E8F5EE]", label: "Registro de Precios", sub: "Mercados y actualizaciones", to: "/price-registry" },
                  { icon: <Users size={14} className="text-[#3B82F6]" />, bg: "bg-[#EFF6FF]", label: "Gestión de Usuarios", sub: "Ver perfiles y datos", to: "/home" },
                  { icon: <MessageSquare size={14} className="text-[#F59E0B]" />, bg: "bg-[#FEF9C3]", label: "Moderar Feedbacks", sub: "Aprobar y revisar", to: "/home" },
                ].map((item) => (
                  <button key={item.label} onClick={() => navigate(item.to)} className="w-full flex items-center gap-3 px-4 py-3.5 border-t border-[#E8F5EE] hover:bg-[#F9FFFE] transition-colors">
                    <div className={`w-8 h-8 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>{item.icon}</div>
                    <div className="flex-1 text-left">
                      <p className="text-[#1A2B2A] text-xs font-semibold">{item.label}</p>
                      <p className="text-[#717182] text-[10px]">{item.sub}</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
