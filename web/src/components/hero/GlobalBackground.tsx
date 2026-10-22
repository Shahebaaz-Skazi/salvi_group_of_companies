"use client";

import { useEffect, useState } from "react";
import SpaceBackdrop from "./SpaceBackdrop";

export default function GlobalBackground() {
  const [activeFirm, setActiveFirm] = useState<0 | 1 | 2 | 3 | 4 | 5 | null>(null);

  useEffect(() => {
    const handleFirmChange = (e: CustomEvent<0 | 1 | 2 | 3 | 4 | 5 | null>) => {
      setActiveFirm(e.detail);
    };

    window.addEventListener("salvi-active-firm" as any, handleFirmChange);
    return () => {
      window.removeEventListener("salvi-active-firm" as any, handleFirmChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020308]">
      <SpaceBackdrop activeFirm={activeFirm} />
    </div>
  );
}
