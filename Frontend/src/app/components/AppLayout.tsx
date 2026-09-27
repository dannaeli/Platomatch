import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Home, Search, BookmarkCheck, User, Leaf, Bell } from "lucide-react";
import { useApp } from "../context/AppContext";

interface AppLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const NAV_ITEMS = [
  { path: "/home", icon: Home, label: "Inicio" },
  { path: "/search", icon: Search, label: "Buscar" },
  { path: "/saved", icon: BookmarkCheck, label: "Guardados" },
  { path: "/profile", icon: User, label: "Perfil" },
];

export function AppLayout({ children, showNav = true }: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useApp();

  if (!showNav) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F9F7]">
      {/* Desktop top navbar */}
      <header className="hidden md:flex items-center bg-[#1A5C3A] px-6 lg:px-10 h-16 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2.5 mr-10 shrink-0">
          <div className="w-8 h-8 bg-[#2ECC71] rounded-xl flex items-center justify-center">
            <Leaf size={17} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">PlatoMatch</span>
        </div>

        <nav className="flex items-center gap-1 flex-1">
          {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
            const active = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-white/15 text-white"
                    : "text-[#A7D9BA] hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button className="relative w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
            <Bell size={17} className="text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full" />
          </button>
          {user && (
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 hover:bg-white/20 transition-colors"
            >
              <div className="w-7 h-7 bg-[#2ECC71] rounded-lg flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-white text-sm hidden lg:block max-w-[140px] truncate">
                {user.name.split(" ")[0]}
              </span>
            </button>
          )}
        </div>
      </header>

      {/* Page content */}
      <main className="pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pt-2 pb-5 px-2 z-50">
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
                <span className={`text-[10px] ${active ? "text-[#2ECC71] font-semibold" : "text-gray-400"}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
