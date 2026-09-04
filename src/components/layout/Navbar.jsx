"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Funcionalidades", href: "/funcionalidades" },
    { name: "Precios", href: "/precios" },
    { name: "Preguntas Frecuentes", href: "/faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-zinc-200/80 py-3.5 shadow-2xs"
          : "bg-[#faf9f8]/90 backdrop-blur-xs border-b border-zinc-200/40 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-7 w-28 sm:h-8 sm:w-32 transition-transform duration-200 group-hover:opacity-85">
              <Image
                src="/roosty2.png"
                alt="Roosty POS"
                fill
                sizes="(max-width: 640px) 112px, 128px"
                priority
                className="object-contain object-left"
              />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200/80">
              POS
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#e85d45] font-semibold"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={SITE_CONFIG.urls.saasApp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-700 hover:text-zinc-950 px-3.5 py-2 rounded-xl hover:bg-zinc-100 transition-colors"
            >
              Ver demo
            </a>

            <a
              href={SITE_CONFIG.urls.saasRegister}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#e85d45] hover:bg-[#d44c34] shadow-sm shadow-[#e85d45]/25 hover:shadow-md hover:shadow-[#e85d45]/35 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Probar gratis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={SITE_CONFIG.urls.saasRegister}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#e85d45]"
            >
              Empezar
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-zinc-200 bg-white rounded-2xl px-4 shadow-xl animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2.5 px-3 rounded-xl text-sm transition-colors ${
                      isActive
                        ? "bg-[#fff2ef] text-[#e85d45] font-bold"
                        : "text-zinc-800 hover:bg-zinc-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="mt-3 pt-3 border-t border-zinc-100 flex flex-col gap-2">
                <a
                  href={SITE_CONFIG.urls.saasApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-800 transition-colors"
                >
                  Ver demo en vivo
                </a>
                <a
                  href={SITE_CONFIG.urls.saasRegister}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-[#e85d45] hover:bg-[#d44c34] text-xs font-bold text-white shadow-xs transition-colors"
                >
                  Probar gratis
                </a>
              </div>
            </nav>
          </div>
        )}

      </div>
    </header>
  );
}
