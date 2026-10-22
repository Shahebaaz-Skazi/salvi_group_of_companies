import Image from "next/image";
import Link from "next/link";
import { t } from "@/content/site";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center">
      <div className="relative w-48 h-48 mb-8 opacity-20">
        <Image 
          src="/images/gear_poster.png" 
          alt="404"
          fill
          className="object-contain"
          sizes="192px"
        />
      </div>
      <h1 className="text-5xl font-heading font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        {t("The page you are looking for does not exist or has been moved.")}
      </p>
      <Link href="/" className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity">
        {t("Return Home")}
      </Link>
    </div>
  );
}
