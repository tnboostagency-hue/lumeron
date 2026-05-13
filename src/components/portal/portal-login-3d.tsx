"use client";

import dynamic from "next/dynamic";

export const PortalLogin3D = dynamic(
  () => import("./portal-login-3d-inner").then((m) => m.PortalLogin3DInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[max(22rem,min(52svh,38rem))] w-full items-center justify-center bg-gradient-to-b from-[#3ec8ba]/12 to-transparent sm:min-h-[max(24rem,min(48svh,36rem))] lg:min-h-0">
        <div className="h-11 w-11 animate-spin rounded-full border-2 border-[#229388] border-t-transparent sm:h-12 sm:w-12" />
      </div>
    ),
  }
);
