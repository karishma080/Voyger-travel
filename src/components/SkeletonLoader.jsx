import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-64 rounded-3xl skeleton-shimmer border border-white/10" />

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-36 rounded-3xl skeleton-shimmer border border-white/10 p-5 space-y-3">
            <div className="h-4 w-24 bg-white/10 rounded-lg" />
            <div className="h-8 w-32 bg-white/20 rounded-lg" />
            <div className="h-3 w-40 bg-white/10 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="h-80 rounded-3xl skeleton-shimmer border border-white/10" />
    </div>
  );
}
