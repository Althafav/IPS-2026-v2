"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

interface PageDataProps {
  eventId: string;
  /** Optional hex like "#174687" to theme primary accents */
  colorCode?: string;
}

type Day = {
  ItemID: number;
  Name: string;
  Date: string;
  ItemOrder: number;
  EventId: string;
};

type Speaker = {
  Id: string;
  Name: string;
  JobTitle: string;
  Organization: string;
  Image: string;
  Description: string;
  FacebookProfileURL: string;
  InstagramProfileURL: string;
  TwitterProfileURL: string;
  LinkedInProfileURL: string;
};

type Session = {
  SessionName: string;
  StartTime: string;
  EndTime: string;
  Description: string;
  Room: string;
  SessionType: string;
  Track: string;
  SessionPartners: any[];
  Speakers: Speaker[];
};

type FiltersResponse = {
  Days: Day[];
};

function to12h(t: string) {
  const [hh, mm] = t.split(":").map(Number);
  const date = new Date();
  date.setHours(hh, mm || 0, 0, 0);
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

const AgendaComponent: React.FC<PageDataProps> = ({ eventId, colorCode }) => {
  const [days, setDays] = useState<Day[] | null>(null);
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);

  const [sessionsCache, setSessionsCache] = useState<Record<number, Session[]>>(
    {}
  );
  const [loadingSessions, setLoadingSessions] = useState<boolean>(false);
  const [errorSessions, setErrorSessions] = useState<string | null>(null);

  const [selectedType, setSelectedType] = useState<string>("All");

  const abortRef = useRef<AbortController | null>(null);

  // Theme helpers
  const primaryBg = colorCode || "#174687";
  const primaryRing = colorCode || "#174687";

  // Load days
  useEffect(() => {
    const loadDays = async () => {
      try {
        const res = await fetch(
          `https://speakers.aimcongress.com/api/website/AgendaFilters?EventId=${encodeURIComponent(
            eventId
          )}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error(`Failed to load days (${res.status})`);
        const data: FiltersResponse = await res.json();
        const sorted = [...data.Days].sort((a, b) => a.ItemOrder - b.ItemOrder);
        setDays(sorted);
        if (sorted.length > 0) setSelectedDayId(sorted[0].ItemID);
      } catch (err: any) {
        console.log(err);
      }
    };
    loadDays();
  }, [eventId]);

  // Load sessions for selected day
  useEffect(() => {
    if (!selectedDayId) return;
    if (sessionsCache[selectedDayId]) return;

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    const loadSessions = async () => {
      setLoadingSessions(true);
      setErrorSessions(null);
      try {
        const url = `https://speakers.aimcongress.com/api/website/agenda?EventId=${encodeURIComponent(
          eventId
        )}&DayId=${selectedDayId}`;
        const res = await fetch(url, {
          signal: ctrl.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Failed to load sessions (${res.status})`);
        const data: Session[] = await res.json();
        setSessionsCache((prev) => ({ ...prev, [selectedDayId]: data }));
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setErrorSessions(err.message || "Failed to load sessions");
      } finally {
        setLoadingSessions(false);
      }
    };

    loadSessions();
    return () => ctrl.abort();
  }, [eventId, selectedDayId, sessionsCache]);

  const sessions: Session[] = useMemo(
    () => (selectedDayId ? sessionsCache[selectedDayId] || [] : []),
    [selectedDayId, sessionsCache]
  );

  // Extract unique session types
  const sessionTypes = useMemo(() => {
    const types = Array.from(new Set(sessions.map((s) => s.SessionType)));
    return ["All", ...types.filter(Boolean)];
  }, [sessions]);

  // Filter by type
  const filteredSessions = useMemo(() => {
    if (selectedType === "All") return sessions;
    return sessions.filter((s) => s.SessionType === selectedType);
  }, [sessions, selectedType]);

  return (
    <div className="" id="agenda">
      <div className="">
        <div className="rounded-xl bg-[#F5F5F5] p-5 max-w-6xl ">
          {/* Day filter */}
          <div className="mb-6 overflow-x-auto py-5">
            <div className="flex gap-2">
              {days?.map((d) => {
                const active = selectedDayId === d.ItemID;
                return (
                  <button
                    key={d.ItemID}
                    type="button"
                    onClick={() => {
                      setSelectedDayId(d.ItemID);
                      setSelectedType("All"); // reset on day change
                    }}
                    className={`shrink-0 rounded border px-10 py-1.5 text-sm transition",
                      ${
                        active
                          ? "text-white bg-secondary"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {d.Name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SessionType filter */}
          {sessionTypes.length > 1 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {sessionTypes.map((type) => {
                  const active = selectedType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`shrink-0 rounded border px-4 py-1.5 text-sm transition",
                      ${
                        active
                          ? "text-white bg-secondary"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* States */}
          {errorSessions && (
            <div className="mb-4 text-sm text-red-600">
              Error: {errorSessions}
            </div>
          )}
          {loadingSessions && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 w-40 rounded bg-gray-200" />
                  <div className="mt-3 h-6 w-3/4 rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          )}
          {!loadingSessions &&
            !errorSessions &&
            filteredSessions.length === 0 && (
              <p className="text-sm text-gray-500">
                No sessions found for this filter.
              </p>
            )}

          {/* Sessions */}
          {!loadingSessions &&
            !errorSessions &&
            filteredSessions.length > 0 && (
              <ul className="divide-y divide-gray-200">
                {filteredSessions.map((s, idx) => (
                  <li key={`${s.SessionName}-${idx}`} className="py-6">
                    <div className="grid gap-6 sm:grid-cols-12">
                      <div className="sm:col-span-4">
                        <p className="mb-1 font-medium text-gray-900">
                          {to12h(s.StartTime)} – {to12h(s.EndTime)}
                        </p>
                        <div className="text-xs tracking-wide text-gray-500">
                          {s.SessionType}
                        </div>
                      </div>

                      <div className="sm:col-span-8">
                        <h3
                          className={`mb-2 text-xl font-semibold  ${
                            s.SessionType ===
                            "Institutional Investor Conference"
                              ? "text-primary"
                              : "text-secondary"
                          }`}
                        >
                          {s.SessionName}
                        </h3>

                        {s.Description && (
                          <div
                            className="prose prose-sm max-w-none text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html: s.Description,
                            }}
                          />
                        )}

                        {/* Speakers */}
                        {s.Speakers?.length > 0 && (
                          <div className="mt-4">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                              Speakers
                            </p>
                            <div className="flex flex-wrap gap-4">
                              {s.Speakers.map((sp) => (
                                <div
                                  key={sp.Id}
                                  className="flex items-center gap-2"
                                >
                                  <img
                                    src={sp.Image}
                                    alt={sp.Name}
                                    className="h-10 w-10 rounded-full object-cover"
                                    loading="lazy"
                                  />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      {sp.Name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {[sp.JobTitle, sp.Organization]
                                        .filter(Boolean)
                                        .join(" • ")}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
        </div>
      </div>
    </div>
  );
};

export default AgendaComponent;
