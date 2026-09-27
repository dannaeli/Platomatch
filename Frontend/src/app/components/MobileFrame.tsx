import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Home, Search, BookmarkCheck, User } from "lucide-react";

interface MobileFrameProps {
  children: React.ReactNode;
  showNav?: boolean;
  title?: string;
  showBack?: boolean;
}

const NAV_ITEMS = [
  { path: "/home", icon: Home, label: "Inicio" },
  { path: "/search", icon: Search, label: "Buscar" },
  { path: "/saved", icon: BookmarkCheck, label: "Guardados" },
  { path: "/profile", icon: User, label: "Perfil" },
];

export function MobileFrame({ children, showNav = true, showBack = false }: MobileFrameProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#E8F5EE] flex items-start justify-center py-6 px-4">
      <div
        className="relative bg-white w-full max-w-[390px] min-h-[844px] rounded-[44px] shadow-2xl overflow-hidden flex flex-col"
        style={{
          boxShadow: "0 32px 80px rgba(0,0,0,0.22), 0 0 0 2px #d1d5db",
        }}
      >
        {/* Status bar */}
        <div className="bg-white flex items-center justify-between px-6 pt-4 pb-1 shrink-0">
          <span className="text-[13px] font-semibold text-[#1A2B2A]">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-[3px] items-end h-3">
              <div className="w-[3px] h-1.5 bg-[#1A2B2A] rounded-sm" />
              <div className="w-[3px] h-2 bg-[#1A2B2A] rounded-sm" />
              <div className="w-[3px] h-2.5 bg-[#1A2B2A] rounded-sm" />
              <div className="w-[3px] h-3 bg-[#1A2B2A] rounded-sm" />
            </div>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 2.5C9.93 2.5 11.68 3.27 12.97 4.53L14.38 3.12C12.73 1.49 10.48 0.5 8 0.5C5.52 0.5 3.27 1.49 1.62 3.12L3.03 4.53C4.32 3.27 6.07 2.5 8 2.5Z" fill="#1A2B2A"/>
              <path d="M8 5.5C9.1 5.5 10.1 5.94 10.83 6.66L12.24 5.25C11.14 4.17 9.65 3.5 8 3.5C6.35 3.5 4.86 4.17 3.76 5.25L5.17 6.66C5.9 5.94 6.9 5.5 8 5.5Z" fill="#1A2B2A"/>
              <circle cx="8" cy="9.5" r="1.5" fill="#1A2B2A"/>
            </svg>
            <div className="flex items-center gap-0.5">
              <div className="w-6 h-3 border border-[#1A2B2A] rounded-sm relative">
                <div className="absolute inset-[2px] right-[3px] bg-[#1A2B2A] rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {children}
        </div>

        {/* Bottom Navigation */}
        {showNav && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-6 pt-2 px-2">
            <div className="flex items-center justify-around">
              {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
                const active = location.pathname === path;
                return (
                  <button
                    key={path}
                    onClick={() => navigate(path)}
                    className="flex flex-col items-center gap-0.5 px-4 py-1"
                  >
                    <div className={`p-1.5 rounded-xl transition-all ${active ? "bg-[#E8F5EE]" : ""}`}>
                      <Icon
                        size={22}
                        className={active ? "text-[#2ECC71]" : "text-gray-400"}
                        strokeWidth={active ? 2.5 : 1.8}
                      />
                    </div>
                    <span
                      className={`text-[10px] ${active ? "text-[#2ECC71] font-semibold" : "text-gray-400"}`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
