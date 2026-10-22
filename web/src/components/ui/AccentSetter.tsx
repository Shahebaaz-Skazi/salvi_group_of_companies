"use client";
import { useAccent } from "@/hooks/useAccent";
import { FirmIndex } from "@/content/firms";

export default function AccentSetter({ firmId }: { firmId: FirmIndex }) {
  useAccent(firmId);
  return null;
}
