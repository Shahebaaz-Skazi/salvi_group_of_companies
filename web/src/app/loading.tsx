import Image from "next/image";
import { t } from "@/content/site";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 mb-6 animate-spin" style={{ animationDuration: "4s" }}>
        <Image 
          src="/images/gear_poster.png" 
          alt={t("Loading...") as string}
          fill
          className="object-contain opacity-50"
          sizes="96px"
          priority
        />
      </div>
      <div className="text-muted-foreground font-heading tracking-widest uppercase text-sm animate-pulse">
        {t("Loading")}
      </div>
    </div>
  );
}
