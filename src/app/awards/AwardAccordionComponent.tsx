"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type AccordionProps = {
  pageData: any | null;
  tabs?: { label: string }[]; // UI tabs
  defaultTabIndex?: number;
};

const AwardAccordionComponent: React.FC<AccordionProps> = ({
  pageData,
  tabs = [{ label: "Corporate Awards" }, { label: "Individual Awards" }],
  defaultTabIndex = 0,
}) => {
  const [tabIndex, setTabIndex] = useState(defaultTabIndex);
  const [activeId, setActiveId] = useState<string | null>(null);

  // ---- GROUPING: adjust this if your data groups differ ----
  const tabGroups: any[][] = useMemo(() => {
    const all = pageData?.categoryitem?.value ?? [];
    const group0 = all.slice(0, 1); // first category -> tab 0
    const group1 = all.slice(1); // remaining categories -> tab 1
    return [group0, group1];
  }, [pageData]);

  // Select the FIRST category in the current tab (only one shown initially)
  const selectedCategory: any | null = tabGroups[tabIndex]?.[0] ?? null;

  // Set default open item: first item of the selected category
  useEffect(() => {
    const firstId = selectedCategory?.items?.value?.[0]?.system?.id ?? null;
    setActiveId(firstId);
  }, [tabIndex, selectedCategory?.items?.value]);

  const toggle = (id: string) => {
    setActiveId((p) => (p === id ? null : id));
  };

  const EnterBtn = ({ href }: { href: string }) => (
    <Link href={href}>
      <span className="inline-flex h-8 items-center rounded-full bg-teal-500/90 px-3 text-sm font-medium text-white hover:bg-teal-600">
        Enter Awards
      </span>
    </Link>
  );

  const ApplyBtn = ({ href }: { href: string }) => (
    <Link href={href}>
      <span className="inline-flex h-9 items-center rounded-full bg-orange-500 px-4 text-sm font-semibold text-white hover:bg-orange-600">
        Apply Now
      </span>
    </Link>
  );

  if (!pageData || !selectedCategory) {
    return null;
  }

  return (
    <section className="bg-neutral-900 py-8 sm:py-10">
      <div className=" ">
        {/* Tabs */}
        <div className="mb-5 flex flex-wrap gap-2">
          {tabs.map((t, i) => {
            const active = i === tabIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setTabIndex(i)}
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-white/10 ${
                  active
                    ? "bg-teal-500 text-white"
                    : "bg-neutral-800 text-neutral-100 hover:bg-neutral-700"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Big rounded container */}
        <div className="rounded-3xl  shadow-2xl ring-1 ring-black/5">
          {/* ONLY the FIRST CATEGORY of the selected tab */}
          <div className="rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
            {selectedCategory.items.value.map((s: any, idx: number) => {
              const subItem: any = s;
              const open = activeId === subItem.system.id;

              return (
                <div key={subItem.system.id}>
                  {/* Row header */}
                  <div
                    className={`flex items-center gap-4 px-5 ${
                      open ? "pt-6 pb-4" : "py-5"
                    } ${idx !== 0 ? "border-t border-gray-200" : ""}`}
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => toggle(subItem.system.id)}
                      className="flex-1 text-left"
                    >
                      <h4 className="text-[17px] font-semibold text-gray-900">
                        {subItem.name.value}
                      </h4>
                    </button>

                    {open ? (
                      <ApplyBtn href={subItem.link.value} />
                    ) : (
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => toggle(subItem.system.id)}
                      >
                        <span className="inline-flex h-8 items-center rounded-full bg-teal-500/90 px-3 text-sm font-medium text-white hover:bg-teal-600">
                          Enter Awards
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Body */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-6">
                        {/* If you store criteria as HTML */}
                        <div className="prose prose-gray max-w-none">
                          <h5>Criteria:</h5>
                          <div
                            className="award-content"
                            dangerouslySetInnerHTML={{
                              __html: subItem.itemcontent?.value || "",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardAccordionComponent;
