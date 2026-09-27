import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { useApp } from "../context/AppContext";
import { Edit3, LogOut, ChevronRight, Shield, Bell, HelpCircle, Star, CheckCircle, AlertTriangle, BarChart2 } from "lucide-react";

const ALL_ALLERGIES = ["Gluten", "Lácteos", "Mariscos", "Nueces", "Huevo", "Soya"];
const ALL_CONDITIONS = ["Anemia", "Diabetes", "Hipertensión", "Celiaquía"];

export function ProfileScreen() {
  const navigate = useNavigate();
  const { user, setUser } = useApp();
  const [editingHealth, setEditingHealth] = useState(false);
  const [tempAllergies, setTempAllergies] = useState<string[]>(user?.allergies || []);
  const [tempConditions, setTempConditions] = useState<string[]>(user?.conditions || []);

  const handleSaveHealth = () => {
    if (user) setUser({ ...user, allergies: tempAllergies, conditions: tempConditions });
    setEditingHealth(false);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <AppLayout showNav>
      {/* Profile header */}
      <div className="bg-gradient-to-br from-[#1A5C3A] to-[#2ECC71] relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/08 rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/05 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-[#1A5C3A] font-bold text-3xl">{avatarLetter}</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-2xl lg:text-3xl leading-tight">{user?.name || "Usuario"}</h1>
                <p className="text-white/70 text-sm mt-0.5">{user?.email || "email@ejemplo.com"}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full" />
                  <span className="text-white/70 text-xs">Perfil de salud configurado</span>
                </div>
              </div>
            </div>
            <button className="bg-white/15 hover:bg-white/25 rounded-xl px-4 py-2 flex items-center gap-2 text-white text-sm transition-colors">
              <Edit3 size={14} /> Editar perfil
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-6">
            {[
              { value: "12", label: "Platos explorados"},
              { value: user?.allergies?.length ? String(user.allergies.length) : "0", label: "Alergias config."},
              { value: user?.conditions?.length ? String(user.conditions.length) : "0", label: "Condiciones"},
              { value: "5", label: "Guardados"},
              { value: "98%", label: "Compatibilidad"},
              { value: "S/.4.5", label: "Gasto promedio"},
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-2xl p-3 text-center">
                <p className="text-white font-bold text-base leading-none">{s.value}</p>
                <p className="text-white/60 text-[9px] mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5 relative z-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left sidebar ── */}
          <div className="lg:col-span-1 space-y-4">
            {/* Quick settings */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#E8F5EE] overflow-hidden">
              {[
                { icon: <Bell size={16} className="text-[#3B82F6]" />, bg: "bg-[#EFF6FF]", label: "Notificaciones", sublabel: "Alertas y recordatorios" },
                { icon: <Star size={16} className="text-[#F59E0B]" />, bg: "bg-[#FEF9C3]", label: "Plan Premium", sublabel: "Más recetas sin restricciones" },
                { icon: <HelpCircle size={16} className="text-[#8B5CF6]" />, bg: "bg-[#EDE9FE]", label: "Ayuda y soporte", sublabel: "FAQ y contacto" },
              ].map((item, i) => (
                <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-4 ${i !== 2 ? "border-b border-[#E8F5EE]" : ""} hover:bg-[#F9FFFE] transition-all`}>
                  <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>{item.icon}</div>
                  <div className="flex-1 text-left">
                    <p className="text-[#1A2B2A] text-sm font-medium">{item.label}</p>
                    <p className="text-[#717182] text-xs">{item.sublabel}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
              ))}
            </div>

            {/* Admin access */}
            <button onClick={() => navigate("/admin")} className="w-full bg-white border border-[#E8F5EE] rounded-2xl px-4 py-4 flex items-center gap-3 shadow-sm hover:border-[#2ECC71]/50 transition-all">
              <div className="w-9 h-9 bg-[#E8F5EE] rounded-xl flex items-center justify-center shrink-0">
                <BarChart2 size={16} className="text-[#1A5C3A]" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#1A2B2A] text-sm font-medium">Panel del Administrador</p>
                <p className="text-[#717182] text-xs">Gestión de datos y feedbacks</p>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>

            {/* Logout */}
            <button onClick={handleLogout} className="w-full bg-[#FEE2E2] border border-[#FECACA] text-[#DC2626] py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold">
              <LogOut size={18} /> Cerrar sesión
            </button>

            <p className="text-center text-[#717182] text-[10px]">PlatoMatch v1.0.0 — Hecho con 💚</p>
          </div>

          {/* ── Right: Health profile ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-[#E8F5EE] overflow-hidden">
              <div className="px-5 pt-5 pb-4 border-b border-[#E8F5EE] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#E8F5EE] rounded-xl flex items-center justify-center">
                    <Shield size={14} className="text-[#2ECC71]" />
                  </div>
                  <p className="text-[#1A2B2A] font-semibold">Perfil de Salud</p>
                </div>
                {!editingHealth && (
                  <button onClick={() => setEditingHealth(true)} className="flex items-center gap-1 bg-[#E8F5EE] text-[#1A5C3A] px-3 py-1.5 rounded-xl text-xs font-semibold">
                    <Edit3 size={11} /> Actualizar
                  </button>
                )}
              </div>

              {!editingHealth ? (
                <div className="px-5 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <AlertTriangle size={12} className="text-[#EF4444]" />
                      <p className="text-[#717182] text-xs font-semibold uppercase tracking-wide">Alergias</p>
                    </div>
                    {(user?.allergies?.length || 0) > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {user?.allergies?.map((a) => (
                          <span key={a} className="bg-[#FEE2E2] text-[#DC2626] text-xs px-2.5 py-1 rounded-full font-medium">⚠️ {a}</span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[#717182] text-xs">Sin alergias registradas</p>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <CheckCircle size={12} className="text-[#2ECC71]" />
                      <p className="text-[#717182] text-xs font-semibold uppercase tracking-wide">Condiciones de salud</p>
                    </div>
                    {(user?.conditions?.length || 0) > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {user?.conditions?.map((c) => (
                          <span key={c} className="bg-[#E8F5EE] text-[#1A5C3A] text-xs px-2.5 py-1 rounded-full font-medium">
                            🩺 {c}{c === "Anemia" && <span className="ml-1 text-[10px] opacity-70">+hierro</span>}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[#717182] text-xs">Sin condiciones registradas</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="px-5 py-5 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <p className="text-[#1A2B2A] text-xs font-semibold mb-2">⚠️ Alergias</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {ALL_ALLERGIES.map((a) => (
                          <button key={a}
                            onClick={() => setTempAllergies((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a])}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs transition-all ${tempAllergies.includes(a) ? "bg-[#FDECEA] border-[#E57373] text-[#C62828]" : "bg-[#F5F9F7] border-[#E0EDE6] text-[#1A2B2A]"}`}
                          >
                            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${tempAllergies.includes(a) ? "bg-[#E57373] border-[#E57373]" : "border-gray-300"}`}>
                              {tempAllergies.includes(a) && <span className="text-white text-[8px]">✓</span>}
                            </div>
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[#1A2B2A] text-xs font-semibold mb-2">🩺 Condiciones</p>
                      <div className="space-y-1.5">
                        {ALL_CONDITIONS.map((c) => (
                          <button key={c}
                            onClick={() => setTempConditions((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c])}
                            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs transition-all ${tempConditions.includes(c) ? "bg-[#E8F5EE] border-[#2ECC71] text-[#1A5C3A]" : "bg-[#F5F9F7] border-[#E0EDE6] text-[#1A2B2A]"}`}
                          >
                            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${tempConditions.includes(c) ? "bg-[#2ECC71] border-[#2ECC71]" : "border-gray-300"}`}>
                              {tempConditions.includes(c) && <span className="text-white text-[8px]">✓</span>}
                            </div>
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button onClick={() => setEditingHealth(false)} className="flex-1 py-3 bg-[#F5F9F7] border border-[#E0EDE6] text-[#717182] rounded-xl text-sm">Cancelar</button>
                    <button onClick={handleSaveHealth} className="flex-1 py-3 bg-[#2ECC71] text-white rounded-xl text-sm font-semibold shadow-md shadow-[#2ECC71]/25">Guardar cambios</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
