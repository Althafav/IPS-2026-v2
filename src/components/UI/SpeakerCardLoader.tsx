export default function SpeakerCardLoader() {
  return (
    <div className="shadow bg-white rounded-3xl overflow-hidden h-full animate-pulse">
      
      {/* Image Skeleton */}
      <div className="w-full aspect-square bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">

        {/* Name */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />

        {/* Designation */}
        <div className="h-3 bg-gray-200 rounded w-1/2" />

        {/* Company */}
        <div className="h-3 bg-gray-200 rounded w-2/3" />

      </div>
    </div>
  );
}
