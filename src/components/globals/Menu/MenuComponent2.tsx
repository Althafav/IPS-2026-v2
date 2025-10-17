"use client";
import Globals from "@/modules/Globals";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function MenuComponent2() {
  const [pageData, setPageData] = useState<any | null>(null);
  const [menuOpen, setmenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
 

  useEffect(() => {
    const sub = Globals.KontentClient.item("global_component_2026")
      .withParameter("depth", "4")
      .toObservable()
      .subscribe((response: any) => setPageData(response.item));
    return () => sub?.unsubscribe?.();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll(); // set initial state in case page loads scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!pageData) return null;

  const onLight = scrolled || menuOpen; // when overlay open, force light header

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        "py-4 md:py-5",
        onLight
          ? "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm"
          : "bg-transparent",
      ].join(" ")}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          {/* Menu button */}
          <button
            className="flex items-center z-[60]"
            onClick={() => setmenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className={onLight || pathname === "/awards" ? "text-black" : "text-white"} />
            ) : (
              <Menu className={onLight || pathname === "/awards" ? "text-black" : "text-white"} />
            )}
          </button>

          {/* Logos */}
          <div className="flex items-center gap-5">
            <Link href="/" className="shrink-0">
              <Image
                width={100}
                height={40}
                className="object-contain"
                src={
                  onLight || pathname === "/awards"
                    ? pageData.ipslogo.value[0]?.url
                    : pageData.ipslogowhite.value[0]?.url
                }
                alt={pageData.ipslogo.value[0]?.name}
                priority
              />
            </Link>

            <div className="hidden md:block h-8 w-px bg-gray-200" />

            <Image
              width={120}
              height={48}
              className="object-contain hidden lg:block"
              src={
                onLight || pathname === "/awards"
                  ? pageData.landdepartmentlogo.value[0]?.url
                  : pageData.landdepartmentlogowhite.value[0]?.url
              }
              alt={pageData.landdepartmentlogo.value[0]?.name}
            />
          </div>

          {/* CTA */}
          <div className="shrink-0">
            {pageData.ctabutton.value.map((item: any, index: number) => (
              <Link
                key={index}
                href={item.link?.value || "#"}
                className={[
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  onLight || pathname === "/awards"
                    ? "border-2 border-black text-black hover:bg-black hover:text-white"
                    : "border-2 border-white text-white hover:bg-white hover:text-black",
                ].join(" ")}
              >
                {item.name.value}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Full-screen Menu */}
      {menuOpen && (
        <nav className="fixed inset-0 bg-white z-40 p-6 h-screen overflow-y-auto">
          <div className="container mx-auto">
            <ul className="flex flex-col gap-1 my-10">
              {pageData.menuitems.value.map((item: any, idx: number) => {
                const hasSub = item.items?.value?.length > 0;
                const isOpen = openSubMenu === idx;
                return (
                  <li key={idx} className="border-b last:border-b-0">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.link.value || "#"}
                        className="text-gray-900 font-semibold py-3 block w-full"
                        onClick={() => {
                          setmenuOpen(false);
                          setOpenSubMenu(null);
                        }}
                      >
                        {item.name.value}
                      </Link>
                      {hasSub && (
                        <button
                          className="ml-2 p-2"
                          aria-label="Toggle submenu"
                          aria-expanded={isOpen}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenSubMenu(isOpen ? null : idx);
                          }}
                        >
                          {isOpen ? (
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <path
                                d="M6 15l6-6 6 6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                              />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <path
                                d="M6 9l6 6 6-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                              />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                    {hasSub && isOpen && (
                      <ul className="pl-4 py-1">
                        {item.items.value.map((sub: any, subIdx: number) => (
                          <li key={subIdx}>
                            <Link
                              href={sub.link.value || "#"}
                              className="block py-2 text-gray-700 hover:text-gray-900"
                              onClick={() => setmenuOpen(false)}
                            >
                              {sub.name.value}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
