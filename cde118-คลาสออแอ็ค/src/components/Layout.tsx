import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { path: "/", label: "หน้าแรก" },
  { path: "/overview", label: "ภาพรวมเนื้อหา" },
  { path: "/basics", label: "พื้นฐานของ UIUX" },
  { path: "/process", label: "กระบวนการออกแบบ UIUX" },
  { path: "/principles", label: "หลักการออกแบบ UIUX" },
  { path: "/download", label: "ดาวน์โหลดเอกสารประกอบการเรียน" },
  { path: "/scores", label: "ตรวจสอบคะแนนเก็บ" },
  { path: "/instructor", label: "แนะนำผู้สอน" },
];

export default function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-zen-bg text-zen-text selection:bg-zen-matcha selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-zen-bg/80 backdrop-blur-md border-b border-zen-text/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-full bg-zen-matcha flex items-center justify-center text-white font-serif italic text-xl shadow-sm group-hover:bg-zen-wood transition-colors duration-300">
                  C
                </div>
                <span className="font-serif text-xl tracking-tight font-medium">CDE118 คลาสออแอ็ค</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full",
                      isActive ? "text-zen-wood" : "text-zen-text-light hover:text-zen-text hover:bg-zen-text/5"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 border border-zen-wood/30 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-zen-text hover:bg-zen-text/5 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-zen-bg border-b border-zen-text/10"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                      isActive
                        ? "bg-zen-wood/10 text-zen-wood"
                        : "text-zen-text-light hover:bg-zen-text/5 hover:text-zen-text"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-zen-bg-alt border-t border-zen-text/10 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-zen-text-light font-serif italic">
            "UI ที่ดีทำให้สวย UX ที่ดีทำให้ใช้ง่ายและอยากใช้ซ้ำ"
          </p>
          <p className="mt-4 text-xs text-zen-text-light/60">
            © {new Date().getFullYear()} CDE118 UX/UI Design. Bangkok University.
          </p>
        </div>
      </footer>
    </div>
  );
}
