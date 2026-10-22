import Link from "next/link";
import { firms } from "@/content/firms";
import { siteContent } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-[#020308]/60 backdrop-blur-xl text-secondary-foreground border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-heading font-bold mb-4">{siteContent.groupName}</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">{siteContent.tagline}</p>
            <address className="not-italic text-sm text-muted-foreground whitespace-pre-line">
              {siteContent.contact.address}
            </address>
          </div>
          <div>
            <h3 className="font-heading font-semibold mb-4 text-foreground">Our Companies</h3>
            <ul className="space-y-3">
              {firms.map((firm) => (
                <li key={firm.id}>
                  <Link href={`/${firm.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {firm.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/clients" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Clients</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/compliance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteContent.groupName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href={siteContent.socials.linkedin} className="text-muted-foreground hover:text-foreground" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={siteContent.socials.facebook} className="text-muted-foreground hover:text-foreground" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
