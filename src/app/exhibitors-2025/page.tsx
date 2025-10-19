"use client";

import TopSpacer from "@/components/Blocks/TopSpacer";
import ExhibitorCard from "@/components/ExhibitorCard";
import Loader from "@/components/UI/Loader";
import Section from "@/components/UI/Section";
import React, { useEffect, useMemo, useState } from "react";

export default function ExhibitorsPage() {
  const [exhibitors, setExhibitors] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const response = await fetch(
          `https://api.aimcongress.com/api/website/getexhibitors?eventid=cfc66726-6b7d-467f-8453-f0ee21b035f2`
        );
        if (response.ok) {
          const data = await response.json();
          setExhibitors(data);
        } else {
          console.error("Failed to fetch exhibitors");
        }
      } catch (error) {
        console.error("Error fetching exhibitors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitors();
  }, []);

  const countries = useMemo(() => {
    const unique = new Set(exhibitors.map((e) => e.country).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [exhibitors]);

  const filteredExhibitors = useMemo(() => {
    return selectedCountry === "All"
      ? exhibitors
      : exhibitors.filter((e) => e.country === selectedCountry);
  }, [selectedCountry, exhibitors]);

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <>
      <TopSpacer color="black" />
      <Section className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Exhibitors</h1>

        {/* 🔸 Country Filter Dropdown */}
        <div className="mb-6">
          <label className="text-gray-800 font-semibold mr-3">
            Filter by Country:
          </label>
          <select
            className="p-2 rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* 🔹 Exhibitors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExhibitors.map((exhibitor, index) => (
            <div key={index}>
              <ExhibitorCard exhibitor={exhibitor} />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
