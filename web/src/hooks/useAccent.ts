"use client";

import { useEffect } from "react";
import { firms, FirmIndex } from "@/content/firms";

export function useAccent(firmId: FirmIndex | null) {
  useEffect(() => {
    if (firmId !== null) {
      const firm = firms.find(f => f.id === firmId);
      if (firm) {
        document.documentElement.style.setProperty('--primary', `var(${firm.accentVar})`);
      }
    } else {
      document.documentElement.style.setProperty('--primary', 'var(--color-brand-sonali)');
    }
    
    return () => {
      document.documentElement.style.removeProperty('--primary');
    };
  }, [firmId]);
}
