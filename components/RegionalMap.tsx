"use client";

import dynamic from "next/dynamic";

const RegionalMapInner = dynamic(
  () => import("@/components/RegionalMapInner"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(180deg,#f7f1e5_0%,#efe4d2_100%)] text-sm text-[#17283b]/58">
        Harita yukleniyor...
      </div>
    ),
  }
);

export default function RegionalMap() {
  return <RegionalMapInner />;
}
