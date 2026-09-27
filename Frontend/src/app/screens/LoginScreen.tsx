import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { useApp } from "../context/AppContext";
import { Eye, EyeOff, Leaf, AlertCircle, Loader2, ShieldCheck, TrendingUp, Heart } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MOCK_USER = {
  email: "maria@ejemplo.com",
  password: "Platom@tch1",
  name: "María García",
  allergies: ["Gluten"],
  conditions: ["Anemia"],
};

const FEATURES = [
  { icon: <ShieldCheck size={18} className="text-[#2ECC71]" />, text: "Filtros por alergias y condiciones médicas" },
  { icon: <TrendingUp size={18} className="text-[#2ECC71]" />, text: "Recomendaciones dentro de tu presupuesto" },
  { icon: <Heart size={18} className="text-[#2ECC71]" />, text: "Perfil nutricional personalizado" },
];

export function LoginScreen() {
  const navigate = useNavigate();
  const { setUser } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  function validateEmail(v: string) {
    if (!v.trim()) return "Este campo es obligatorio.";
    if (!EMAIL_RE.test(v)) return "Ingrese un correo electrónico válido.";
    return "";
  }
  function validatePassword(v: string) {
    if (!v) return "Este campo es obligatorio.";
    return "";
  }

  function handleEmailChange(v: string) {
    setEmail(v);
    setAuthError("");
    if (emailTouched) setEmailError(validateEmail(v));
  }
  function handlePasswordChange(v: string) {
    setPassword(v);
    setAuthError("");
    if (passwordTouched) setPasswordError(validatePassword(v));
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    setEmailTouched(true);
    setPasswordTouched(true);
    setEmailError(eErr);
    setPasswordError(pErr);
    if (eErr || pErr) return;

    setLoading(true);
    setAuthError("");
    await new Promise((r) => setTimeout(r, 1600));

    const isValid =
      email.trim().toLowerCase() === MOCK_USER.email.toLowerCase() &&
      password === MOCK_USER.password;

    if (isValid) {
      setUser({ name: MOCK_USER.name, email: MOCK_USER.email, allergies: MOCK_USER.allergies, conditions: MOCK_USER.conditions });
      navigate("/home");
    } else {
      setLoading(false);
      setAuthError("Correo o contraseña incorrectos. Verifica tus datos e intenta de nuevo.");
    }
  }

  const inputBase = "w-full px-4 py-3.5 bg-[#F5F9F7] border-2 rounded-2xl text-[#1A2B2A] placeholder-gray-400 outline-none transition-all text-sm";
  const inputOk = "border-[#E0EDE6] focus:border-[#2ECC71] focus:ring-2 focus:ring-[#2ECC71]/20";
  const inputErr = "border-[#EF4444] bg-[#FFF5F5] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/15";

  const formPanel = (
    <div className="w-full max-w-md mx-auto">
      {/* Mobile-only logo */}
      <div className="md:hidden flex items-center gap-2.5 mb-8">
        <div className="w-10 h-10 bg-[#2ECC71] rounded-2xl flex items-center justify-center shadow-lg shadow-[#2ECC71]/40">
          <Leaf size={22} className="text-white" />
        </div>
        <div>
          <span className="text-[#1A2B2A] text-xl font-bold tracking-tight">PlatoMatch</span>
          <p className="text-[#717182] text-[11px] leading-none mt-0.5">Come bien, gasta menos</p>
        </div>
      </div>

      <h2 className="text-[#1A2B2A] text-2xl font-bold mb-1">Bienvenido de vuelta </h2>
      <p className="text-[#717182] text-sm mb-8">Inicia sesión para acceder a tus recomendaciones</p>

      <form onSubmit={handleLogin} noValidate className="space-y-4">
        {authError && (
          <div className="flex items-start gap-2.5 bg-[#FFF5F5] border border-[#FECACA] rounded-2xl px-4 py-3">
            <AlertCircle size={16} className="text-[#EF4444] shrink-0 mt-0.5" />
            <p className="text-[#DC2626] text-xs leading-snug">{authError}</p>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-[#1A2B2A] mb-1.5 uppercase tracking-wide">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={() => { setEmailTouched(true); setEmailError(validateEmail(email)); }}
            placeholder="ejemplo@correo.com"
            autoComplete="email"
            disabled={loading}
            className={`${inputBase} ${emailError && emailTouched ? inputErr : inputOk} ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          />
          {emailError && emailTouched && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <AlertCircle size={12} className="text-[#EF4444] shrink-0" />
              <p className="text-[#EF4444] text-xs">{emailError}</p>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-[#1A2B2A] uppercase tracking-wide">Contraseña</label>
            <button type="button" className="text-[#2ECC71] text-xs font-medium hover:underline">¿Olvidaste tu contraseña?</button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onBlur={() => { setPasswordTouched(true); setPasswordError(validatePassword(password)); }}
              placeholder="Tu contraseña"
              autoComplete="current-password"
              disabled={loading}
              className={`${inputBase} pr-12 ${passwordError && passwordTouched ? inputErr : inputOk} ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              disabled={loading}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {passwordError && passwordTouched && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <AlertCircle size={12} className="text-[#EF4444] shrink-0" />
              <p className="text-[#EF4444] text-xs">{passwordError}</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2.5 font-semibold text-base transition-all mt-2 ${
            loading
              ? "bg-[#27AE60] text-white cursor-not-allowed opacity-90"
              : "bg-gradient-to-br from-[#2ECC71] to-[#27AE60] text-white shadow-lg shadow-[#2ECC71]/30 active:scale-[0.97]"
          }`}
        >
          {loading ? (<><Loader2 size={20} className="animate-spin" /><span>Verificando...</span></>) : "Iniciar Sesión"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-[#E8F5EE]" />
        <span className="text-[#9CA3AF] text-xs">o continúa con</span>
        <div className="flex-1 h-px bg-[#E8F5EE]" />
      </div>

      <button
        type="button"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          await new Promise((r) => setTimeout(r, 900));
          setUser({ name: "Invitado", email: "invitado@platmatch.app", allergies: [], conditions: [] });
          navigate("/home");
        }}
        className="w-full py-3.5 rounded-2xl border-2 border-[#E8F5EE] bg-[#F5F9F7] text-[#1A2B2A] flex items-center justify-center gap-2 text-sm font-medium transition-all active:scale-[0.97] hover:border-[#2ECC71]/50"
      >
        {loading ? <Loader2 size={16} className="animate-spin text-[#2ECC71]" /> : <span className="text-base"></span>}
        Entrar como invitado
      </button>

      <p className="text-center text-[#717182] text-sm mt-6">
        ¿No tienes cuenta?{" "}
        <button onClick={() => navigate("/register")} className="text-[#2ECC71] font-semibold hover:underline">
          Regístrate aquí
        </button>
      </p>

      <div className="mt-4 bg-[#FFF8EC] border border-[#FDDFA0] rounded-2xl px-4 py-3">
        <p className="text-[#92600A] text-[11px] text-center leading-relaxed">
          <span className="font-semibold">Demo:</span> usa{" "}
          <span className="font-mono bg-[#FEF3C7] px-1 rounded">maria@ejemplo.com</span> /{" "}
          <span className="font-mono bg-[#FEF3C7] px-1 rounded">Platom@tch1</span>
        </p>
      </div>
    </div>
  );

  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* ── Left brand panel — desktop only ── */}
        <div className="hidden md:flex md:w-2/5 lg:w-1/2 bg-[#1A5C3A] flex-col justify-between px-10 lg:px-16 py-12 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#2ECC71]/10 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#2ECC71]/08 rounded-full" />
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-40 h-80 bg-[#2ECC71]/05 rounded-l-full" />

          {/* Logo */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-11 h-11 bg-[#2ECC71] rounded-2xl flex items-center justify-center shadow-lg shadow-[#2ECC71]/40">
              <Leaf size={24} className="text-white" />
            </div>
            <div>
              <span className="text-white text-xl font-bold tracking-tight">PlatoMatch</span>
              <p className="text-[#A7D9BA] text-xs leading-none mt-0.5">Come bien, gasta menos</p>
            </div>
          </div>

          {/* Hero text */}
          <div className="relative z-10 my-auto py-10">
            <h1 className="text-white text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Come bien,<br />
              <span className="text-[#2ECC71]">gasta menos</span>
            </h1>
            <p className="text-[#A7D9BA] text-base leading-relaxed mb-10 max-w-sm">
              Encuentra opciones de comida saludable y económica adaptadas a tu perfil de salud y presupuesto diario.
            </p>
            <div className="space-y-3.5">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#2ECC71]/20 rounded-xl flex items-center justify-center shrink-0">
                    {f.icon}
                  </div>
                  <span className="text-white/80 text-sm">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <div className="flex gap-6 relative z-10">
            {[{ n: "5,000+", l: "Usuarios" }, { n: "48", l: "Platos" }, { n: "S/. 3", l: "Desde" }].map((s) => (
              <div key={s.l}>
                <p className="text-white font-bold text-xl">{s.n}</p>
                <p className="text-[#A7D9BA] text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="flex-1 bg-white flex items-center justify-center px-6 sm:px-10 md:px-12 lg:px-16 py-10">
          {formPanel}
        </div>
      </div>
    </AppLayout>
  );
}
