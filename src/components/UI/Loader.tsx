"use client";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        {/* Rotating accent ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-primary animate-spin" />
      </div>

      <p className="mt-5 text-gray-600 text-sm font-medium tracking-wide">
        Loading, please wait...
      </p>
    </div>
  );
}
