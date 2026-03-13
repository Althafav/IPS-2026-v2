"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Day = { ItemID: number; Name: string; ItemOrder: number };
type Speaker = {
  Id: string;
  Name: string;
  JobTitle: string;
  Organization: string;
  Image: string;
  Description: string;
  Role: string;
  FacebookProfileURL: string;
  InstagramProfileURL: string;
  LinkedInProfileURL: string;
  TwitterProfileURL: string;
};
type Session = {
  SessionName: string;
  StartTime: string;
  EndTime: string;
  Description: string;
  SessionType: string;
  Track: string;
  Speakers: Speaker[];
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function safeTimeParts(t: string) {
  const parts = (t || "").split(":").map((x) => Number(x));
  // supports "HH:MM" or "HH:MM:SS"
  const hh = Number.isFinite(parts?.[0]) ? parts[0] : 0;
  const mm = Number.isFinite(parts?.[1]) ? parts[1] : 0;
  return { hh, mm };
}

function to12h(t: string) {
  if (!t) return "";
  const { hh, mm } = safeTimeParts(t);
  const d = new Date();
  d.setHours(hh, mm, 0, 0);
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function timeToMinutes(t: string) {
  const { hh, mm } = safeTimeParts(t);
  return hh * 60 + mm;
}

function initials(name: string) {
  const n = (name || "").trim();
  if (!n) return "?";
  const parts = n.split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
}

function Avatar({
  src,
  name,
  className,
}: {
  src?: string;
  name: string;
  className?: string;
}) {
  const [imgErr, setImgErr] = useState(false);
  const showFallback = !src || imgErr;

  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-full ring-1 ring-black/10 bg-gray-100 text-gray-700",
        className,
      )}
      aria-label={name}
      title={name}
    >
      {showFallback ? (
        <span className="text-xs font-semibold">{initials(name)}</span>
      ) : (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setImgErr(true)}
        />
      )}
    </div>
  );
}

function SkeletonRow() {
  return (
    <li className="rounded-2xl border border-black/5 bg-white p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-12 sm:gap-6">
        <div className="sm:col-span-3">
          <div className="h-4 w-40 rounded bg-gray-100" />
          <div className="mt-3 h-7 w-24 rounded-full bg-gray-100" />
          <div className="mt-3 h-3 w-28 rounded bg-gray-100" />
        </div>
        <div className="sm:col-span-9">
          <div className="h-5 w-3/4 rounded bg-gray-100" />
          <div className="mt-3 space-y-2">
            <div className="h-3 w-full rounded bg-gray-100" />
            <div className="h-3 w-11/12 rounded bg-gray-100" />
            <div className="h-3 w-4/5 rounded bg-gray-100" />
          </div>
          <div className="mt-4 flex gap-2">
            <div className="h-9 w-9 rounded-full bg-gray-100" />
            <div className="h-9 w-9 rounded-full bg-gray-100" />
            <div className="h-9 w-9 rounded-full bg-gray-100" />
          </div>
        </div>
      </div>
    </li>
  );
}

export default function AgendaComponent2({ eventId }: { eventId: string }) {
  const [days, setDays] = useState<Day[]>([]);
  const [dayId, setDayId] = useState<number | null>(null);

  const [sessions, setSessions] = useState<Session[]>([]);
  const [track, setTrack] = useState("All");
  const [query, setQuery] = useState("");

  const [loadingDays, setLoadingDays] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ctrlRef = useRef<AbortController | null>(null);

  const loadDays = async () => {
    try {
      setLoadingDays(true);
      setError(null);

      const res = await fetch(
        `https://speakers.aimcongress.com/api/website/AgendaFilters?EventId=${encodeURIComponent(
          eventId,
        )}`,
        { cache: "no-store" },
      );
      if (!res.ok) throw new Error(`Days load failed (${res.status})`);
      const data = await res.json();

      const sorted: Day[] = (data?.Days || []).sort(
        (a: Day, b: Day) => (a.ItemOrder ?? 0) - (b.ItemOrder ?? 0),
      );

      setDays(sorted);
      setDayId((prev) => prev ?? sorted[0]?.ItemID ?? null);
      setTrack("All");
    } catch (e: any) {
      setError(e?.message || "Failed to load days");
      setDays([]);
      setDayId(null);
    } finally {
      setLoadingDays(false);
    }
  };

  const loadSessions = async (nextDayId: number) => {
    ctrlRef.current?.abort();
    const ctrl = new AbortController();
    ctrlRef.current = ctrl;

    setLoadingSessions(true);
    setError(null);

    try {
      const res = await fetch(
        `https://speakers.aimcongress.com/api/website/agenda?EventId=${encodeURIComponent(
          eventId,
        )}&DayId=${nextDayId}`,
        { cache: "no-store", signal: ctrl.signal },
      );
      if (!res.ok) throw new Error(`Sessions load failed (${res.status})`);
      setSessions((await res.json()) || []);
    } catch (e: any) {
      if (e?.name !== "AbortError") {
        setError(e?.message || "Failed to load sessions");
        setSessions([]);
      }
    } finally {
      setLoadingSessions(false);
    }
  };

  // initial days
  useEffect(() => {
    loadDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  // sessions on day change
  useEffect(() => {
    if (!dayId) return;
    loadSessions(dayId);
    return () => ctrlRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, dayId]);

  const tracks = useMemo(() => {
    const unique = Array.from(
      new Set(sessions.map((s) => s.Track).filter(Boolean)),
    );
    unique.sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, [sessions]);

  const sortedSessions = useMemo(() => {
    const arr = [...sessions];
    arr.sort((a, b) => timeToMinutes(a.StartTime) - timeToMinutes(b.StartTime));
    return arr;
  }, [sessions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base =
      track === "All"
        ? sortedSessions
        : sortedSessions.filter((s) => s.Track === track);

    if (!q) return base;

    return base.filter((s) => {
      const speakersText = (s.Speakers || [])
        .map((sp) => `${sp.Name} ${sp.JobTitle || ""} ${sp.Organization || ""}`)
        .join(" ");
      return `${s.SessionName} ${s.SessionType || ""} ${s.Track || ""} ${speakersText}`
        .toLowerCase()
        .includes(q);
    });
  }, [sortedSessions, track, query]);

  // description expand/collapse
  const [openKey, setOpenKey] = useState<string | null>(null);

  const isBusy = loadingDays || loadingSessions;
  console.log(filtered, "sessions");
  return (
    <section
      id="agenda"
      className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
    >
      {/* Header */}
      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          {/* Search */}
          <div className="w-full sm:max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Search
            </p>
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                id="agenda-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sessions or speakers…"
                className="w-full rounded-xl border border-black/10 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 outline-none transition focus:border-black/20 focus:ring-4 focus:ring-black/5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters (sticky-ish look) */}
      <div className="border-t border-black/5 bg-white/90 px-5 py-4 backdrop-blur sm:px-8">
        {/* Day tabs */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Select day
          </p>

          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTrack("All");
              if (dayId) loadSessions(dayId);
              else loadDays();
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-black/5"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M20 12a8 8 0 10-3 6.3M20 12v-6m0 6h-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Refresh
          </button>
        </div>

        <div className="mt-3 overflow-x-auto pb-1">
          <div className="flex gap-2">
            {(loadingDays ? Array.from({ length: 4 }) : days).map(
              (d: any, idx: number) => {
                if (loadingDays) {
                  return (
                    <div
                      key={`day-skel-${idx}`}
                      className="h-9 w-28 shrink-0 rounded-full bg-gray-100"
                    />
                  );
                }

                const active = dayId === d.ItemID;

                return (
                  <button
                    key={d.ItemID}
                    type="button"
                    onClick={() => {
                      setDayId(d.ItemID);
                      setTrack("All");
                      setOpenKey(null);
                    }}
                    className={cn(
                      "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-4 focus:ring-black/5",
                      active
                        ? "bg-secondary text-white shadow-sm"
                        : "border border-black/10 bg-white text-gray-800 hover:bg-gray-50",
                    )}
                    aria-pressed={active}
                  >
                    {d.Name}
                    {active && (
                      <span className="absolute inset-x-2 -bottom-1 h-1 rounded-full bg-white/40" />
                    )}
                  </button>
                );
              },
            )}
          </div>
        </div>

        {/* Track */}
        {tracks.length > 1 && (
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Track
              </p>

              <span className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filtered.length}
                </span>
              </span>
            </div>

            {/* Mobile: select */}
            <div className="sm:hidden">
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black/20 focus:ring-4 focus:ring-black/5"
              >
                {tracks.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop: pills */}
            <div className="hidden flex-wrap gap-2 sm:flex">
              {tracks.map((t) => {
                const active = track === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTrack(t)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-4 focus:ring-black/5",
                      active
                        ? "bg-secondary text-white shadow-sm"
                        : "border border-black/10 bg-white text-gray-800 hover:bg-gray-50",
                    )}
                    aria-pressed={active}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="bg-[#F7F7F7] px-5 py-6 sm:px-8 sm:py-8">
        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-medium">Something went wrong:</p>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  if (dayId) loadSessions(dayId);
                  else loadDays();
                }}
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-red-700 ring-1 ring-red-200 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
              >
                Try again
              </button>
            </div>
            <p className="mt-2 break-words text-xs text-red-700/90">{error}</p>
          </div>
        )}

        {/* Loading */}
        {isBusy && (
          <ul className="grid gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonRow key={`sk-${i}`} />
            ))}
          </ul>
        )}

        {/* Empty */}
        {!isBusy && !error && filtered.length === 0 && (
          <div className="rounded-2xl border border-black/5 bg-white p-6 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gray-50 ring-1 ring-black/5">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-gray-500"
                fill="none"
              >
                <path
                  d="M8 7V3m8 4V3M3 10h18M6 21h12a3 3 0 003-3V7a3 3 0 00-3-3H6a3 3 0 00-3 3v11a3 3 0 003 3z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">
              No sessions found
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Try switching the track/day or clearing your search.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              >
                Clear search
              </button>
              <button
                type="button"
                onClick={() => setTrack("All")}
                className="rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm"
              >
                View all tracks
              </button>
            </div>
          </div>
        )}

        {/* List */}
        {!isBusy && !error && filtered.length > 0 && (
          <ul className="grid gap-4">
            {filtered.map((s, i) => {
              const key = `${s.SessionName}-${s.StartTime}-${s.EndTime}-${i}`;
              const open = openKey === key;

              return (
                <li
                  key={key}
                  className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                >
                  <div className="grid gap-4 sm:grid-cols-12 sm:gap-6">
                    {/* Left */}
                    <div className="sm:col-span-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-sm font-semibold text-gray-900 ring-1 ring-black/5">
                          {to12h(s.StartTime)} – {to12h(s.EndTime)}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {s.SessionType && (
                          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-gray-700">
                            {s.SessionType}
                          </span>
                        )}
                        {s.Track && (
                          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-gray-700">
                            {s.Track}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right */}
                    <div className="sm:col-span-9">
                      <h3
                        className={cn(
                          "text-lg font-semibold tracking-tight sm:text-xl",
                          s.SessionType === "Institutional Investor Conference"
                            ? "text-primary"
                            : "text-secondary",
                        )}
                      >
                        {s.SessionName}
                      </h3>

                      {/* Description */}
                      {s.Description ? (
                        <div className="mt-3">
                          <div
                            className={cn(
                              "prose prose-sm max-w-none text-gray-700",
                              !open &&
                                "relative max-h-[6.5rem] overflow-hidden",
                            )}
                          >
                            <div
                              className="prose max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: s.Description,
                              }}
                            />
                          </div>

                          {!open && (
                            <div className="pointer-events-none -mt-10 h-10 bg-gradient-to-t from-white to-transparent" />
                          )}

                          <button
                            type="button"
                            onClick={() => setOpenKey(open ? null : key)}
                            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-gray-900 underline-offset-4 hover:underline focus:outline-none focus:ring-4 focus:ring-black/5"
                          >
                            {open ? "Show less" : "Show more"}
                            <svg
                              viewBox="0 0 24 24"
                              className={cn(
                                "h-4 w-4 transition",
                                open && "rotate-180",
                              )}
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M6 9l6 6 6-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : null}

                      {/* Speakers */}
                      {s.Speakers?.length > 0 && (
                        <div className="mt-5">
                          {[
                            "Moderator",
                            "Interviewer",
                            "Interviewee",
                            "Speaker",
                            "Keynote Speaker",
                            "Panelist",
                            "Host",
                          ].map((role) => {
                            const speakersByRole = s.Speakers.filter(
                              (sp) =>
                                sp.Role?.toLowerCase() === role.toLowerCase(),
                            );

                            if (speakersByRole.length === 0) return null;

                            return (
                              <div key={role} className="mb-4">
                                {/* Role Heading */}
                                <h3 className="mb-2 text-sm font-semibold text-gray-700">
                                  {role}
                                </h3>

                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                  {speakersByRole.map((sp) => (
                                    <div
                                      key={sp.Id}
                                      className="flex items-start gap-3 rounded-xl border border-black/5 bg-gray-50 p-3"
                                    >
                                      <Avatar
                                        src={sp.Image}
                                        name={sp.Name}
                                        className="h-11 w-11 shrink-0"
                                      />
                                      <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-gray-900">
                                          {sp.Name}
                                        </p>
                                        <p className="mt-0.5 text-xs text-gray-600">
                                          {[sp.JobTitle, sp.Organization]
                                            .filter(Boolean)
                                            .join(" • ")}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
