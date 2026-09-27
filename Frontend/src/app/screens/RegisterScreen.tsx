import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { useApp } from "../context/AppContext";
import { ChevronRight, Leaf, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";

const ALLERGIES = ["Gluten", "Lácteos", "Mariscos", "Nueces", "Huevo", "Soya"];
const CONDITIONS = ["Anemia", "Diabetes", "Hipertensión", "Celiaquía"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

interface FieldErrors { name?: string; email?: string; password?: string; }

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ caracteres", ok: password.length >= 8 },
    { label: "Mayúscula", ok: /[A-Z]/.test(password) },
    { label: "Minúscula", ok: /[a-z]/.test(password) },
    { label: "Número", ok: /\d/.test(password) },
    { label: "Carácter especial", ok: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) },
  ];
  if (!password) return null;
  const passed = checks.filter((c) => c.ok).length;
  const pct = (passed / checks.length) * 100;
  const color = pct <= 40 ? "#EF4444" : pct <= 80 ? "#F59E0B" : "#2ECC71";
  const label = pct <= 40 ? "Débil" : pct <= 80 ? "Moderada" : "Fuerte";
  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
        </div>
        <span className="ml-2 text-[11px] font-semibold" style={{ color }}>{label}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {checks.map((c) => (
          <span key={c.label} className={`text-[10px] px-2 py-0.5 rounded-full ${c.ok ? "bg-[#E8F5EE] text-[#1A5C3A]" : "bg-gray-100 text-gray-400"}`}>
            {c.ok ? "✓" : "·"} {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function RegisterScreen() {
  const navigate = useNavigate();
  const { setUser } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const [allergies, setAllergies] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [noAllergies, setNoAllergies] = useState(false);
  const [healthSubmitAttempted, setHealthSubmitAttempted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  function validateStep1(): FieldErrors {
    const e: FieldErrors = {};
    if (!name.trim()) e.name = "Este campo es obligatorio.";
    if (!email.trim()) e.email = "Este campo es obligatorio.";
    else if (!EMAIL_RE.test(email)) e.email = "Ingrese un correo electrónico válido (ej. usuario@correo.com).";
    if (!password) e.password = "Este campo es obligatorio.";
    else if (!PASSWORD_RE.test(password)) e.password = "La contraseña debe tener al menos 8 caracteres, mayúscula, minúscula, número y carácter especial.";
    return e;
  }

  function handleBlur(field: keyof FieldErrors) {
    setTouchedFields((prev) => new Set([...prev, field]));
    const e = validateStep1();
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  }

  const healthConfirmed = allergies.length > 0 || conditions.length > 0 || noAllergies;

  const toggleAllergy = (a: string) => {
    setAllergies((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
    if (noAllergies) setNoAllergies(false);
  };
  const toggleCondition = (c: string) =>
    setConditions((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const handleNext = () => {
    if (step === 1) {
      const e = validateStep1();
      if (Object.keys(e).length > 0) {
        setErrors(e);
        setTouchedFields(new Set(["name", "email", "password"]));
        return;
      }
      setStep(2);
    } else {
      setHealthSubmitAttempted(true);
      if (!healthConfirmed) return;
      setUser({ name, email, allergies, conditions });
      navigate("/home");
    }
  };

  function inputCls(field: keyof FieldErrors, extra = "") {
    const hasError = errors[field] && touchedFields.has(field);
    return `w-full px-4 py-3.5 bg-[#F5F9F7] border-2 rounded-2xl text-[#1A2B2A] placeholder-gray-400 outline-none transition-all ${extra} ${
      hasError
        ? "border-[#EF4444] bg-[#FFF5F5] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/15"
        : "border-[#E0EDE6] focus:border-[#2ECC71] focus:ring-2 focus:ring-[#2ECC71]/20"
    }`;
  }

  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen bg-[#F5F9F7] flex flex-col">
        {/* Header */}
        <div className="bg-[#1A5C3A] px-4 sm:px-6 pt-6 pb-10 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#2ECC71]/20 rounded-full" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#2ECC71]/10 rounded-full" />
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-[#2ECC71] rounded-xl flex items-center justify-center">
                <Leaf size={20} className="text-white" />
              </div>
              <span className="text-white text-lg font-semibold tracking-tight">PlatoMatch</span>
            </div>
            <h1 className="text-white text-2xl font-semibold mb-1">
              {step === 1 ? "Crea tu cuenta" : "Tu perfil de salud"}
            </h1>
            <p className="text-[#A7D9BA] text-sm">
              {step === 1 ? "Empieza a comer mejor con tu presupuesto" : "Personaliza tus recomendaciones"}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className={`h-1 rounded-full flex-1 ${step >= 1 ? "bg-[#2ECC71]" : "bg-white/30"}`} />
              <div className={`h-1 rounded-full flex-1 ${step >= 2 ? "bg-[#2ECC71]" : "bg-white/30"}`} />
            </div>
            <p className="text-[#A7D9BA] text-xs mt-1.5">Paso {step} de 2</p>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 px-4 sm:px-6 -mt-5 relative z-10 pb-8">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-[#F0F7F3] px-6 py-6">
            {step === 1 ? (
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm text-[#1A2B2A] mb-1.5">Nombre completo <span className="text-[#EF4444]">*</span></label>
                  <input type="text" value={name}
                    onChange={(e) => { setName(e.target.value); if (touchedFields.has("name")) setErrors((p) => ({ ...p, name: e.target.value.trim() ? undefined : "Este campo es obligatorio." })); }}
                    onBlur={() => handleBlur("name")}
                    placeholder="Ej. María García"
                    className={inputCls("name")}
                  />
                  {errors.name && touchedFields.has("name") && (
                    <div className="flex items-center gap-1.5 mt-1.5"><AlertCircle size={13} className="text-[#EF4444] shrink-0" /><p className="text-[#EF4444] text-xs">{errors.name}</p></div>
                  )}
                </div>

                {/* Email + Password in 2 cols on md */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#1A2B2A] mb-1.5">Correo electrónico <span className="text-[#EF4444]">*</span></label>
                    <input type="email" value={email}
                      onChange={(e) => { setEmail(e.target.value); if (touchedFields.has("email")) { const v = e.target.value; setErrors((p) => ({ ...p, email: !v.trim() ? "Este campo es obligatorio." : !EMAIL_RE.test(v) ? "Ingrese un correo electrónico válido." : undefined })); } }}
                      onBlur={() => handleBlur("email")}
                      placeholder="ejemplo@correo.com"
                      className={inputCls("email")}
                    />
                    {errors.email && touchedFields.has("email") && (
                      <div className="flex items-center gap-1.5 mt-1.5"><AlertCircle size={13} className="text-[#EF4444] shrink-0" /><p className="text-[#EF4444] text-xs">{errors.email}</p></div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-[#1A2B2A] mb-1.5">Contraseña <span className="text-[#EF4444]">*</span></label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} value={password}
                        onChange={(e) => { setPassword(e.target.value); if (touchedFields.has("password")) { const v = e.target.value; setErrors((p) => ({ ...p, password: !v ? "Este campo es obligatorio." : !PASSWORD_RE.test(v) ? "Contraseña débil." : undefined })); } }}
                        onBlur={() => handleBlur("password")}
                        placeholder="Mínimo 8 caracteres"
                        className={inputCls("password", "pr-12")}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && touchedFields.has("password") && (
                      <div className="flex items-start gap-1.5 mt-1.5"><AlertCircle size={13} className="text-[#EF4444] shrink-0 mt-0.5" /><p className="text-[#EF4444] text-xs leading-snug">{errors.password}</p></div>
                    )}
                    <PasswordStrength password={password} />
                  </div>
                </div>

                <div className="bg-[#FFF8EC] border border-[#FDDFA0] rounded-2xl p-4">
                  <p className="text-[#92600A] text-xs leading-relaxed">Tu información de salud es confidencial y solo se usa para personalizar tus recomendaciones.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 2-col health profile on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Allergies */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 bg-[#FEE2E2] rounded-full flex items-center justify-center"><span className="text-[10px]"></span></div>
                      <h3 className="text-[#1A2B2A] font-semibold text-sm">Alergias alimentarias</h3>
                    </div>
                    <p className="text-[#717182] text-xs mb-3">Selecciona las que apliquen a ti</p>
                    <div className="grid grid-cols-2 gap-2">
                      {ALLERGIES.map((a) => (
                        <button key={a} onClick={() => toggleAllergy(a)}
                          className={`flex items-center gap-2.5 px-3.5 py-3 rounded-2xl border transition-all text-sm ${allergies.includes(a) ? "bg-[#FDECEA] border-[#E57373] text-[#C62828]" : "bg-[#F5F9F7] border-[#E0EDE6] text-[#1A2B2A]"}`}
                        >
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${allergies.includes(a) ? "bg-[#E57373] border-[#E57373]" : "border-gray-300"}`}>
                            {allergies.includes(a) && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                          </div>
                          {a}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => { setNoAllergies(!noAllergies); if (!noAllergies) setAllergies([]); }}
                      className={`w-full mt-3 flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${noAllergies ? "bg-[#E8F5EE] border-[#2ECC71] text-[#1A5C3A]" : "bg-[#F5F9F7] border-[#E0EDE6] text-[#717182]"}`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${noAllergies ? "bg-[#2ECC71] border-[#2ECC71]" : "border-gray-300"}`}>
                        {noAllergies && <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                      <span className="text-sm font-medium">No presento alergias alimentarias</span>
                      {noAllergies && <CheckCircle2 size={15} className="ml-auto text-[#2ECC71]" />}
                    </button>
                  </div>

                  {/* Conditions */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 bg-[#DBEAFE] rounded-full flex items-center justify-center"><span className="text-[10px]">🩺</span></div>
                      <h3 className="text-[#1A2B2A] font-semibold text-sm">Condiciones de salud</h3>
                    </div>
                    <p className="text-[#717182] text-xs mb-3">Para adaptar mejor tus recomendaciones</p>
                    <div className="space-y-2">
                      {CONDITIONS.map((c) => (
                        <button key={c} onClick={() => toggleCondition(c)}
                          className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all ${conditions.includes(c) ? "bg-[#E8F5EE] border-[#2ECC71] text-[#1A5C3A]" : "bg-[#F5F9F7] border-[#E0EDE6] text-[#1A2B2A]"}`}
                        >
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${conditions.includes(c) ? "bg-[#2ECC71] border-[#2ECC71]" : "border-gray-300"}`}>
                            {conditions.includes(c) && <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                          </div>
                          <span className="text-sm">{c}</span>
                          {c === "Anemia" && <span className="ml-auto bg-[#FEF9C3] text-[#854D0E] text-[10px] px-2 py-0.5 rounded-full">+Hierro</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {healthSubmitAttempted && !healthConfirmed && (
                  <div className="flex items-start gap-2 bg-[#FFF5F5] border border-[#FECACA] rounded-2xl px-4 py-3">
                    <AlertCircle size={15} className="text-[#EF4444] shrink-0 mt-0.5" />
                    <p className="text-[#DC2626] text-xs leading-snug">Selecciona al menos una opción, condición de salud, o confirma que no presentas alergias para continuar.</p>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleNext}
              disabled={step === 2 && healthSubmitAttempted && !healthConfirmed}
              className={`w-full mt-6 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                step === 2 && healthSubmitAttempted && !healthConfirmed
                  ? "bg-gray-200 text-gray-400 shadow-none cursor-not-allowed"
                  : "bg-[#2ECC71] text-white shadow-[#2ECC71]/30"
              }`}
            >
              <span className="font-semibold">{step === 1 ? "Continuar" : "Crear mi cuenta"}</span>
              <ChevronRight size={20} />
            </button>

            {step === 2 && (
              <button onClick={() => { setUser({ name, email, allergies: [], conditions: [] }); navigate("/home"); }} className="w-full mt-2 py-3 text-[#717182] text-sm">
                Omitir por ahora
              </button>
            )}

            <p className="text-center text-[#717182] text-sm mt-4 pb-1">
              ¿Ya tienes cuenta?{" "}
              <button onClick={() => navigate("/login")} className="text-[#2ECC71] font-semibold hover:underline">
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
