
"use client"
import Globals from "@/modules/Globals";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function MenuComponent() {
  const [pageData, setPageData] = useState<any | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  useEffect(() => {
    Globals.KontentClient.item("global_component")
      .withParameter("depth", "4")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);

  if (!pageData) return null;

  return (
    <div className="menu-wrapper shadow-sm bg-white z-50 relative">
      <div className="container mx-auto">
        <div className="flex py-5 justify-between items-center">
          {/* Left Logo */}
          <Image
            width={120}
            height={120}
            className="object-contain lg:block hidden"
            src={pageData.landdepartmentlogo.value[0]?.url}
            alt={pageData.landdepartmentlogo.value[0]?.name}
          />

          <Link href="/" className="block lg:hidden">
            <Image
              width={100}
              height={100}
              className="object-contain"
              src={pageData.ipslogo.value[0]?.url}
              alt={pageData.ipslogo.value[0]?.name}
            />
          </Link>

          {/* Hamburger for mobile */}
          <button
            className="lg:hidden flex items-center z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

          {/* Desktop Menu */}
          <nav className="hidden lg:block flex-1">
            <ul className="flex gap-3 items-center justify-center">
              {pageData.menuitems.value.map((item: any, idx: number) => {
                const hasSub = item.items?.value?.length > 0;
                return (
                  <li key={idx} className="relative group">
                    <Link
                      href={item.link.value || "#"}
                      className="text-primary-blue font-semibold block hover:text-black"
                    >
                      {item.name.value}
                      {hasSub && (
                        <svg className="ml-2 inline w-3 h-3" viewBox="0 0 10 6">
                          <path
                            d="M1 1l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                          />
                        </svg>
                      )}
                    </Link>
                    {/* Desktop submenu (hover) */}
                    {hasSub && (
                      <ul className="absolute left-0 top-full min-w-[180px] shadow-xl rounded-xl bg-white py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        {item.items.value.map((sub: any, subIdx: number) => (
                          <li key={subIdx}>
                            <Link
                              href={sub.link.value || "#"}
                              className="block px-5 py-2 text-gray-700 hover:bg-slate-100 rounded-lg"
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
          </nav>

          {/* Desktop right logo */}
          <Link href="/" className="hidden lg:block">
            <Image
              width={100}
              height={100}
              className="object-contain"
              src={pageData.ipslogo.value[0]?.url}
              alt={pageData.ipslogo.value[0]?.name}
            />
          </Link>
        </div>

        {/* Mobile Accordion Menu */}
        {mobileOpen && (
          <nav className="lg:hidden block fixed inset-0 bg-white/95 z-40 p-6 h-screen overflow-y-auto">
            <ul className="flex flex-col gap-1">
              {pageData.menuitems.value.map((item: any, idx: number) => {
                const hasSub = item.items?.value?.length > 0;
                const isOpen = openSubMenu === idx;
                return (
                  <li key={idx} className="border-b last:border-b-0">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.link.value || "#"}
                        className="text-primary-blue font-semibold py-3 block w-full"
                        onClick={() => {
                          setMobileOpen(false);
                          setOpenSubMenu(null);
                        }}
                      >
                        {item.name.value}
                      </Link>
                      {hasSub && (
                        <button
                          className="ml-2 p-2"
                          aria-label="Toggle submenu"
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
                    {/* Accordion Submenu */}
                    {hasSub && isOpen && (
                      <ul className="pl-4 py-1">
                        {item.items.value.map((sub: any, subIdx: number) => (
                          <li key={subIdx}>
                            <Link
                              href={sub.link.value || "#"}
                              className="block py-2 text-gray-700 hover:text-primary-blue"
                              onClick={() => setMobileOpen(false)}
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
          </nav>
        )}
      </div>
    </div>
  );
}
