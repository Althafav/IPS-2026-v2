"use client";
import Globals from "@/modules/Globals";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
// --------- Recursive MenuList ----------
interface MenuNode {
  name: { value: string };
  link: { value: string };
  items?: { value: MenuNode[] };
}

function MenuList({
  nodes,
  levelPath = "",
  openMap,
  toggleNode,
  closeAll,
}: {
  nodes: MenuNode[];
  levelPath?: string;
  openMap: Record<string, boolean>;
  toggleNode: (id: string) => void;
  closeAll: () => void;
}) {
  return (
    <ul
      className={
        levelPath === ""
          ? "flex flex-col gap-1 my-10"
          : "pl-4 py-1 border-l border-gray-200"
      }
    >
      {nodes.map((item, idx) => {
        const nodeId = levelPath === "" ? `${idx}` : `${levelPath}-${idx}`;
        const hasChildren = !!(item.items?.value && item.items.value.length > 0);
        const isOpen = !!openMap[nodeId];

        return (
          <li
            key={nodeId}
            className={levelPath === "" ? "border-b last:border-b-0" : "py-1"}
          >
            <div className="flex items-start justify-between">
              {/* Label acts as a button if it has children; as a link if it doesn't */}
              {hasChildren ? (
                <button
                  type="button"
                  className="text-gray-900 font-semibold py-3 block w-full text-left"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleNode(nodeId);
                  }}
                >
                  {item.name?.value || "Untitled"}
                </button>
              ) : (
                <Link
                  href={item.link?.value || "#"}
                  className="text-gray-900 font-semibold py-3 block w-full text-left"
                  onClick={() => {
                    // for leaf nodes, close the whole menu
                    closeAll();
                  }}
                >
                  {item.name?.value || "Untitled"}
                </Link>
              )}

              {/* caret button mirrors the same toggle for parents */}
              {hasChildren && (
                <button
                  className="ml-2 p-2 shrink-0"
                  aria-label={isOpen ? "Collapse submenu" : "Expand submenu"}
                  aria-expanded={isOpen}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleNode(nodeId);
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

            {/* children */}
            {hasChildren && isOpen && (
              <MenuList
                nodes={item.items!.value}
                levelPath={nodeId}
                openMap={openMap}
                toggleNode={toggleNode}
                closeAll={closeAll}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}


// --------- Main Header Component ----------
export default function MenuComponent2() {
  const [pageData, setPageData] = useState<any | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // fetch global_component_2026 from Kontent
  useEffect(() => {
    const sub = Globals.KontentClient.item("global_component_2026")
      .withParameter("depth", "10") // make sure we fetch deep enough for nested menus
      .toObservable()
      .subscribe((response: any) => setPageData(response.item));
    return () => sub?.unsubscribe?.();
  }, []);

  // header bg change on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // toggle specific branch in the tree
  const toggleNode = useCallback((id: string) => {
    setOpenMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  // fully close menu and collapse all submenus
  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setOpenMap({});
  }, []);

  if (!pageData) return null;

  const onLight = scrolled || menuOpen;

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
          {/* Burger / Close */}
          <button
            className="flex items-center"
            onClick={() => {
              if (menuOpen) {
                closeAll();
              } else {
                setMenuOpen(true);
              }
            }}
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X
                className={
                  onLight || pathname === "/awards"
                    ? "text-black"
                    : "text-white"
                }
              />
            ) : (
              <Menu
                className={
                  onLight || pathname === "/awards"
                    ? "text-black"
                    : "text-white"
                }
              />
            )}
          </button>

          {/* Logos */}
          <div className="flex items-center gap-5">
            <Link href="/" className="shrink-0">
              <Image
                width={120}
                height={40}
                className="object-contain"
                src={
                  onLight || pathname === "/awards"
                    ? pageData.ipslogo.value[0]?.url
                    : pageData.ipslogowhite.value[0]?.url
                }
                alt={pageData.ipslogo.value[0]?.name || "Logo"}
                priority
              />
            </Link>

            <div className="hidden md:block h-8 w-px bg-gray-200" />

            <Image
              width={140}
              height={48}
              className="object-contain hidden lg:block"
              src={
                onLight || pathname === "/awards"
                  ? pageData.landdepartmentlogo.value[0]?.url
                  : pageData.landdepartmentlogowhite.value[0]?.url
              }
              alt={pageData.landdepartmentlogo.value[0]?.name || "Partner"}
            />
          </div>

          {/* CTA buttons */}
          <div className="shrink-0 flex flex-wrap gap-3">
            {pageData.ctabutton.value.map((item: any, index: number) => (
              <Link
                key={index}
                href={item.link?.value || "#"}
                className={[
                  "px-4 py-2 rounded-full font-medium transition-colors text-lg",
                  onLight || pathname === "/awards"
                    ? "border-2 border-black text-black hover:bg-black hover:text-white"
                    : "border-2 border-white text-white hover:bg-white hover:text-black",
                ].join(" ")}
                onClick={closeAll}
              >
                {item.name.value}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Slide-in panel */}
      {menuOpen && (
        <nav className="fixed inset-0 bg-white z-40 p-6 h-screen overflow-y-auto max-w-[520px]">
          <div className="container mx-auto">
            <div className="flex justify-end">
              <button
                className="flex items-center"
                onClick={closeAll}
                aria-label="Close Menu"
              >
                <X className="text-black" />
              </button>
            </div>

            <MenuList
              nodes={pageData.menuitems.value as MenuNode[]}
              levelPath="" // <-- start at root
              openMap={openMap}
              toggleNode={toggleNode}
              closeAll={closeAll}
            />
          </div>
        </nav>
      )}
    </header>
  );
}
